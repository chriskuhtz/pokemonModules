import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { PokemonIcon } from "chriskuhtz-pokemon-common-components";

import BattleScreen from "./Components/BattleScreen/BattleScreen";
import { useCreateTwoRandomPokemon } from "./Functions/Pokemon/useCreateTwoRandomPokemon";

const App = (): JSX.Element => {
  const theme = useTheme();
  const smOrUp = useMediaQuery(theme.breakpoints.up("sm"));

  const { activePokemon, opponentPokemon } = useCreateTwoRandomPokemon();

  if (smOrUp) {
    return (
      <BattleScreen
        activePokemon={activePokemon}
        opponentPokemon={opponentPokemon}
      />
    );
  } else {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height="100vh"
      >
        <Stack alignItems={"center"}>
          <PokemonIcon index={25} />

          <Typography variant="h5">Please turn your phone sideways.</Typography>
        </Stack>
      </Box>
    );
  }
};

export default App;
