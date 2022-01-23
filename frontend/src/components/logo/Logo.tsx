import { Stack, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";

export interface LogoProps {
  size: 1 | 2 | 3 | 4;
  oneLine?: boolean;
}
/**
 *
 * @param size defines the size, from 1 to 4
 * @param oneLine whether to render the symbols in the same line as text or in the next one
 * @returns the logo component
 */
const Logo = ({ size, oneLine = false }: LogoProps) => (
  <Stack alignItems="center" spacing={0}>
    {oneLine ? (
      <Typography variant={`h${7 - size}` as Variant} mb={0} color="primary" mt={1}>
        Blackjack ♣️♦️♥️♠️
      </Typography>
    ) : (
      <>
        <Typography variant={`h${5 - size}` as Variant} mb={0} color="primary">
          Blackjack
        </Typography>
        <Typography variant={`h${7 - size}` as Variant} mt={0} color="primary">
          ♣️♦️♥️♠️
        </Typography>
      </>
    )}
  </Stack>
);

export default Logo;
