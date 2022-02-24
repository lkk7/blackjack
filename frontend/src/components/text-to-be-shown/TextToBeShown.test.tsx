import { render, screen } from "../../testUtils";
import TextToBeShown from "./TextToBeShown";

describe("TextToBeShown", () => {
  test("Shows the text", () => {
    render(
      <TextToBeShown
        message="Error message!"
        component={"span"}
        color="black"
      />
    );
    const text = screen.getByText("Error message!");
    expect(text).toBeInTheDocument();
  });

  test("Doesn't show the placeholder text", () => {
    render(
      <TextToBeShown message="placeholder" component={"span"} color="black" />
    );
    const text = screen.getByText("placeholder");
    expect(text).not.toBeVisible();
  });
});
