import {createTheme, ThemeProvider} from "@mui/material/styles";
import {ReactNode} from "react";
import {CssBaseline} from "@mui/material";
import useThemePaletteMode from "./ThemePaletteModeProvider.tsx";
import {darkPalette, lightPalette} from "../../config/colorPaletteConfig.ts";
import {PaletteOptions} from "@mui/material/styles/createPalette";

interface AppThemeProviderProps {
  children: ReactNode;
}

export function AppThemeProvider({children}: AppThemeProviderProps) {
  const paletteMode = useThemePaletteMode().paletteMode;
  const light: PaletteOptions = lightPalette;
  const dark: PaletteOptions = darkPalette;

  const theme = createTheme({
    palette: paletteMode === "light"
      ? light
      : dark,
    components: {
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
      },
      MuiTextField: {
        defaultProps: {
          InputLabelProps: {
            style: {color: paletteMode === "light" ? light.text?.primary : dark.text?.primary}
          },
          InputProps: {
            style: {color: paletteMode === "light" ? light.text?.primary : dark.text?.primary}
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& $notchedOutline": {
              borderColor: paletteMode === "light" ? light.text?.primary : dark.text?.primary
            },
            "&:hover $notchedOutline": {
              borderColor: paletteMode === "light" ? light.text?.primary : dark.text?.primary
            },
            "&$focused $notchedOutline": {
              borderColor: paletteMode === "light" ? light.text?.primary : dark.text?.primary
            }
          },
          notchedOutline: {}
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: paletteMode === "light" ? light.text?.primary : dark.text?.primary,
            "&$focused": {
              color: paletteMode === "light" ? light.text?.primary : dark.text?.primary
            }
          }
        }
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
