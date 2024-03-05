import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography
} from "@mui/material";
import {Lock} from "@mui/icons-material";
import EmailInput from "../../../components/inputs/EmailInput.tsx";
import PasswordInput from "../../../components/inputs/PasswordInput.tsx";
import {FormEvent} from "react";

interface LoginCardProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function LoginCard({onSubmit}: LoginCardProps) {
  return (
    <Grid container justifyContent={"center"}>
      <Grid item xs={10} sm={8} md={7} lg={6}>
        <Card sx={{
          paddingTop: 4, textAlign: "center",
          maxWidth: 800, width: "100%",
          marginLeft: "auto", marginRight: "auto"
        }}>
          <Stack
            spacing={2}
            alignItems={"center"}
            justifyContent={"center"}>
            <Avatar variant={"rounded"}
                    sx={{backgroundColor: "secondary.main", color: "primary.main"}}>
              <Lock/>
            </Avatar>
            <Typography variant="h5" gutterBottom>
              Sign In
            </Typography>
          </Stack>
          <CardContent sx={{justifyContent: "center", textAlign: "center"}}>
            <Grid container sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              gap: "2rem"
            }}>
              <Grid item xs={10} sm={9} md={7} lg={6}
                    sx={{borderColor: "secondary.main"}}>
                <form onSubmit={onSubmit}>
                  <Stack spacing={2}>
                    <EmailInput/>
                    <PasswordInput/>
                    <Button type={"submit"}
                            variant={"contained"}>
                      Sign In
                    </Button>
                  </Stack>
                </form>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
