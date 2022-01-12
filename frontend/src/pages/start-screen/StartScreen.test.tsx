import { render, screen } from "@testing-library/react";
import StartScreen from "./StartScreen";

test("renders something", () => {
  render(<StartScreen />);
  const linkElement = screen.getByText("game");
  expect(linkElement).toBeInTheDocument();
});
