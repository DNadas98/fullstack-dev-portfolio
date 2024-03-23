import {Avatar, Stack, Tooltip, Typography, Link} from "@mui/material";
import {GithubProjectOwnerResponseDto} from "../dto/GithubProjectOwnerResponseDto.ts";

interface ProjectOwnerDetailsProps {
  owner: GithubProjectOwnerResponseDto;
}

export default function ProjectOwnerDetails(props: ProjectOwnerDetailsProps) {
  return (
    <Tooltip title={"View profile on GitHub"} arrow>
      <Stack direction={"row"} flexWrap={"wrap"} spacing={2}
             alignItems={"center"} sx={{color: "text.primary"}}
             component={Link} href={props.owner.html_url} rel={"noopener noreferrer"}
             target={"_blank"}>
        <Avatar sx={{height: 40, width: 40, bgcolor: "secondary.main"}}>
          <img src={props.owner.avatar_url}
               alt={""}
               height={38} width={38}/>
        </Avatar>
        <Typography variant={"body1"} sx={{textTransform: "none"}}>
          {props.owner.login}
        </Typography>
      </Stack>
    </Tooltip>
  );
}
