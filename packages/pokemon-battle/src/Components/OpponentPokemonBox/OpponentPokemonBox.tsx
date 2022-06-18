import { Box, Card, Stack, Typography } from "@mui/material";
import { useGetPokemonByNameQuery } from "chriskuhtz-pokemon-api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOpponentPokemon } from "../../Functions/Pokemon/createPokemon";
import { OpponentPokemon } from "../../Models/Pokemon";
import { setOpponentPokemon } from "../../Store/opponentPokemonSlice";
import { RootState } from "../../Store/store";
import ModifierBox from "../ModifierBox/ModifierBox";
import ProgressWithLabel from "../ProgressWithLabel/ProgressWithLabel";

const OpponentPokemonBox = () => {
  const pokemon: OpponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon.value
  );

  const dispatch = useDispatch();

  const { data: opponentData, isSuccess: isOpponentSuccess } =
    useGetPokemonByNameQuery("gengar");

  useEffect(() => {
    if (opponentData) {
      const opponentPokemon = createOpponentPokemon(
        opponentData.stats,
        opponentData.sprites.front_default,
        opponentData.name
      );
      dispatch(setOpponentPokemon(opponentPokemon));
    }
  }, [opponentData]);

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
          <Typography>Lvl:{pokemon.level}</Typography>
          <ProgressWithLabel
            label={`${pokemon.hp.current} / ${pokemon.hp.initial}`}
            value={(pokemon.hp.current / pokemon.hp.initial) * 100}
            healthBar
          />
          <ModifierBox stats={pokemon.stats} />
        </Stack>
      </Card>
    </Box>
  );
};

export default OpponentPokemonBox;