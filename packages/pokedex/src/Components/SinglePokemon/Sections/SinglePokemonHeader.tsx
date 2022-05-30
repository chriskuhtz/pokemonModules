import { Box, Typography } from "@mui/material";

interface SinglePokemonHeader {
  url: string;
  id: number;
  name: string;
}

const SinglePokemonHeader = ({ url, id, name }: SinglePokemonHeader) => {
  return (
    <>
      <img src={url} />
      <Typography variant="h4">
        #{id} {name}
      </Typography>
    </>
  );
};

export default SinglePokemonHeader;
