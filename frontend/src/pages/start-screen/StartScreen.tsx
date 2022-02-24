import { useRef } from "react";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import TextToBeShown from "../../components/text-to-be-shown/TextToBeShown";
import Logo from "../../components/logo/Logo";
import { useJoinGame } from "./start-screen-hooks";

const StartScreen = () => {
  const [isGameLoading, gameLoadingError, joinGame] = useJoinGame();
  const gameIdRef = useRef<any>(); // "any" – neccessary for compliance with MUI API.

  return (
    <Stack
      height="100vh"
      alignItems="center"
      justifyContent="center"
      spacing={8}
      component="main"
    >
      <Logo size={4} />
      <Stack alignItems="center">
        <LoadingButton
          variant="contained"
          loading={isGameLoading}
          onClick={() => joinGame("new")}
        >
          New game
        </LoadingButton>
        <TextToBeShown
          component="span"
          message={gameLoadingError}
          color="error"
        ></TextToBeShown>
      </Stack>
      <Stack alignItems="center" spacing={1} width={"100%"}>
        <TextField
          id="game-id"
          label="Game ID"
          size="small"
          inputRef={gameIdRef}
          inputProps={{ maxLength: 100 }}
        />
        <LoadingButton
          loading={isGameLoading}
          onClick={() => joinGame(gameIdRef.current.value)}
        >
          Continue a game
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default StartScreen;
