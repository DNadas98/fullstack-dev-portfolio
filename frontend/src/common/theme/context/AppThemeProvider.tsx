import {createTheme, ThemeProvider} from "@mui/material/styles";
import {ReactNode} from "react";
import {CssBaseline} from "@mui/material";
import {darkPalette} from "../../config/colorPaletteConfig.ts";
import {PaletteOptions} from "@mui/material/styles/createPalette";

interface AppThemeProviderProps {
  children: ReactNode;
}

export function AppThemeProvider({children}: AppThemeProviderProps) {
  const dark: PaletteOptions = darkPalette;

  const theme = createTheme({
    palette: dark,
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
            style: {color: dark.text?.primary}
          },
          InputProps: {
            style: {color: dark.text?.primary}
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& $notchedOutline": {
              borderColor: dark.text?.primary
            },
            "&:hover $notchedOutline": {
              borderColor: dark.text?.primary
            },
            "&$focused $notchedOutline": {
              borderColor: dark.text?.primary
            }
          },
          notchedOutline: {}
        }
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: dark.text?.primary,
            "&$focused": {
              color: dark.text?.primary
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
