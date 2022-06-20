import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useGetPokemonByNameQuery } from "chriskuhtz-pokemon-api";
import { useEffect, useState } from "react";
import {
  createActivePokemon,
  createOpponentPokemon,
} from "./Functions/Pokemon/createPokemon";
import MoveSetGroup from "./Components/MoveSetGroup/MoveSetGroup";
import MenuButtonGroup from "./Components/MenuButtonGroup/MenuButtonGroup";
import TeamButtonGroup from "./Components/TeamButtonGroup/TeamButtonGroup";
import OpponentPokemonBox from "./Components/OpponentPokemonBox/OpponentPokemonBox";
import ActivePokemonBox from "./Components/ActivePokemonBox/ActivePokemonBox";
import LogBox from "./Components/LogBox/LogBox";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Store/store";
import { setActivePokemon } from "./Store/activePokemonSlice";
import { setOpponentPokemon } from "./Store/opponentPokemonSlice";

const App = (): JSX.Element => {
  const theme = useTheme();
  const smOrUp = useMediaQuery(theme.breakpoints.up("sm"));

  const activePokemon = useSelector((state: RootState) => state.activePokemon);
  const opponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon
  );

  const dispatch = useDispatch();

  const logs = useSelector((state: RootState) => state.logs.value);

  const { data: activeData } = useGetPokemonByNameQuery("nidoking");

  const { data: opponentData } = useGetPokemonByNameQuery("dragonite");

  const [activeMoveUrls, setActiveMoveUrls] = useState<string[]>([]);

  useEffect(() => {
    if (activeData) {
      setActiveMoveUrls(
        activeData.moves.slice(0, 4).map((m: { move: { url: string } }) => {
          return m.move.url;
        })
      );
    }
  }, [activeData]);

  useEffect(() => {
    if (activeData && opponentData) {
      const activePokemon = createActivePokemon(
        activeData.stats,
        activeData.sprites.back_default,
        activeData.name,
        activeData.types,
        []
      );
      const opponentPokemon = createOpponentPokemon(
        opponentData.stats,
        opponentData.sprites.front_default,
        opponentData.name,
        opponentData.types,
        []
      );
      dispatch(setActivePokemon(activePokemon));
      dispatch(setOpponentPokemon(opponentPokemon));
    }
  }, [activeData, opponentData]);

  if (smOrUp && activePokemon && opponentPokemon) {
    return (
      <Box
        display={"flex"}
        height={window.innerHeight > 820 ? "600px" : "100vh"}
        borderBottom={window.innerHeight > 820 ? "solid 1px darkgray" : "none"}
      >
        <TeamButtonGroup />

        <Box flexGrow={1} height="100%" display={"flex"} flexDirection="column">
          <Box height="calc(100% - 104px)" display={"flex"}>
            <Box
              maxWidth="50%"
              minWidth="50%"
              display="flex"
              justifyContent="stretch"
              alignItems={"stretch"}
            >
              <ActivePokemonBox />
            </Box>

            <Box maxWidth="50%" minWidth="50%">
              <OpponentPokemonBox />
            </Box>
          </Box>
          <Box height="104px">
            {logs.length > 0 ? <LogBox /> : <MoveSetGroup />}
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
