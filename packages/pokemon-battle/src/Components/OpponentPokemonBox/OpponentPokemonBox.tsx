import { Box, LinearProgress } from "@mui/material";
import { OpponentPokemon, WildPokemon } from "../../Models/Pokemon";

const OpponentPokemonBox = ({
  pokemon,
}: {
  pokemon: OpponentPokemon | WildPokemon;
}) => {
  return (
    <Box>
      {pokemon.name}
      <img src={pokemon.spriteUrl} />
      <LinearProgress
        value={(pokemon.stats.hp.current / pokemon.stats.hp.initial) * 100}
        variant="determinate"
        color="success"
      />
    </Box>
  );
};

export default OpponentPokemonBox;
