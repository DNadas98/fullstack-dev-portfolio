import {Avatar, Link, Stack, Tooltip, Typography} from "@mui/material";
import {cloneElement, ReactElement, ReactNode} from "react";

interface ContactElementProps {
  icon: ReactNode;
  text: string;
  link: string;
  linkText: string;
}

export default function ContactElement(props: ContactElementProps) {
  const styledIcon = cloneElement(props.icon as ReactElement, {
    style: {height: 40, width: 40}
  });

  return (
    <Tooltip title={props.link} arrow>
      <Stack
        spacing={1}
        component={Link} href={props.link}
        target={"_blank"} rel={"noopener noreferrer"}
        color={"inherit"}
        alignItems={"center"}
        justifyContent={"center"}
        marginBottom={1}>
        <Avatar variant={"rounded"}
                sx={{
                  backgroundColor: "secondary.main",
                  color: "primary.main"
                }}>
          <div style={{height: "40px", width: "40px"}}>
            {styledIcon}
          </div>
        </Avatar>
        <Typography>{props.text}</Typography>
        <Typography>{props.linkText}</Typography>
      </Stack>
    </Tooltip>
  );
}
