import { IconButton, Tooltip, Box } from "@mui/material";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { addLog } from "../../Store/logSlice";

const TeamButtonGroup = () => {
  const dispatch = useDispatch();
  const activePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );
  return (
    <Box
      height="100%"
      flexDirection="column"
      display="flex"
      justifyContent={"space-evenly"}
      borderRight="1px solid darkgray"
    >
      {[0, 1, 2, 3, 4, 5].map((t, i) => (
        <Tooltip key={t} disableFocusListener title="Switch" placement="right">
          <IconButton
            onClick={() => {
              dispatch(
                addLog({
                  message: "Switching and multiple Pokemon coming soon",
                })
              );
            }}
          >
            {i === 0 ? (
              <img height="45px" width="45px" src={activePokemon.frontUrl} />
            ) : (
              <CatchingPokemonIcon fontSize="large" />
            )}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export default TeamButtonGroup;
