import { createTheme, responsiveFontSizes } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#206020",
      },
    },
  })
);
export default theme;
