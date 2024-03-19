import {AppBar, Divider, Link, Toolbar, Typography, useTheme} from "@mui/material";
import MenuSmall from "../../common/utils/components/MenuSmall.tsx";
import {publicMenuRoutes} from "../../common/config/menu/publicMenuRoutes.tsx";
import {IMenuRoutes} from "../../common/routing/IMenuRoutes.ts";
import {GitHub} from "@mui/icons-material";
import siteConfig from "../../common/config/siteConfig.ts";

export default function PublicFooter() {
  const currentYear = new Date().getFullYear();
  const {siteName, githubRepoUrl} = siteConfig;
  const menu: IMenuRoutes = publicMenuRoutes;
  const theme = useTheme();
  return (
    <AppBar position="sticky" color="primary" sx={{top: "auto", bottom: 0, marginTop: 4}}>
      <Divider color={theme.palette.secondary.main}/>
      <Toolbar sx={{justifyContent: "center"}}>
        <MenuSmall menu={menu}/>
        <Typography mr={2}>
          {currentYear}{" "}&copy;{" "}{siteName}
        </Typography>
        <Link color={"inherit"} target="_blank" rel="noopener noreferrer"
              href={githubRepoUrl}>
          <GitHub/>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
