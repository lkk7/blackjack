import { render, screen } from "@testing-library/react";
import Logo from "./Logo";

test("Renders the logo", () => {
  render(<Logo size={4}/>);
  const text = screen.getByText("Blackjack");
  const symbols = screen.getByText("♣️♦️♥️♠️");
  expect(text).toBeInTheDocument();
  expect(symbols).toBeInTheDocument();
});