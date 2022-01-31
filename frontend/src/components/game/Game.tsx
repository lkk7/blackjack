import { Box, Snackbar, Stack, Typography } from "@mui/material";
import CardsList from "../cards-list/CardsList";
import { useAppSelector } from "../../store/hooks";
import {
  selectDealerCards,
  selectPlayerCards,
  selectTotalScore,
} from "../../store/slices/gameSlice";
import { LoadingButton } from "@mui/lab";
import TextToBeShown from "../text-to-be-shown/TextToBeShown";
import { useEffectGameResult, useGameActions } from "./Game.hooks";

const Game = () => {
  const dealerCards = useAppSelector(selectDealerCards);
  const playerCards = useAppSelector(selectPlayerCards);
  const totalScore = useAppSelector(selectTotalScore);

  const [isTurnMsgOpen, moveInGame, restartGame] = useGameActions();
  const [gameResultText, areMovesDisabled] = useEffectGameResult();

  return (
    <Stack
      height="100%"
      width="100%"
      justifyContent="center"
      alignItems="center"
      spacing={5}
      component="main"
    >
      <Box mb={1}>
        <CardsList title="Dealer's cards" cards={dealerCards} />
        <CardsList title="Your Cards" cards={playerCards} />
        <Box display="flex" justifyContent="center">
          <LoadingButton
            variant="contained"
            loading={false}
            disabled={areMovesDisabled}
            onClick={() => moveInGame("hit")}
            sx={{ marginRight: 1 }}
          >
            Hit
          </LoadingButton>
          <LoadingButton
            variant="contained"
            loading={false}
            disabled={areMovesDisabled}
            onClick={() => moveInGame("stand")}
          >
            Stand
          </LoadingButton>
        </Box>
      </Box>
      <Stack alignItems="center" spacing={1}>
        <TextToBeShown
          component="span"
          message={gameResultText.text}
          color={gameResultText.color}
          sxProps={{ fontSize: "2.5vh" }}
        />
        <LoadingButton
          variant="contained"
          loading={false}
          onClick={() => restartGame()}
        >
          New game (restart)
        </LoadingButton>
        <Typography>Total score: {totalScore}</Typography>
      </Stack>
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={isTurnMsgOpen}
        message="You can't make this move now!"
      />
    </Stack>
  );
};

export default Game;
