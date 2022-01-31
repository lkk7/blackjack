import { render, screen } from "@testing-library/react";
import CardsList from "./CardsList";

test("Renders the logo", () => {
  render(<CardsList title="title" cards={[]} />);
  const text = screen.getByText("Blackjack");
  const symbols = screen.getByText("♣️♦️♥️♠️");
  expect(text).toBeInTheDocument();
  expect(symbols).toBeInTheDocument();
});
