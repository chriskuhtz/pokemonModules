import { Box, useMediaQuery, useTheme } from "@mui/material";
import { PokemonLoadingSpinner } from "chriskuhtz-pokemon-common-components";

import BattleScreen from "./Components/BattleScreen/BattleScreen";
import { useCreateTwoRandomPokemon } from "./Functions/Pokemon/useCreateTwoRandomPokemon";
import { fallbackPokemon } from "./Utils/Constants/fallbackPokemon";

const App = (): JSX.Element => {
  const theme = useTheme();
  const smOrUp = useMediaQuery(theme.breakpoints.up("sm"));

  const { activePokemon, opponentPokemon } = useCreateTwoRandomPokemon();

  if (
    smOrUp &&
    activePokemon.value.name !== fallbackPokemon.name &&
    opponentPokemon.value.name !== fallbackPokemon.name
  ) {
    return <BattleScreen />;
  } else if (smOrUp) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height="100vh"
      >
        <PokemonLoadingSpinner index={25} />
      </Box>
    );
  } else {
    return <div>Please turn your phone sideways</div>;
  }
};

export default App;
