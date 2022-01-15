import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import axiosInstance from "../../axiosConfig";
import Logo from "../../components/logo/Logo";

const StartScreen = () => {
  const [isNewGameLoading, setIsNewGameLoading] = useState(false);
  const joinNewGame: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsNewGameLoading(true);
    axiosInstance
      .post("/new")
      .then((response) => {})
      .catch((e) => {
        setIsNewGameLoading(false);
      });
  };

  return (
    <Stack
      height="100vh"
      alignItems="center"
      justifyContent="center"
      spacing={8}
    >
      <Logo />
      <LoadingButton
        variant="contained"
        loading={isNewGameLoading}
        onClick={joinNewGame}
      >
        New game
      </LoadingButton>
      <Stack alignItems="center" spacing={1} width={"100%"}>
        <TextField id="game-id" label="Game ID" size="small" />
        <LoadingButton>Continue a game</LoadingButton>
      </Stack>
    </Stack>
  );
};

export default StartScreen;
