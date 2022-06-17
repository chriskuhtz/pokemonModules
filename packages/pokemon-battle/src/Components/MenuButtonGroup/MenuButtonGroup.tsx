import { Stack, IconButton, Tooltip, Box } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";

const MenuButtonGroup = () => {
  return (
    <Stack>
      <Tooltip disableFocusListener title="Bag" placement="left">
        <IconButton>
          <BusinessCenterIcon fontSize="large" />
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
