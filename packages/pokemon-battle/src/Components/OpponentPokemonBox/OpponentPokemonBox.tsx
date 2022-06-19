import { Box, Card, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { OpponentPokemon } from "../../Models/Pokemon";
import { RootState } from "../../Store/store";
import ModifierBox from "../ModifierBox/ModifierBox";
import ProgressWithLabel from "../ProgressWithLabel/ProgressWithLabel";

const OpponentPokemonBox = () => {
  const pokemon: OpponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon.value
  );

  return (
    <Box
      width={"100%"}
      height={"100%"}
      display="flex"
      justifyContent={"space-between"}
      flexDirection="column"
    >
      <Box alignSelf={"flex-end"}>
        <img height="150px" width="150px" src={pokemon.spriteUrl} />
      </Box>
      <Card variant="outlined" sx={{ px: 1, m: 1, overflowY: "scroll" }}>
        <Stack>
          <Typography variant="h5">{pokemon.name}</Typography>
          <ModifierBox stats={pokemon.stats} />
          <Typography>Lvl:{pokemon.level}</Typography>
          <ProgressWithLabel
            label={`${pokemon.hp.current} / ${pokemon.hp.initial}`}
            value={(pokemon.hp.current / pokemon.hp.initial) * 100}
            healthBar
          />
        </Stack>
      </Card>
    </Box>
  );
};

export default OpponentPokemonBox;
