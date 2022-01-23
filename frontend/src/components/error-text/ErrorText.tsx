import { SxProps, Typography } from "@mui/material";

export interface ErrorTextProps {
  message: string;
  sxProps?: SxProps;
}
export const placeholderError = "placeholder";

/** 
 *
 * @param message message to be shown
 * @param sxProps sxProps from MUI, can be used to define custom style
 * @returns error text component
 */
const ErrorText = ({ message, sxProps }: ErrorTextProps) => (
  <Typography
    variant="caption"
    color="error"
    sx={{
      visibility: message === placeholderError ? "hidden" : "visible",
      ...sxProps,
    }}
    mt={1}
  >
    {message}
  </Typography>
);

export default ErrorText;
