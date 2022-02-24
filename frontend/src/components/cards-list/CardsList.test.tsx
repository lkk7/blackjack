import { render, screen } from "../../testUtils";
import { GameCard } from "../../store/slices/gameSlice";
import CardsList from "./CardsList";

describe("CardsList", () => {
  const testCardList: GameCard[] = [
    { rank: 0, suit: 0, hidden: false },
    { rank: 1, suit: 1, hidden: false },
    { rank: 2, suit: 2, hidden: true },
  ];

  test("Renders the list with expected card labels and title", () => {
    render(<CardsList title="title" cards={testCardList} />);
    expect(screen.getByText("title")).toBeInTheDocument();

    const expectedCards = ["A♣️", "2♦️", "----"];
    for (const expectedCard of expectedCards) {
      const card = screen.getByText(expectedCard);
      expect(card).toBeInTheDocument();
    }
  });
});
