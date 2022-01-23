import { render, screen } from "@testing-library/react";
import Game from "./Game";

test("Renders the logo", () => {
  render(<Game />);
  const text = screen.getByText("Blackjack");
  const symbols = screen.getByText("♣️♦️♥️♠️");
  expect(text).toBeInTheDocument();
  expect(symbols).toBeInTheDocument();
});
