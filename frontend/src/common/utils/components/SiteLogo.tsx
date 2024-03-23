import {Avatar, Button, Link} from "@mui/material";
import siteConfig from "../../config/siteConfig.ts";

export default function SiteLogo() {
  const {siteName} = siteConfig;
  return (<Button
    startIcon={
      <Avatar>
        <img src={"/logo.png"} height={38} width={38} alt={`${siteName}`}/>
      </Avatar>
    }
    component={Link}
    href={"/"} variant={"text"}
    sx={{
      whiteSpace: "nowrap",
      fontSize: {
        xs: "1rem",
        sm: "1.5rem"
      }, textTransform: "none"
    }} color={"inherit"}>
    {siteName}
  </Button>);
}
