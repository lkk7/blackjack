import { render, screen } from "@testing-library/react";
import Logo from "./Logo";

test("Renders the logo", () => {
  render(<Logo />);
  const text = screen.getByText("Blackjack");
  const symbols = screen.getByText("♣️♦️♥️♠️");
  expect(text).toBeInTheDocument();
  expect(symbols).toBeInTheDocument();
});
