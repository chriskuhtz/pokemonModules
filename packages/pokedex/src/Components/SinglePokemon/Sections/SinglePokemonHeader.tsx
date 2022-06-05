import { Typography } from "@mui/material";
import { SinglePokemonHeaderProps } from "../Models/SinglePokemonModels";

const SinglePokemonHeader = ({ url, id, name }: SinglePokemonHeaderProps) => {
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
