import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { OpponentPokemon } from "../../Models/Pokemon";
import { RootState } from "../../Store/store";
import ActivePokemonCard from "../ActivePokemonCard/ActivePokemonCard";

const OpponentPokemonBox = () => {
  const pokemon: OpponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon.value
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
      <Box
        flexGrow={1}
        display={"flex"}
        justifyContent={{ xs: "flex-end", md: "center" }}
        alignItems={{ xs: "flex-end", md: "center" }}
      >
        <img height={size} width={size} src={pokemon.spriteUrl} />
      </Box>
      <ActivePokemonCard />
    </Box>
  );
};

export default OpponentPokemonBox;
