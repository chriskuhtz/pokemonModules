import { Button, Box, Typography } from "@mui/material";
import { TypeIcon } from "chriskuhtz-pokemon-common-components";
import { useSelector } from "react-redux";
import { useExecuteTurn } from "../../Functions/Turn/useExecuteTurn";
import { Move } from "../../Models/Move";
import { RootState } from "../../Store/store";

const MoveButton = ({ move }: { move: Move }) => {
  const { executeTurn } = useExecuteTurn();

  return (
    <Button fullWidth variant="outlined" onClick={() => executeTurn(move)}>
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems={"center"}
      >
        <TypeIcon size={40} type={move.type} />
        <Typography
          variant={move.name.length > 12 ? "button" : "h5"}
          color="text.primary"
        >
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
