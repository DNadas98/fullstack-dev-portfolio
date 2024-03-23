import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  useTheme
} from "@mui/material";
import {ReactNode} from "react";


export interface CardGridItemProps {
  title: string;
  content: { iconSrc?: string, icon?: ReactNode, text: string }[];
}

export default function CardGridItem(props: CardGridItemProps) {
  const theme = useTheme();
  return (
    <Card variant={"elevation"} elevation={10}>
      <CardHeader title={props.title}
                  sx={{textAlign: "center"}}/>
      <CardContent>
        <List>
          {props.content.map((item) => (
            <ListItem key={item.text}>
              <ListItemIcon>
                {item.iconSrc?.length
                  ? < Avatar variant={"square"} sx={{
                    bgcolor: "transparent",
                    color: `${theme.palette.secondary.main}`
                  }}>
                    <img src={item.iconSrc} alt={item.text} height={40} width={"auto"}/>
                  </Avatar>
                  : <Avatar sx={{
                    bgcolor: `${theme.palette.secondary.main}`,
                    color: `${theme.palette.primary.main}`
                  }}>
                    {item.icon}
                  </Avatar>
                }
              </ListItemIcon>
              <Typography>
                {item.text}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
    ;
}
