import {Grid} from "@mui/material";
import CardGridItem, {CardGridItemProps} from "./CardGridItem";

interface CardGridProps {
  items: CardGridItemProps[];
}

export default function CardGrid(props: CardGridProps) {
  return (
    <Grid container justifyContent={"center"} spacing={4} padding={2}>
      {props.items.map((item) => (
        <Grid item key={item.title}
              xs={12} sm={8} md={7} lg={4}>
          <CardGridItem title={item.title}
                        content={item.content}/>
        </Grid>
      ))}
    </Grid>);
}
