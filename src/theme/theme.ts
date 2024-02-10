import { defaultTheme } from "react-admin";
import { red, blueGrey, blue } from "@mui/material/colors";

export const theme = {
  ...defaultTheme,
  palette: {
    primary: blue,
    secondary: blueGrey,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: "Jost",
  },
};
