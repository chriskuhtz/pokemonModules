import { Box, Typography } from "@mui/material";
import { SinglePokemonTypesProps } from "../Models/SinglePokemonModels";

const SinglePokemonTypes = ({ types }: SinglePokemonTypesProps) => {
  return (
    <Box>
      <Typography variant="h5">
        {types.length > 1 ? "Types" : "Type"}
      </Typography>
      <Typography>{types.join()}</Typography>
    </Box>
  );
};

export default SinglePokemonTypes;
