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
import { useFetchMoves } from "./Functions/Moves/useFetchMoves";

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
  const [activeMoveUrls, setActiveMoveUrls] = useState<string[]>([]);
  const { fetchMoves: fetchActiveMoves, moves: activeMoves } = useFetchMoves();

  const { data: opponentData } = useGetPokemonByNameQuery("dragonite");
  const [opponentMoveUrls, setOpponentMoveUrls] = useState<string[]>([]);
  const { fetchMoves: fetchOpponentMoves, moves: opponentMoves } =
    useFetchMoves();

  useEffect(() => {
    if (
      activeData &&
      activeMoveUrls.length === 0 &&
      opponentData &&
      opponentMoveUrls.length === 0
    ) {
      setActiveMoveUrls(
        activeData.moves.slice(0, 4).map((m: { move: { url: string } }) => {
          return m.move.url;
        })
      );
      setOpponentMoveUrls(
        opponentData.moves.slice(1, 5).map((m: { move: { url: string } }) => {
          return m.move.url;
        })
      );
    }
  }, [activeData, activeMoveUrls, opponentData, opponentMoveUrls]);

  useEffect(() => {
    if (activeMoveUrls.length !== 0 && opponentMoveUrls.length !== 0) {
      fetchActiveMoves(activeMoveUrls);
      fetchOpponentMoves(opponentMoveUrls);
    }
  }, [activeMoveUrls, opponentMoveUrls]);

  useEffect(() => {
    if (
      activeData &&
      opponentData &&
      activeMoves.length !== 0 &&
      opponentMoves.length !== 0
    ) {
      const activePokemon = createActivePokemon(
        activeData.stats,
        activeData.sprites.back_default,
        activeData.name,
        activeData.types,
        activeMoves
      );
      const opponentPokemon = createOpponentPokemon(
        opponentData.stats,
        opponentData.sprites.front_default,
        opponentData.name,
        opponentData.types,
        opponentMoves
      );
      dispatch(setActivePokemon(activePokemon));
      dispatch(setOpponentPokemon(opponentPokemon));
    }
  }, [activeData, opponentData, opponentMoves, activeMoves]);

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
