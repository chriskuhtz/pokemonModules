import { Button, Box, Typography } from "@mui/material";
import { TypeIcon } from "chriskuhtz-pokemon-common-components";
import { Move } from "../../Models/Move";

const MoveButton = ({ move }: { move: Move }) => {
  return (
    <Button fullWidth variant="outlined">
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems={"center"}
      >
        <TypeIcon size={40} type={move.type} />
        <Typography variant="h5" color="text.primary">
          {move.name}
        </Typography>
        <Typography variant="h5" color="text.primary">
          {move.powerPoints.current}/{move.powerPoints.initial}
        </Typography>
      </Box>
    </Button>
  );
};

export default MoveButton;
