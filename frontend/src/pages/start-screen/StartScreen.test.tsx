import { waitFor } from "@testing-library/react";
import axiosInstance from "../../axiosConfig";
import { GameResult } from "../../constants/game";
import { GameState } from "../../store/slices/gameSlice";
import { render, screen } from "../../testUtils";
import StartScreen from "./StartScreen";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("GameScreen", () => {
  const stateResponse: { data: GameState } = {
    data: {
      gameId: "gameId123",
      total: 1000,
      state: GameResult.PLAYER_TO_HIT,
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the logo and all expected buttons", () => {
    render(<StartScreen />);
    expect(screen.getByText("Blackjack")).toBeInTheDocument();
    expect(screen.getByText("♣️♦️♥️♠️")).toBeInTheDocument();
    expect(screen.getByText("New game")).toBeInTheDocument();
    expect(screen.getByText("Continue a game")).toBeInTheDocument();
  });

  test("navigates to the new game screen with a successful response", async () => {
    jest.spyOn(axiosInstance, "post").mockResolvedValueOnce(stateResponse);
    render(<StartScreen />);
    screen.getByText("New game").click();
    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith("/game"));
  });

  test("navigates to the continued game screen with a successful response", async () => {
    jest.spyOn(axiosInstance, "get").mockResolvedValueOnce(stateResponse);
    render(<StartScreen />);
    screen.getByText("Continue a game").click();
    await waitFor(() => expect(mockedNavigate).toHaveBeenCalledWith("/game"));
  });

  test("Shows error messages correctly", async () => {
    jest
      .spyOn(axiosInstance, "post")
      .mockRejectedValueOnce({ message: "TestMessage" });
    render(<StartScreen />);
    screen.getByText("New game").click();
    expect(
      await screen.findByText("Couldn't connect to the server. (TestMessage)")
    ).toBeInTheDocument();
    jest
      .spyOn(axiosInstance, "post")
      .mockRejectedValueOnce({ response: { status: 404 } });
    screen.getByText("New game").click();
    expect(
      await screen.findByText("A game with this ID doesn't exist.")
    ).toBeInTheDocument();
  });
});
