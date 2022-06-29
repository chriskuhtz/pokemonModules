import { Box, Card, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ActivePokemon } from "../../Models/Pokemon";
import { RootState } from "../../Store/store";
import ModifierBox from "../ModifierBox/ModifierBox";
import OpponentPokemonBox from "../OpponentPokemonBox/OpponentPokemonBox";
import OpponentPokemonCard from "../OpponentPokemonCard/OpponentPokemonCard";
import ProgressWithLabel from "../ProgressWithLabel/ProgressWithLabel";

const ActivePokemonBox = () => {
  const pokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display="flex"
      justifyContent={"space-between"}
      flexDirection="column"
    >
      <OpponentPokemonCard />
      <img height="140px" width="140px" src={pokemon.spriteUrl} />
    </Box>
  );
};

export default ActivePokemonBox;
