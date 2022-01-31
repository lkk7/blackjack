import { AxiosResponse, AxiosError } from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import { GameResult } from "../../constants/game";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  GameState,
  selectGameResult,
  selectId,
  setWholeGame,
} from "../../store/slices/gameSlice";
import { placeholderText } from "../text-to-be-shown/TextToBeShown";

export const useGameActions = (): [
  boolean,
  (action: string) => void,
  () => void
] => {
  const [isTurnMsgOpen, setIsTurnMsgOpen] = useState(false);
  const gameId = useAppSelector(selectId);
  const dispatch = useAppDispatch();

  const moveInGame = (action: string) => {
    axiosInstance
      .post(`/${gameId}/${action}`)
      .then((response: AxiosResponse<GameState>) => {
        dispatch(setWholeGame(response.data));
      })
      .catch((e: AxiosError) => {
        if (
          e.code === "400" ||
          e.response?.data?.detail.includes("It's not your turn")
        ) {
          setIsTurnMsgOpen(true);
          setTimeout(() => setIsTurnMsgOpen(false), 1500);
        } else {
          throw e;
        }
      });
  };

  const restartGame = () => {
    axiosInstance
      .post(`/${gameId}/restart`)
      .then((response: AxiosResponse<GameState>) => {
        dispatch(setWholeGame(response.data));
      });
  };
  return [isTurnMsgOpen, moveInGame, restartGame];
};

export const useEffectGameResult = (): [
  {
    text: string;
    color: string;
  },
  boolean
] => {
  const [gameResultText, setGameResultText] = useState({
    text: placeholderText,
    color: "black",
  });
  const [areMovesDisabled, setAreMovesDisabled] = useState(false);
  const gameResult = useAppSelector(selectGameResult);

  useEffect(() => {
    switch (gameResult) {
      case GameResult.DEALER_WIN:
        setGameResultText({ text: "You lost!", color: "error" });
        setAreMovesDisabled(true);
        break;
      case GameResult.PLAYER_WIN:
        setGameResultText({ text: "You won!", color: "primary" });
        setAreMovesDisabled(true);
        break;
      case GameResult.DRAW:
        setGameResultText({ text: "It's a draw!", color: "black" });
        setAreMovesDisabled(true);
        break;
      default:
        setGameResultText({ text: "placeholder", color: "black" });
        setAreMovesDisabled(false);
        break;
    }
  }, [gameResult]);

  return [gameResultText, areMovesDisabled];
};
