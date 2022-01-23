import { LoadingButton } from "@mui/lab";
import { Stack, TextField } from "@mui/material";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import ErrorText, {
  placeholderError,
} from "../../components/error-text/ErrorText";
import Logo from "../../components/logo/Logo";
import { useAppDispatch } from "../../store/hooks";
import { GameState, setWholeGame } from "../../store/slices/gameSlice";

const StartScreen = () => {
  const [isNewGameLoading, setIsNewGameLoading] = useState(false);
  const [newGameError, setNewGameError] = useState(placeholderError);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const joinNewGame: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsNewGameLoading(true);
    axiosInstance
      .post("/new")
      .then((response: AxiosResponse<GameState>) => {
        setIsNewGameLoading(false);
        setNewGameError("");
        dispatch(setWholeGame(response.data));
        navigate("/game");
      })
      .catch((e: AxiosError) => {
        setIsNewGameLoading(false);
        setNewGameError(`Couldn't connect to the server. (${e.message})`);
      });
  };

  return (
    <Stack
      height="100vh"
      alignItems="center"
      justifyContent="center"
      spacing={8}
    >
      <Logo size={4} />
      <Stack alignItems="center">
        <LoadingButton
          variant="contained"
          loading={isNewGameLoading}
          onClick={joinNewGame}
        >
          New game
        </LoadingButton>
        <ErrorText message={newGameError}></ErrorText>
      </Stack>
      <Stack alignItems="center" spacing={1} width={"100%"}>
        <TextField id="game-id" label="Game ID" size="small" />
        <LoadingButton>Continue a game</LoadingButton>
      </Stack>
    </Stack>
  );
};

export default StartScreen;
