import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      light: "#334f68",
      main: "#002343",
      dark: "#00182e",
      contrastText: "#fff",
    },
    secondary: {
      light: "#c3ad81",
      main: "#b49962",
      dark: "##7d6b44",
      contrastText: "#000",
    },
    error: {
      main: red[500],
    },
  },
});

export default theme;
