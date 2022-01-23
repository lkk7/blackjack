import { render, screen } from "@testing-library/react";
import ErrorText from "./ErrorText";

test("Renders the error", () => {
  render(<ErrorText message="Error message!" />);
  const text = screen.getByText("Blackjack");
  const symbols = screen.getByText("♣️♦️♥️♠️");
  expect(text).toBeInTheDocument();
  expect(symbols).toBeInTheDocument();
});
