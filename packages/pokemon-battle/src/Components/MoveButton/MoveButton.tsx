import { Button, Box, Typography } from "@mui/material";
import { TypeIcon } from "chriskuhtz-pokemon-common-components";
import { useSelector } from "react-redux";
import { useExecuteMove } from "../../Functions/Moves/useExecuteMove";
import { Move } from "../../Models/Move";
import { RootState } from "../../Store/store";

const MoveButton = ({ move }: { move: Move }) => {
  const activePokemon = useSelector((state: RootState) => state.activePokemon);
  const opponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon
  );
  const { executeMove } = useExecuteMove();

  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={() =>
        executeMove(move, activePokemon.value, opponentPokemon.value)
      }
    >
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
