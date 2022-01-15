import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import StartScreen from "./pages/start-screen/StartScreen";
import theme from "./theme";

const App = () => (
  <div className="App">
    <StartScreen />
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
