import { Button, Stack, TextField } from "@mui/material";

const StartScreen = () => (
  <Stack height="100vh" alignItems="center" justifyContent="center">
    <Button>Create a new game</Button>
    Or join an existing one...
    <TextField id="outlined-basic" label="Game ID" variant="outlined"/>
  </Stack>
);

export default StartScreen;
