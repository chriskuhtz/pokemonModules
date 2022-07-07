import { Box } from "@mui/material";
import { PokemonLoadingSpinner } from "chriskuhtz-pokemon-common-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActivePokemon, OpponentPokemon, Pokemon } from "../../Models/Pokemon";
import { setActivePokemon } from "../../Store/activePokemonSlice";
import { setOpponentPokemon } from "../../Store/opponentPokemonSlice";
import { RootState } from "../../Store/store";
import { fallbackPokemon } from "../../Utils/Constants/fallbackPokemon";
import ActivePokemonBox from "../ActivePokemonBox/ActivePokemonBox";
import LogBox from "../LogBox/LogBox";
import MenuButtonGroup from "../MenuButtonGroup/MenuButtonGroup";
import MoveSetGroup from "../MoveSetGroup/MoveSetGroup";
import OpponentPokemonBox from "../OpponentPokemonBox/OpponentPokemonBox";
import TeamButtonGroup from "../TeamButtonGroup/TeamButtonGroup";

const BattleScreen = ({
  activePokemon,
  opponentPokemon,
}: {
  activePokemon: ActivePokemon;
  opponentPokemon: OpponentPokemon;
}) => {
  const logs = useSelector((state: RootState) => state.logs.value.logs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActivePokemon(activePokemon));
    dispatch(setOpponentPokemon(opponentPokemon));
  }, [activePokemon, opponentPokemon]);

  if (
    activePokemon.name !== fallbackPokemon.name &&
    opponentPokemon.name !== fallbackPokemon.name
  ) {
    return (
      <Box
        display={"flex"}
        height={window.innerHeight > 820 ? "600px" : "100vh"}
        borderBottom={window.innerHeight > 820 ? "solid 1px darkgray" : "none"}
      >
        <TeamButtonGroup />
        <Box
          sx={{
            //   background:
            //     "linear-gradient(279deg, rgba(111,170,30,0.6767441860465117) 0%, rgba(50,90,42,0.5) 47%, rgba(42,90,51,0.8023255813953488) 100%)",
            //
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "/battleBackground.png"
            })`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          flexGrow={1}
          height="100%"
          display={"flex"}
          flexDirection="column"
        >
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
  } else
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height="100vh"
      >
        <PokemonLoadingSpinner index={25} />
      </Box>
    );
};

export default BattleScreen;
