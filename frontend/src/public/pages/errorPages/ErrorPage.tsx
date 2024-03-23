import {Button, Grid, Typography} from "@mui/material";
import BackButton from "../../../common/utils/components/BackButton.tsx";

function ErrorPage() {
  return (
    <Grid container minHeight="100vh" minWidth={"100%"}
          textAlign={"center"} alignItems="center" justifyContent="center">
      <Grid item xs={11}>
        <Typography variant="h4" gutterBottom>
          An error has occurred.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Return to the Home Page, or try again later.
        </Typography>
        <Grid container spacing={1} mt={1} textAlign={"center"} alignItems="center"
              justifyContent="center">
          <Grid item>
            <Button href="/" type="button" variant={"contained"}>
              Home
            </Button>
          </Grid>
          <Grid item>
            <BackButton/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ErrorPage;
