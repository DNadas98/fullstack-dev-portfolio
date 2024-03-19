import {List} from "@mui/material";
import {ListItemLink, ListItemLinkProps} from "./ListItemLink";

interface ListWithLinksProps {
  items: ListItemLinkProps[];
}

export function ListWithLinks(props: ListWithLinksProps) {
  return <List sx={{width: "fit-content", margin: "0 auto"}}>
    {props.items.map((item) => (
      <ListItemLink key={item.path} text={item.text} path={item.path}/>
    ))}
  </List>;
}
