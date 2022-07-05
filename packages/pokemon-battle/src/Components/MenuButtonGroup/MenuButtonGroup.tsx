import { Stack, IconButton, Tooltip, Box } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import HealingIcon from "@mui/icons-material/Healing";
import { useDispatch } from "react-redux";
import { addLog } from "../../Store/logSlice";
const MenuButtonGroup = () => {
  const dispatch = useDispatch();
  return (
    <Stack sx={{ borderLeft: "1px solid darkgray" }}>
      <Tooltip disableFocusListener title="Bag" placement="left">
        <IconButton
          onClick={() =>
            dispatch(addLog({ message: "Bag will be available soon" }))
          }
        >
          <BusinessCenterIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip disableFocusListener title="Potion" placement="left">
        <IconButton
          onClick={() =>
            dispatch(
              addLog({
                message: "Quickslots for Healing will be available soon",
              })
            )
          }
        >
          <HealingIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip disableFocusListener title="throw Pokeball" placement="left">
        <IconButton
          onClick={() =>
            dispatch(
              addLog({
                message:
                  "Quickslots for Items Pokeballs will be available soon",
              })
            )
          }
        >
          <SportsHandballIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip
        disableFocusListener
        title="Quick Slot for Item"
        placement="left"
      >
        <IconButton
          onClick={() =>
            dispatch(
              addLog({ message: "Quickslots for Items will be available soon" })
            )
          }
        >
          <AddIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip disableFocusListener title="Run away" placement="left">
        <IconButton
          onClick={() =>
            dispatch(addLog({ message: "Running Away will be available soon" }))
          }
        >
          <DirectionsRunIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default MenuButtonGroup;
