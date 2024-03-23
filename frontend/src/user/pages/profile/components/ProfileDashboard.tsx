import {Button, Card, CardContent, Grid, Stack, Typography} from "@mui/material";
import {Role} from "../../../../authentication/dto/Role.ts";
import ProfileMainCard from "./ProfileMainCard.tsx";

interface ProfileDashboardProps {
  username: string,
  email: string,
  role: Role,
  onApplicationUserDelete: () => unknown,
  applicationUserDeleteLoading: boolean
}

export default function ProfileDashboard(props: ProfileDashboardProps) {
  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={10} sm={5} mb={4} lg={3}>
        <Stack spacing={2}>
          <ProfileMainCard username={props.username}
                           email={props.email}
                           role={props.role}/>
          <Card variant={"elevation"} elevation={10}>
            <CardContent>
              <Typography variant={"body1"} mb={2}>
                Manage user data
              </Typography>
              <Stack spacing={2} maxWidth={"fit-content"}>
                <Button disabled={props.applicationUserDeleteLoading}
                        onClick={props.onApplicationUserDelete}
                        variant={"contained"} color={"error"}>
                  Remove all user data
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack></Grid></Grid>
  )
}
