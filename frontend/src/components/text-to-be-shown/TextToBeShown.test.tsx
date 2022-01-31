import { render, screen } from "@testing-library/react";
import TextToBeShown from "./TextToBeShown";

test("Renders the error", () => {
  render(<TextToBeShown component={"span"} message="Error message!" />);
  const text = screen.getByText("Blackjack");
  const symbols = screen.getByText("♣️♦️♥️♠️");
  expect(text).toBeInTheDocument();
  expect(symbols).toBeInTheDocument();
});
