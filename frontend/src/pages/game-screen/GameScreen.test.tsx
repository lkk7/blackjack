import { render, screen } from "../../testUtils";
import GameScreen from "./GameScreen";

describe("GameScreen", () => {
  Object.assign(navigator, {
    clipboard: {
      writeText: () => {},
    },
  });

  test("renders the header logo", () => {
    render(<GameScreen />);
    const logo = screen.getByText("Blackjack ♣️♦️♥️♠️");
    expect(logo).toBeInTheDocument();
  });

  test("renders the clickable footer", () => {
    render(<GameScreen />);
    const footer = screen.getByText(
      "Click to reveal Game ID and copy it to clipboard"
    );
    expect(footer).toBeInTheDocument();
  });

  test("Shows and copies the game ID to clipboard on click", async () => {
    const writeToClipboard = jest.spyOn(navigator.clipboard, "writeText");
    render(<GameScreen />);
    const footer = screen.getByText(
      "Click to reveal Game ID and copy it to clipboard"
    );
    footer.click();
    const id = await screen.findByText("testId123");
    expect(id).toBeInTheDocument();
    expect(writeToClipboard).toHaveBeenCalledWith("testId123");
  });
});
