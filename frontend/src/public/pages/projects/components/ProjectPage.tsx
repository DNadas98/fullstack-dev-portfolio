import {
  Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, Stack,
  Typography, useTheme
} from "@mui/material";
import LoadingSpinner from "../../../../common/utils/components/LoadingSpinner.tsx";
import {GithubProjectResponseDto} from "../dto/GithubProjectResponseDto.ts";
import {ForkRightOutlined, People, Star} from "@mui/icons-material";

interface ProjectPageProps {
  handleProjectDetailsClick: (name: string) => void;
  loading: boolean,
  projects: GithubProjectResponseDto[]
}

export default function ProjectPage(props: ProjectPageProps) {
  const theme = useTheme();
  return (
    <Grid container height={"100%"} flexGrow={1} justifyContent={"center"}
          alignItems={"center"} mt={4} textAlign={"center"} whiteSpace={"break-all"}>
      <Grid item xs={11}>
        <Typography variant={"h5"} mb={4}>
          Projects
        </Typography>
        {
          props.loading
            ? <LoadingSpinner/>
            : <Grid container spacing={4} justifyContent={"space-between"}>
              {props.projects?.length
                ? props.projects.map(project =>
                  <Grid item key={project.id} xs={12} md={6} lg={3} textAlign={"left"}>
                    <Card sx={{height: "100%", display: "flex", flexDirection: "column"}}>
                      <CardHeader color={"inherit"}
                                  title={project.displayName}
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
                                {project.stargazers_count}
                              </Button>
                              <Button variant={"outlined"} disabled startIcon={
                                <People sx={{height: "1.5rem"}}/>}
                                      sx={{":disabled": {color: "text.primary"}}}>
                                {project.subscribers_count}
                              </Button>
                              <Button variant={"outlined"} disabled startIcon={
                                <ForkRightOutlined sx={{height: "1.5rem"}}/>}
                                      sx={{":disabled": {color: "text.primary"}}}>
                                {project.forks}
                              </Button>
                            </Stack>
                          </Grid>
                          <Grid item>
                            <Typography variant={"body2"}>
                              Last updated at {new Date(project.pushed_at).toLocaleString()}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant={"body2"}>
                              Main Language: {project.language}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant={"body2"}>
                              {project.description}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions>
                        <Button onClick={() => {
                          props.handleProjectDetailsClick(project.name);
                        }}>
                          View Project Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                )
                : <Grid item xs={12} alignItems={"center"} justifyContent={"center"}>
                  <Typography variant={"h6"}>
                    Work In Progress
                  </Typography>
                </Grid>}

            </Grid>
        }
      </Grid>
    </Grid>);
}
