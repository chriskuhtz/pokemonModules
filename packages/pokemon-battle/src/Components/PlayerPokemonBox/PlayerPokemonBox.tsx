import { Box, LinearProgress } from "@mui/material";
import { PlayerPokemon } from "../../Models/Pokemon";

const PlayerPokemonBox = ({ pokemon }: { pokemon: PlayerPokemon }) => {
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

export default PlayerPokemonBox;
