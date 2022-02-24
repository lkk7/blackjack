import { render, screen } from "../../testUtils";
import Logo from "./Logo";

describe("Logo", () => {
  test("Renders the logo in two lines", () => {
    render(<Logo size={4} />);
    const text = screen.getByText("Blackjack");
    const symbols = screen.getByText("♣️♦️♥️♠️");
    const textAndSymbols = screen.queryByText("Blackjack ♣️♦️♥️♠️");
    expect(text).toBeInTheDocument();
    expect(symbols).toBeInTheDocument();
    expect(textAndSymbols).not.toBeInTheDocument();
  });

  test("Renders the logo in one line", () => {
    render(<Logo size={4} oneLine />);
    const text = screen.getByText("Blackjack ♣️♦️♥️♠️");
    expect(text).toBeInTheDocument();
  });
});
