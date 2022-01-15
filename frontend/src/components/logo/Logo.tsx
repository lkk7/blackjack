import { Stack, Typography } from "@mui/material";

const Logo = () => (
  <Stack alignItems="center" spacing={0}>
    <Typography variant="h1" mb={0} color="primary">
      Blackjack
    </Typography>
    <Typography variant="h3" mt={0} color="primary">
      ♣️♦️♥️♠️
    </Typography>
  </Stack>
);

export default Logo;
