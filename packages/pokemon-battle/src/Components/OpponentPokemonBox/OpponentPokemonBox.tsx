import { Box, Card, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { OpponentPokemon } from "../../Models/Pokemon";
import { RootState } from "../../Store/store";
import ActivePokemonCard from "../ActivePokemonCard/ActivePokemonCard";
import ModifierBox from "../ModifierBox/ModifierBox";
import ProgressWithLabel from "../ProgressWithLabel/ProgressWithLabel";

const OpponentPokemonBox = () => {
  const pokemon: OpponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon.uiState
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
      <ActivePokemonCard />
    </Box>
  );
};

export default OpponentPokemonBox;
