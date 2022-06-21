import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import ActivePokemonBox from "../ActivePokemonBox/ActivePokemonBox";
import LogBox from "../LogBox/LogBox";
import MenuButtonGroup from "../MenuButtonGroup/MenuButtonGroup";
import MoveSetGroup from "../MoveSetGroup/MoveSetGroup";
import OpponentPokemonBox from "../OpponentPokemonBox/OpponentPokemonBox";
import TeamButtonGroup from "../TeamButtonGroup/TeamButtonGroup";

const BattleScreen = () => {
  const logs = useSelector((state: RootState) => state.logs.value);

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
};

export default BattleScreen;
