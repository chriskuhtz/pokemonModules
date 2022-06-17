import { PhotoCamera } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useGetPokemonByNameQuery } from "chriskuhtz-pokemon-api";
import { useEffect, useState } from "react";
import {
  createPlayerPokemon,
  createOpponentPokemon,
} from "./Functions/Pokemon/createPokemon";
import { OpponentPokemon, PlayerPokemon } from "./Models/Pokemon";
import { TypeIcon } from "chriskuhtz-pokemon-common-components";
import MoveSetGroup from "./Components/MoveSetGroup/MoveSetGroup";
import MenuButtonGroup from "./Components/MenuButtonGroup/MenuButtonGroup";
import TeamButtonGroup from "./Components/TeamButtonGroup/TeamButtonGroup";
import OpponentPokemonBox from "./Components/OpponentPokemonBox/OpponentPokemonBox";
import PlayerPokemonBox from "./Components/PlayerPokemonBox/PlayerPokemonBox";
const App = (): JSX.Element => {
  const [playerPokemon, setPlayerPokemon] = useState<
    PlayerPokemon | undefined
  >();
  const [opponentPokemon, setOpponentPokemon] = useState<
    OpponentPokemon | undefined
  >();
  const { data: playerData, isSuccess: isPlayerSuccess } =
    useGetPokemonByNameQuery("nidorino");
  const { data: opponentData, isSuccess: isOpponentSuccess } =
    useGetPokemonByNameQuery("gengar");

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

  if (playerPokemon && opponentPokemon) {
    return (
      <Grid container height={"100vh"}>
        <Grid item xs={1} sx={{ border: "1px solid orange" }}>
          <TeamButtonGroup />
        </Grid>
        <Grid item xs={10}>
          <Box height="100%" display={"flex"} flexDirection="column">
            <Box flexGrow={1}>
              <Grid container height="100%">
                <Grid item xs={6} sx={{ border: "1px solid red", p: 2 }}>
                  <PlayerPokemonBox pokemon={playerPokemon} />
                </Grid>
                <Grid item xs={6} sx={{ border: "1px solid blue", p: 2 }}>
                  <OpponentPokemonBox pokemon={opponentPokemon} />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ border: "1px solid green" }}>
              <MoveSetGroup moves={playerPokemon.moves} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={1} sx={{ border: "1px solid darkred" }}>
          <MenuButtonGroup />
        </Grid>
      </Grid>
    );
  }
  return <div>Something went wrong</div>;
};

export default App;
