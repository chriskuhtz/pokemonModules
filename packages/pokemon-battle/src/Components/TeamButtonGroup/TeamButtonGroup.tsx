import { IconButton, Tooltip, Box } from "@mui/material";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

const TeamButtonGroup = () => {
  return (
    <Box
      height="100%"
      flexDirection="column"
      display="flex"
      justifyContent={"space-evenly"}
      borderRight="1px solid darkgray"
    >
      {[0, 1, 2, 3, 4, 5].map((t) => (
        <Tooltip key={t} disableFocusListener title="Switch" placement="right">
          <IconButton>
            <SportsBasketballIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export default TeamButtonGroup;
