import { Stack, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { Navigate } from "react-router-dom";
import Game from "../../components/game/Game";
import Logo from "../../components/logo/Logo";
import { useAppSelector } from "../../store/hooks";
import { selectId } from "../../store/slices/gameSlice";

const GameScreen = () => {
  const [isGameIdVisible, setIsGameIdVisible] = useState(false);
  const gameId = useAppSelector(selectId);

  return gameId ? (
    <Fragment>
      <Stack
        height="100vh"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
      >
        <header>
          <Logo size={2} oneLine />
        </header>
        <Game />
        <Typography
          component={"footer"}
          sx={{ fontSize: "1.5vh", textAlign: "center" }}
          onClick={() => {
            setIsGameIdVisible((current) => !current);
            navigator.clipboard.writeText(gameId);
          }}
        >
          {isGameIdVisible
            ? gameId
            : "Click to reveal Game ID and copy it to clipboard"}
        </Typography>
      </Stack>
    </Fragment>
  ) : (
    <Navigate to={"/"} />
  );
};

export default GameScreen;
