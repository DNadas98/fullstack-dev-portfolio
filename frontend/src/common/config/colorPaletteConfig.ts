import {PaletteOptions} from "@mui/material/styles/createPalette";

const darkBlue = "#052350";
const lightBlue = "#9badb9";
const black = "#0c0f14";
const white = "#E3EEFF";

export const darkPalette: PaletteOptions = {
  primary: {main: darkBlue},
  secondary: {main: lightBlue},
  background: {default: black, paper: darkBlue},
  success: {main: "#4CAF50"},
  error: {main: "#F44336"},
  warning: {main: "#FF9800"},
  text: {primary: white, secondary: white}
};
