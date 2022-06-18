import { Button, Box, Typography } from "@mui/material";
import { TypeIcon } from "chriskuhtz-pokemon-common-components";
import { useExecuteMove } from "../../Functions/Moves/useExecuteMove";
import { Move } from "../../Models/Move";

const MoveButton = ({ move }: { move: Move }) => {
  const { executeMove } = useExecuteMove(move, "active", "opponent");
  return (
    <Button fullWidth variant="outlined" onClick={() => executeMove()}>
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
