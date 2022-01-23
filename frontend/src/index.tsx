import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import StartScreen from "./pages/start-screen/StartScreen";
import GameScreen from "./pages/game-screen/GameScreen";
import { store } from "./store/store";
import theme from "./theme";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<StartScreen />}></Route>
      <Route path="game" element={<GameScreen />}></Route>
      <Route path="*" element="Wrong path!" />
    </Routes>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
