import {PaletteOptions} from "@mui/material/styles/createPalette";

export const darkPalette: PaletteOptions = {
  primary: {main: "#202E40"},
  secondary: {main: "#9BB5BF"},
  background: {default: "#0c0f14", paper: "#202E40"},
  success: {main: "#4CAF50"},
  error: {main: "#F44336"},
  warning: {main: "#FF9800"},
  text: {primary: "#F2F0EB", secondary: "#F2F0EB"}
};

export const darkPalette1: PaletteOptions = {
  primary: {main: "#546E7A"}, // A darker shade of blue-grey for primary elements
  secondary: {main: "#B0BEC5"}, // Light cool grey, inverted from the light palette for secondary elements
  background: {default: "#263238", paper: "#37474F"}, // Deep blue-grey for backgrounds, offering high contrast with text
  success: {main: "#388E3C"}, // A deeper green for success messages, ensuring visibility
  error: {main: "#D32F2F"}, // Richer red for errors, stands out against dark backgrounds
  warning: {main: "#FFA000"}, // Vibrant amber for warnings, ensuring good visibility
  text: {primary: "#ECEFF1", secondary: "#CFD8DC"} // Light blue-grey tones for text, ensuring legibility
};

export const darkPalette2: PaletteOptions = {
  primary: {main: "#455A64"}, // Slightly lighter blue-grey, for a bit of softness
  secondary: {main: "#90A4AE"}, // Soft grey, a mid-point for secondary elements
  background: {default: "#212121", paper: "#263238"}, // Almost black and dark slate for deep contrasts
  success: {main: "#43A047"}, // A vibrant green, popping against dark surfaces
  error: {main: "#E53935"}, // Bright red for clear error indication
  warning: {main: "#FFB300"}, // Deep yellow for an eye-catching warning color
  text: {primary: "#CFD8DC", secondary: "#B0BEC5"} // Keeping text colors consistent with the light palette for familiarity
};

export const darkPalette3: PaletteOptions = {
  primary: {main: "#607D8B"}, // Cooler, lighter blue-grey, for primary interface elements
  secondary: {main: "#78909C"}, // A muted blue for secondary elements, ensuring differentiation
  background: {default: "#102027", paper: "#263238"}, // Dark teal and blue-grey for background, adding depth
  success: {main: "#66BB6A"}, // Light green for a refreshing look on success states
  error: {main: "#F44336"}, // Classic Material Design red, vibrant against dark surfaces
  warning: {main: "#FFCA28"}, // Bright yellow, ensuring visibility on dark backgrounds
  text: {primary: "#ECEFF1", secondary: "#B0BEC5"} // Light text colors for high contrast with the dark backgrounds
};

export const lightPalette: PaletteOptions = {
  primary: {main: "#B0BEC5"},
  secondary: {main: "#37474F"},
  background: {default: "#ECEFF1", paper: "#CFD8DC"},
  success: {main: "#A5D6A7"},
  error: {main: "#ef9a9a"},
  warning: {main: "#FFCC80"},
  text: {primary: "#37474F", secondary: "#62757F"}
};
