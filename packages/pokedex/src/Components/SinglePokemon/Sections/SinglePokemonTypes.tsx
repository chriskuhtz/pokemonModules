import { Box, Typography } from "@mui/material";

interface SinglePokemonTypes {
  types: string[];
}

const SinglePokemonTypes = ({ types }: SinglePokemonTypes) => {
  return (
    <>
      <Typography variant="h5">
        {types.length > 1 ? "Types" : "Type"}
      </Typography>
      <Typography>{types.join()}</Typography>
    </>
  );
};

export default SinglePokemonTypes;
