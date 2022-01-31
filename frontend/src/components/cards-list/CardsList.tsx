import { Box, Chip, Slide, Stack, Typography } from "@mui/material";
import { CardSuit, RANK_SYMBOLS, SUIT_SYMBOLS } from "../../constants/game";
import { GameCard } from "../../store/slices/gameSlice";

interface CardsListProps {
  title: string;
  cards: GameCard[];
}

const colourHelper = (card: GameCard) =>
  card.hidden
    ? "green"
    : card.suit === CardSuit.DIAMONDS || card.suit === CardSuit.HEARTS
    ? "red"
    : "black";

const CardsList = ({ title, cards }: CardsListProps) => (
  <Stack component="figure">
    <Typography component="figcaption" textAlign="center">
      {title}
    </Typography>
    <Box display="flex" justifyContent="center" component="ul" p={0}>
      {cards.map((card: GameCard, index: number) => {
        const text = card.hidden
          ? "----"
          : `${RANK_SYMBOLS[card.rank]}${SUIT_SYMBOLS[card.suit]}`;
        return (
          <Slide in={true} key={text + index} direction="down">
            <Chip
              label={text}
              component="li"
              variant="filled"
              sx={{ color: colourHelper(card) }}
            />
          </Slide>
        );
      })}
    </Box>
  </Stack>
);

export default CardsList;
