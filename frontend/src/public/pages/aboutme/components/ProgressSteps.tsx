import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery
} from "@mui/material";
import LinearProgressBar from "../../../../common/utils/components/LinearProgressBar";
import {useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";

interface CodecoolStudyProgressProps {
  maxProgress: number;
  steps: {
    title: string;
    content: string[];
  }[];
}

export default function ProgressSteps(props: CodecoolStudyProgressProps) {
  const [progress, setProgress] = useState<number>(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < props.maxProgress) {
          const nextProgress = prevProgress + 5;
          return nextProgress > props.maxProgress
            ? props.maxProgress
            : nextProgress;
        }
        return prevProgress;
      });
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, [props.maxProgress]);

  const calculateActiveStep = () => {
    const stepSize = props.maxProgress / props.steps.length;
    return Math.min(props.steps.length - 1, Math.floor(progress / stepSize));
  };

  const activeStep = calculateActiveStep();

  return (
    <Stack spacing={2}>
      <LinearProgressBar progress={progress}/>
      <Stepper activeStep={activeStep}
               orientation={isSmallScreen ? "vertical" : "horizontal"}
               alternativeLabel={!isSmallScreen}>
        {props.steps.map((step, index) => (
          <Step key={step.title}
                completed={progress >= ((index + 1) * 100 / props.steps.length)}>
            <StepLabel StepIconProps={{
              sx: {
                padding: 0.2,
                borderRadius: "50%",
                backgroundColor: `${theme.palette.text.primary}`,
                color: `${theme.palette.primary.main}`
              }
            }}>
              <Card
                sx={{maxWidth: isSmallScreen ? "20rem" : "100%", margin: "0 auto"}}>
                <CardHeader title={step.title} titleTypographyProps={{variant: "body1"}}/>
                <CardContent>
                  <List>
                    {step.content.map((item) => (
                      <ListItem key={item}>
                        <Typography variant={"body2"}>{item}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
