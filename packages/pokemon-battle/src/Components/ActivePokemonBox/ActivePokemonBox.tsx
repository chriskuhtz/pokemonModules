import {
  Box,
  Card,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { ActivePokemon } from "../../Models/Pokemon";
import { RootState } from "../../Store/store";
import OpponentPokemonCard from "../OpponentPokemonCard/OpponentPokemonCard";

const ActivePokemonBox = () => {
  const pokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );
  const theme = useTheme();
  const isMdOrUp = useMediaQuery(theme.breakpoints.up("md"));
  const size = isMdOrUp ? "200px" : "140px";
  return (
    <Box
      width={"100%"}
      height={"100%"}
      display="flex"
      justifyContent={"space-between"}
      flexDirection="column"
    >
      <OpponentPokemonCard />
      <Box
        flexGrow={1}
        display={"flex"}
        justifyContent={{ xs: "flex-start", md: "center" }}
        alignItems={{ xs: "flex-end", md: "center" }}
      >
        <img height={size} width={size} src={pokemon.spriteUrl} />
      </Box>
    </Box>
  );
};

export default ActivePokemonBox;
