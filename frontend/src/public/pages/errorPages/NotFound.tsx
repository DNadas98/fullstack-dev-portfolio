import BackButton from "../../../common/utils/components/BackButton.tsx";
import {Grid, Typography} from "@mui/material";

interface NotFoundProps {
  text?: string;
}

function NotFound(props: NotFoundProps) {
  return (
    <Grid container justifyContent="center" alignItems={"center"} textAlign={"center"}
          flexGrow={1}>
      <Grid item xs={11} justifyContent="center" alignItems={"center"}
            textAlign={"center"}>
        <Typography variant="h6">
          {props.text ?? "The page you are looking for does not exist."}
        </Typography>
        <Grid container spacing={1} mt={1} justifyContent="center" alignItems={"center"}
              textAlign={"center"}>
          <Grid item>
            <BackButton path={"/"} text={"Home"}/>
          </Grid>
          <Grid item>
            <BackButton/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default NotFound;
