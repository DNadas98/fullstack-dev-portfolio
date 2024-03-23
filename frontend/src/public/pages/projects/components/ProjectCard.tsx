import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import {ForkRightOutlined, People, Star} from "@mui/icons-material";
import {GithubProjectResponseDto} from "../dto/GithubProjectResponseDto.ts";

interface ProjectCardProps {
  project: GithubProjectResponseDto;
  handleProjectDetailsClick: (name: string) => void;
}

export default function ProjectCard(props: ProjectCardProps) {
  const theme = useTheme();
  return (
    <Grid item key={props.project.id} xs={12} md={6} lg={3} textAlign={"left"}>
      <Card variant={"elevation"} elevation={10}
            sx={{height: "100%", display: "flex", flexDirection: "column"}}>
        <CardHeader color={"inherit"}
                    title={props.project.displayName}
                    titleTypographyProps={{variant: "h6"}}/>
        <Divider variant={"middle"}
                 color={theme.palette.secondary.main}></Divider>
        <CardContent sx={{flexGrow: 1}}>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item xs={12}>
              <Stack direction={"row"} spacing={2}>
                <Button variant={"outlined"} disabled startIcon={
                  <Star sx={{height: "1.5rem", color: "darkgoldenrod"}}/>}
                        sx={{":disabled": {color: "text.primary"}}}>
                  {props.project.stargazers_count}
                </Button>
                <Button variant={"outlined"} disabled startIcon={
                  <People sx={{height: "1.5rem"}}/>}
                        sx={{":disabled": {color: "text.primary"}}}>
                  {props.project.subscribers_count}
                </Button>
                <Button variant={"outlined"} disabled startIcon={
                  <ForkRightOutlined sx={{height: "1.5rem"}}/>}
                        sx={{":disabled": {color: "text.primary"}}}>
                  {props.project.forks}
                </Button>
              </Stack>
            </Grid>
            <Grid item>
              <Typography variant={"body2"}>
                Last updated at {new Date(props.project.pushed_at).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant={"body2"}>
                Main Language: {props.project.language}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={"body2"}>
                {props.project.description}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button onClick={() => {
            props.handleProjectDetailsClick(props.project.name);
          }}>
            View Project Details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
