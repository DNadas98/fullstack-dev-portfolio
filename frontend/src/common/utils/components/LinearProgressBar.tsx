import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import {Stack, useTheme} from "@mui/material";

interface LinearProgressBarProps {
  progress: number;
}

export default function LinearProgressBar(props: LinearProgressBarProps) {
  const theme = useTheme();
  return (
    <Stack spacing={2}>
      <Typography variant="h6"
                  color={"text.primary"}
                  sx={{whiteSpace: "nowrap"}}>
        {`${Math.round(props.progress ?? 0)} % `}
      </Typography>
      <LinearProgress value={props.progress}
                      variant={"determinate"}
                      color={"primary"}
                      sx={{
                        height: 8,
                        backgroundColor: theme.palette.secondary.main
                        ,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: theme.palette.primary.main
                        }
                      }}/>
    </Stack>
  );
}
