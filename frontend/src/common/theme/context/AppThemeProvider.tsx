import {createTheme, ThemeProvider} from "@mui/material/styles";
import {ReactNode} from "react";
import {CssBaseline} from "@mui/material";
import useThemePaletteMode from "./ThemePaletteModeProvider.tsx";
import {darkPalette, lightPalette} from "../../config/colorPaletteConfig.ts";

interface AppThemeProviderProps {
  children: ReactNode;
}

export function AppThemeProvider({children}: AppThemeProviderProps) {
  const paletteMode = useThemePaletteMode().paletteMode;
  const theme = createTheme({
    palette: paletteMode === "light"
      ? lightPalette
      : darkPalette,
    components: {
      MuiTypography: {
        styleOverrides: {
          body1: {
            textShadow: `1px 1px 5px ${
              paletteMode === "light"
                ? lightPalette.primary?.main
                : darkPalette.primary?.main
            }`
          },
          body2: {
            textShadow: `1px 1px 5px ${
              paletteMode === "light"
                ? lightPalette.primary?.main
                : darkPalette.primary?.main
            }`
          },
          h4: {
            textShadow: `1px 1px 5px ${
              paletteMode === "light"
                ? lightPalette.primary?.main
                : darkPalette.primary?.main
            }`
          },
          h6: {
            textShadow: `1px 1px 5px ${
              paletteMode === "light"
                ? lightPalette.primary?.main
                : darkPalette.primary?.main
            }`
          }
        }
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            minWidth: "286px"
          }
        }
      },
      MuiButton: {
        defaultProps: {
          color: "secondary"
        }
      },
      MuiAlert: {
        styleOverrides: {
          standardInfo: {color: "secondary"},
          standardSuccess: {color: "success"},
          standardWarning: {color: "warning"},
          standardError: {color: "error"}
        },
        defaultProps: {variant: "standard"}
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      {children}
    </ThemeProvider>
  );
}
