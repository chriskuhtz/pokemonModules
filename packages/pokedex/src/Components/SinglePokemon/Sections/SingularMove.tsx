import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import { Move } from "./SinglePokemonMoves";

const SingularMove = ({ move }: { move?: Move }) => {
  const { data: abilityData, isLoading } = useGetMoveByIndexQuery(0);

  if (isLoading) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Typography>
        {move?.move.name}:{move?.version_group_details[0].level_learned_at},
        {move?.version_group_details[0].move_learn_method.name}
      </Typography>
    </>
  );
};

export default SingularMove;
