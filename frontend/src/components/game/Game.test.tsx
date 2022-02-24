import axiosInstance from "../../axiosConfig";
import { GameResult } from "../../constants/game";
import { GameState } from "../../store/slices/gameSlice";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../testUtils";
import Game from "./Game";

const baseResponse: { data: GameState } = {
  data: {
    gameId: "gameId123",
    total: 1000,
    state: GameResult.YET_TO_DEAL,
    playerHand: [
      { rank: 0, suit: 0, hidden: false },
      { rank: 1, suit: 1, hidden: false },
    ],
    dealerHand: [
      { rank: 8, suit: 0, hidden: false },
      { rank: 9, suit: 1, hidden: false },
      { rank: 10, suit: 2, hidden: true },
    ],
  },
};

const generateApiResponse = (result: GameResult): { data: GameState } => {
  return {
    data: { ...baseResponse.data, state: result },
  };
};

describe("Game", () => {
  test("Renders three action buttons", () => {
    render(<Game />);
    const buttons = ["Hit", "Stand", "New game (restart)"].map((button) =>
      screen.getByText(button)
    );
    for (const button of buttons) {
      expect(button).toBeInTheDocument();
    }
  });

  test.each(["Hit", "Stand", "New game (restart)"])(
    "%p button correctly sets the result data",
    async (button) => {
      jest
        .spyOn(axiosInstance, "post")
        .mockResolvedValueOnce(generateApiResponse(GameResult.PLAYER_TO_HIT));
      render(<Game />);
      const hitButton = screen.getByText(button);
      userEvent.click(hitButton);
      for (const cardLabel of ["A♣️", "2♦️", "9♣️", "10♦️", "----"]) {
        expect(await screen.findByText(cardLabel)).toBeInTheDocument();
      }
    }
  );

  test.each([
    ["You lost!", GameResult.DEALER_WIN],
    ["You won!", GameResult.PLAYER_WIN],
    ["It's a draw!", GameResult.DRAW],
    ["placeholder", GameResult.PLAYER_TO_HIT],
  ])(
    "Shows a %p message when the game result says so",
    async (message, gameResult) => {
      jest
        .spyOn(axiosInstance, "post")
        .mockResolvedValueOnce(generateApiResponse(gameResult));
      render(<Game />);
      const hitButton = screen.getByText("Hit");
      userEvent.click(hitButton);
      expect(await screen.findByText(message)).toBeInTheDocument();
    }
  );

  test.each(["Hit", "Stand"])(
    "Handles 'not your turn' errors for %p button correctly",
    async (button) => {
      jest.spyOn(axiosInstance, "post").mockRejectedValueOnce({ code: "400" });
      render(<Game />);
      const hitButton = screen.getByText(button);
      userEvent.click(hitButton);
      expect(
        await screen.findByText("You can't make this move now!")
      ).toBeInTheDocument();
    }
  );

  test("Restarts the game correctly", async () => {
    jest
      .spyOn(axiosInstance, "post")
      .mockResolvedValueOnce(generateApiResponse(GameResult.PLAYER_TO_HIT));
    render(<Game />);
    for (const cardLabel of ["A♣️", "2♦️"]) {
      expect(screen.queryByText(cardLabel)).not.toBeInTheDocument();
    }
    const hitButton = screen.getByText("New game (restart)");
    userEvent.click(hitButton);
    for (const cardLabel of ["A♣️", "2♦️"]) {
      expect(await screen.findByText(cardLabel)).toBeInTheDocument();
    }
  });
});
