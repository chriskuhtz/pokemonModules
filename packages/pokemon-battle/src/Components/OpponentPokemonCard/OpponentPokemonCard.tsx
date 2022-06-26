import { Card, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ActivePokemon } from "../../Models/Pokemon";
import { RootState } from "../../Store/store";
import ModifierBox from "../ModifierBox/ModifierBox";
import ProgressWithLabel from "../ProgressWithLabel/ProgressWithLabel";

const OpponentPokemonCard = () => {
  const pokemon: ActivePokemon = useSelector(
    (state: RootState) => state.opponentPokemon.value
  );

  return (
    <Card variant="outlined" sx={{ px: 1, m: 1, overflowY: "scroll" }}>
      <Stack>
        <Typography variant="h5">{pokemon.name}</Typography>
        <ModifierBox
          stats={pokemon.stats}
          statusConditions={pokemon.statusConditions}
        />
        <ProgressWithLabel
          label={`${pokemon.hp.current} / ${pokemon.hp.initial}`}
          value={(pokemon.hp.current / pokemon.hp.initial) * 100}
          healthBar
        />
        <Typography>Lvl:{pokemon.level}</Typography>
      </Stack>
    </Card>
  );
};

export default OpponentPokemonCard;
