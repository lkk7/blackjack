import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardRank, CardSuit, GameResult } from "../../constants/game";
import type { RootState } from "../store";

export interface GameCard {
  rank: CardRank;
  suit: CardSuit;
  hidden: boolean;
}

export interface GameState {
  gameId?: string;
  total: number;
  state: GameResult;
  playerHand: GameCard[];
  dealerHand: GameCard[];
}

export const initialState: GameState = {
  total: 0,
  state: GameResult.YET_TO_DEAL,
  playerHand: [],
  dealerHand: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.gameId = action.payload;
    },
    setWholeGame: (state, action: PayloadAction<GameState>) => {
      return action.payload;
    },
  },
});

export const { setId, setWholeGame } = gameSlice.actions;
export const selectId = (state: RootState) => state.game.gameId;
export const selectDealerCards = (state: RootState) => state.game.dealerHand;
export const selectPlayerCards = (state: RootState) => state.game.playerHand;
export const selectTotalScore = (state: RootState) => state.game.total;
export const selectGameResult = (state: RootState) => state.game.state;
export default gameSlice.reducer;
