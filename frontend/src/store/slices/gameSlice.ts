import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface GameCard {
  rank: number;
  suit: number;
  hidden: boolean;
}

export interface GameState {
  gameId?: string;
  total: number;
  bet: number;
  state: number;
  playerHand: GameCard[];
  dealerHand: GameCard[];
  deck: GameCard[];
}

const initialState: GameState = {
  total: 0,
  bet: 0,
  state: 0,
  playerHand: [],
  dealerHand: [],
  deck: [],
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
export default gameSlice.reducer;
