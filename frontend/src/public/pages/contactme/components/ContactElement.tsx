import {Avatar, Button, Stack, Typography} from "@mui/material";
import {ReactNode} from "react";

interface ContactElementProps{
  icon:ReactNode;
  text:string;
  link:string;
  linkText:string;
}

export default function ContactElement(props:ContactElementProps){
  return(
    <Stack
      spacing={2}
      alignItems={"center"}
      justifyContent={"center"}>
      <Avatar variant={"rounded"}
              sx={{
                backgroundColor: "secondary.main",
                color: "primary.main"
              }}>{props.icon}</Avatar>
      <Typography>{props.text}</Typography>
      <Button variant={"text"} href={props.link}
              target={"_blank"} rel={"noopener noreferrer"} sx={{
        textTransform:"none"}}>{props.linkText}</Button>
    </Stack>
  )
}
