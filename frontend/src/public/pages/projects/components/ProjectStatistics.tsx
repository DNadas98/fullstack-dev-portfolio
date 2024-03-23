import {Button, Grid} from "@mui/material";
import {ForkRightOutlined, People, Star} from "@mui/icons-material";
import {ClockIcon} from "@mui/x-date-pickers";
import {GithubProjectResponseDto} from "../dto/GithubProjectResponseDto.ts";

interface ProjectStatisticsProps {
  project: GithubProjectResponseDto;
}

export default function ProjectStatistics(props: ProjectStatisticsProps) {
  return (
    <Grid container spacing={2} justifyContent={"center"}>
      <Grid item>
        <Button variant={"outlined"} disabled startIcon={
          <Star sx={{height: "1.5rem", color: "darkgoldenrod"}}/>}
                sx={{":disabled": {color: "text.primary"}}}>
          Stars: {props.project.stargazers_count}
        </Button>
      </Grid>
      <Grid item>
        <Button variant={"outlined"} disabled startIcon={
          <People sx={{height: "1.5rem"}}/>}
                sx={{":disabled": {color: "text.primary"}}}>
          Subscribers: {props.project.subscribers_count}
        </Button>
      </Grid>
      <Grid item>
        <Button variant={"outlined"} disabled startIcon={
          <ForkRightOutlined sx={{height: "1.5rem"}}/>}
                sx={{":disabled": {color: "text.primary"}}}>
          Forks: {props.project.forks}
        </Button>
      </Grid>
      <Grid item>
        <Button variant={"outlined"} disabled startIcon={
          <ClockIcon sx={{height: "1.5rem"}}/>}
                sx={{
                  textAlign: "left",
                  alignItems: "flex-start",
                  ":disabled": {color: "text.primary"}
                }}>
          Last Update: {new Date(props.project.pushed_at).toLocaleString()}
        </Button>
      </Grid>
    </Grid>
  );
}
