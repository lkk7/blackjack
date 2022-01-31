export enum CardRank {
  ACE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
}

export enum CardSuit {
  CLUBS,
  DIAMONDS,
  HEARTS,
  SPADES,
}

export enum GameResult {
  YET_TO_DEAL,
  PLAYER_TO_HIT,
  DEALER_TO_HIT,
  PLAYER_WIN,
  DEALER_WIN,
  DRAW,
}

// Hard-coded rank-to-symbol mappings
export const RANK_SYMBOLS: { [key in CardRank]: string } = {
  [CardRank.ACE]: "A",
  [CardRank.TWO]: "2",
  [CardRank.THREE]: "3",
  [CardRank.FOUR]: "4",
  [CardRank.FIVE]: "5",
  [CardRank.SIX]: "6",
  [CardRank.SEVEN]: "7",
  [CardRank.EIGHT]: "8",
  [CardRank.NINE]: "9",
  [CardRank.TEN]: "10",
  [CardRank.JACK]: "J",
  [CardRank.QUEEN]: "Q",
  [CardRank.KING]: "K",
};

// Hard-coded suit-to-symbol mappings
export const SUIT_SYMBOLS: { [key in CardSuit]: string } = {
  [CardSuit.CLUBS]: "♣️",
  [CardSuit.DIAMONDS]: "♦️",
  [CardSuit.HEARTS]: "♥️",
  [CardSuit.SPADES]: "♠️",
};
