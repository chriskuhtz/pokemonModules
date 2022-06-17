import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { useGetPokemonByNameQuery } from "chriskuhtz-pokemon-api";
import { useEffect, useState } from "react";
import {
  createPlayerPokemon,
  createOpponentPokemon,
} from "./Functions/Pokemon/createPokemon";
import { OpponentPokemon, PlayerPokemon } from "./Models/Pokemon";
import MoveSetGroup from "./Components/MoveSetGroup/MoveSetGroup";
import MenuButtonGroup from "./Components/MenuButtonGroup/MenuButtonGroup";
import TeamButtonGroup from "./Components/TeamButtonGroup/TeamButtonGroup";
import OpponentPokemonBox from "./Components/OpponentPokemonBox/OpponentPokemonBox";
import PlayerPokemonBox from "./Components/PlayerPokemonBox/PlayerPokemonBox";
import LogBox from "./Components/LogBox/LogBox";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

const App = (): JSX.Element => {
  const theme = useTheme();
  const smOrUp = useMediaQuery(theme.breakpoints.up("sm"));

  const [playerPokemon, setPlayerPokemon] = useState<
    PlayerPokemon | undefined
  >();
  const { data: playerData, isSuccess: isPlayerSuccess } =
    useGetPokemonByNameQuery("nidorino");

  const [opponentPokemon, setOpponentPokemon] = useState<
    OpponentPokemon | undefined
  >();
  const { data: opponentData, isSuccess: isOpponentSuccess } =
    useGetPokemonByNameQuery("gengar");

  const logs = useSelector((state: RootState) => state.logs.value);

  useEffect(() => {
    if (playerData && opponentData) {
      setPlayerPokemon(
        createPlayerPokemon(
          playerData.stats,
          playerData.sprites.back_default,
          playerData.name
        )
      );
      setOpponentPokemon(
        createOpponentPokemon(
          opponentData.stats,
          opponentData.sprites.front_default,
          opponentData.name
        )
      );
    }
  }, [playerData, opponentData]);

  if (smOrUp && playerPokemon && opponentPokemon) {
    return (
      <Box
        display={"flex"}
        height={window.innerHeight > 820 ? "600px" : "100vh"}
      >
        <TeamButtonGroup />

        <Box flexGrow={1} height="100%" display={"flex"} flexDirection="column">
          <Box flexGrow={1}>
            <Grid container height="100%">
              <Grid item xs={6} sx={{ p: 2 }}>
                <PlayerPokemonBox pokemon={playerPokemon} />
              </Grid>
              <Grid item xs={6} sx={{ p: 2 }}>
                <OpponentPokemonBox pokemon={opponentPokemon} />
              </Grid>
            </Grid>
          </Box>
          <Box flexBasis="104px">
            {logs.length > 0 ? (
              <LogBox />
            ) : (
              <MoveSetGroup moves={playerPokemon.moves} />
            )}
          </Box>
        </Box>

        <MenuButtonGroup />
      </Box>
    );
  } else if (smOrUp) {
    return <div>Loading ...</div>;
  } else {
    return <div>Please turn your phone sideways</div>;
  }
};

export default App;
