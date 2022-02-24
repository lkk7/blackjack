import { AxiosResponse, AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import { placeholderText } from "../../components/text-to-be-shown/TextToBeShown";
import { useAppDispatch } from "../../store/hooks";
import { GameState, setWholeGame } from "../../store/slices/gameSlice";

export const useJoinGame = (): [boolean, string, (id: string) => void] => {
  const [isGameLoading, setIsGameLoading] = useState(false);
  const [gameLoadingError, setGameLoadingError] = useState(placeholderText);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return [
    isGameLoading,
    gameLoadingError,
    (id: string) => {
      setIsGameLoading(true);
      const requestPromise =
        id === "new" ? axiosInstance.post("/new") : axiosInstance.get(`/${id}`);
      requestPromise
        .then((response: AxiosResponse<GameState>) => {
          dispatch(setWholeGame(response.data));
          navigate("/game");
        })
        .catch((e: AxiosError) => {
          setIsGameLoading(false);
          if (e.response?.status === 404) {
            setGameLoadingError("A game with this ID doesn't exist.");
          } else {
            setGameLoadingError(
              `Couldn't connect to the server. (${e.message})`
            );
          }
        });
    },
  ];
};
