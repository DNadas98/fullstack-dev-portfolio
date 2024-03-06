import {Code} from "@mui/icons-material";
import {Link, ListItem, ListItemIcon, ListItemText} from "@mui/material";

export interface ListItemLinkProps {
  text: string;
  path: string;
}

export function ListItemLink(props: ListItemLinkProps) {
  return <ListItem component={Link}
                   href={props.path}
                   target={"_blank"} rel={"noopener noreferrer"}
                   sx={{
                     color: "text.primary",
                     "&:hover": {color: "secondary.main"},
                     width: "fit-content"
                   }}>
    <ListItemIcon>
      <Code sx={{color: "text.primary"}}/>
    </ListItemIcon>
    <ListItemText>
      {props.text}
    </ListItemText>
  </ListItem>;
}
