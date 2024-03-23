import {AppBar, Box, Toolbar, useMediaQuery, useTheme} from "@mui/material";
import {IMenuRoutes} from "../../common/routing/IMenuRoutes.ts";
import {publicMenuRoutes} from "../../common/config/menu/publicMenuRoutes.tsx";
import MenuSmall from "../../common/utils/components/MenuSmall.tsx";
import MenuLarge from "../../common/utils/components/MenuLarge.tsx";
import SiteLogo from "../../common/utils/components/SiteLogo.tsx";

export default function PublicHeader() {
  const menu: IMenuRoutes = publicMenuRoutes;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <AppBar position="static"
            variant={"elevation"} elevation={0}
            sx={{
              boxShadow: `0 1px 10px ${theme.palette.background.default}`
            }}>
      <Toolbar>
        <SiteLogo/>
        <Box flexGrow={1}/>
        {isSmallScreen
            ? <MenuSmall menu={menu}/>
            : <MenuLarge menu={menu}/>
        }
      </Toolbar>
    </AppBar>
  );
}
