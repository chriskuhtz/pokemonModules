import { Stack, IconButton, Tooltip, Box } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";

const MenuButtonGroup = () => {
  return (
    <Stack>
      <Tooltip disableFocusListener title="Bag" placement="left">
        <IconButton>
          <BusinessCenterIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip disableFocusListener title="Potion" placement="left">
        <IconButton>
          <LocalDrinkIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip disableFocusListener title="throw Pokeball" placement="left">
        <IconButton>
          <SportsHandballIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip
        disableFocusListener
        title="Quick Slot for Item"
        placement="left"
      >
        <IconButton>
          <AddIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Tooltip disableFocusListener title="Run away" placement="left">
        <IconButton>
          <DirectionsRunIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default MenuButtonGroup;
