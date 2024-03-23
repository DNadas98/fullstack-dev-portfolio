import {Grid, Stack, Tooltip, Typography} from "@mui/material";
import {GithubProjectResponseDto} from "../dto/GithubProjectResponseDto.ts";
import LoadingSpinner from "../../../../common/utils/components/LoadingSpinner.tsx";
import ProjectCard from "./ProjectCard.tsx";

interface ProjectPageProps {
  loading: boolean;
  handleProjectDetailsClick: (name: string) => void;
  projects: GithubProjectResponseDto[];
}

export default function ProjectPage(props: ProjectPageProps) {
  return (
    <Grid container height={"100%"} flexGrow={1} justifyContent={"center"}
          alignItems={"center"} mt={4} textAlign={"center"} whiteSpace={"break-all"}>{
      props.loading
        ? <Grid item xs={11}><LoadingSpinner/></Grid>
        :
        <Grid item xs={11}>
          <Typography variant={"h4"} mb={4}>
            Projects
          </Typography>
          <Stack justifyContent={"center"} alignItems={"center"} textAlign={"justify"}
                 marginBottom={4} spacing={1}>
            <Typography maxWidth={1000}>
              Here You can see my current public projects, presented dynamically using my
              <Tooltip
                title={"GitHub, a popular platform for hosting and sharing code, allows developers to collaborate and track changes to their projects."}
                arrow describeChild color={"inherit"}>
                <span>{" GitHub REST API* "}</span>
              </Tooltip>
              integration. Metadata, such as displayed project names and filenames are
              stored in a database and managed by my backend API.
              Using these, the most current details, statistics, and
              associated code snippets are fetched directly from GitHub.
              I have created this showcase for You to get a streamlined view of my work,
              saving You time and making it easier to discover each project's key
              features.
            </Typography>
          </Stack>
          <Grid container spacing={4} justifyContent={"space-between"}>
            {props.projects?.length
              ? props.projects.map(project =>
                <ProjectCard key={project.id} project={project}
                             handleProjectDetailsClick={props.handleProjectDetailsClick}/>
              )
              : <Grid item xs={12} alignItems={"center"} justifyContent={"center"}>
                <Typography variant={"h6"}>
                  Work In Progress
                </Typography>
              </Grid>}
          </Grid>
        </Grid>}
    </Grid>);
}
