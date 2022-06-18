import { Box, Card, Stack, Typography } from "@mui/material";
import { useGetPokemonByNameQuery } from "chriskuhtz-pokemon-api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivePokemon } from "../../Functions/Pokemon/createPokemon";
import { ActivePokemon } from "../../Models/Pokemon";
import { setActivePokemon } from "../../Store/activePokemonSlice";
import { RootState } from "../../Store/store";
import ModifierBox from "../ModifierBox/ModifierBox";
import ProgressWithLabel from "../ProgressWithLabel/ProgressWithLabel";

const ActivePokemonBox = () => {
  const pokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );

  const dispatch = useDispatch();

  const { data: activeData, isSuccess: isActiveSuccess } =
    useGetPokemonByNameQuery("nidorino");

  useEffect(() => {
    if (activeData) {
      const activePokemon = createActivePokemon(
        activeData.stats,
        activeData.sprites.back_default,
        activeData.name
      );

      dispatch(setActivePokemon(activePokemon));
    }
  }, [activeData]);

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

          <ProgressWithLabel
            label={`${pokemon.hp.current} / ${pokemon.hp.initial}`}
            value={(pokemon.hp.current / pokemon.hp.initial) * 100}
            healthBar
          />
          <ModifierBox stats={pokemon.stats} />
          <ProgressWithLabel label={`Lvl: ${pokemon.level}`} value={60} />
        </Stack>
      </Card>
    </Box>
  );
};

export default ActivePokemonBox;
