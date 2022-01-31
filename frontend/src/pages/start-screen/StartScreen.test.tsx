import { render, screen } from "@testing-library/react";
import GameScreen from "./StartScreen";

test("renders something", () => {
  render(<GameScreen />);
  const linkElement = screen.getByText("game");
  expect(linkElement).toBeInTheDocument();
});