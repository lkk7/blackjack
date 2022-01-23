import { Stack, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import Game from "../../components/game/Game";
import Logo from "../../components/logo/Logo";
import { useAppSelector } from "../../store/hooks";
import { selectId } from "../../store/slices/gameSlice";

const GameScreen = () => {
  const gameId = useAppSelector(selectId);

  return gameId ? (
    <>
      <Stack
        height="100vh"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <Logo size={2} oneLine />
        <Game />
        <Typography
          component={"footer"}
          sx={{ fontSize: "1.5vh", textAlign: "center" }}
        >
          Game ID: {gameId}
        </Typography>
      </Stack>
    </>
  ) : (
    <Navigate to={"/"} />
  );
};

export default GameScreen;
