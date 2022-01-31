import { SxProps, Typography } from "@mui/material";
import { ElementType } from "react";

export interface TextToBeShownProps {
  message: string;
  component: ElementType<any>;
  color?: string;
  sxProps?: SxProps;
}
export const placeholderText = "placeholder";

/**
 *
 * @param component component into which to cast the
 * @param message message to be shown
 * @param color color of the text
 * @param sxProps sxProps from MUI, can be used to define custom style
 * @returns text component that takes up space even when invisible
 */
const TextToBeShown = ({
  message,
  component,
  color,
  sxProps,
}: TextToBeShownProps) => (
  <Typography
    variant="caption"
    component={component}
    color={color}
    sx={{
      visibility: message === placeholderText ? "hidden" : "visible",
      ...sxProps,
    }}
    mt={1}
  >
    {message}
  </Typography>
);

export default TextToBeShown;
