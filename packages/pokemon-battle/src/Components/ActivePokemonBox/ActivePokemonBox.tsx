import { Box, Card, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ActivePokemon } from "../../Models/Pokemon";
import { RootState } from "../../Store/store";
import ModifierBox from "../ModifierBox/ModifierBox";
import ProgressWithLabel from "../ProgressWithLabel/ProgressWithLabel";

const ActivePokemonBox = () => {
  const pokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.uiState
  );

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display="flex"
      justifyContent={"space-between"}
      flexDirection="column"
    >
      <img height="150px" width="150px" src={pokemon.spriteUrl} />
      <Card variant="outlined" sx={{ px: 1, m: 1, overflowY: "scroll" }}>
        <Stack>
          <Typography variant="h5">{pokemon.name}</Typography>
          <ModifierBox stats={pokemon.stats} />
          <ProgressWithLabel
            label={`${pokemon.hp.current} / ${pokemon.hp.initial}`}
            value={(pokemon.hp.current / pokemon.hp.initial) * 100}
            healthBar
          />

          <ProgressWithLabel label={`Lvl: ${pokemon.level}`} value={60} />
        </Stack>
      </Card>
    </Box>
  );
};

export default ActivePokemonBox;
