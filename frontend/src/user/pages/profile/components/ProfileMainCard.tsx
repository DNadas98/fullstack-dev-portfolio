import {Card, CardContent, CardHeader, Stack, Typography} from "@mui/material";
import {AccountBoxRounded} from "@mui/icons-material";
import {Role} from "../../../../authentication/dto/Role.ts";

interface ProfileMainCardProps {
  username: string;
  email: string;
  role: Role
}

export default function ProfileMainCard(props: ProfileMainCardProps) {
  return (
    <Card>
      <CardHeader avatar={<AccountBoxRounded color={"secondary"}/>}
                  title={props.username} titleTypographyProps={{"variant": "h6"}}
                  subtitle={props.email}>
      </CardHeader>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant={"body1"}>
            E-mail address:
          </Typography>
          <Typography variant={"body2"}>
            {props.email}
          </Typography>
          <Typography variant={"body2"}>
            {props.role}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
