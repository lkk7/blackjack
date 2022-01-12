import React from "react";
import ReactDOM from "react-dom";
import StartScreen from "./pages/start-screen/StartScreen";

const App = () => (
  <div className="App">
    <StartScreen />
  </div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
