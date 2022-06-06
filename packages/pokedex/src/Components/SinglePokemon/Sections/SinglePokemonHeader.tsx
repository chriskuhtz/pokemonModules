import { Typography } from "@mui/material";
import { formatResponseText } from "../../../Helpers/formatResponseText";
import { SinglePokemonHeaderProps } from "../Models/SinglePokemonModels";

const SinglePokemonHeader = ({ url, id, name }: SinglePokemonHeaderProps) => {
  return (
    <>
      <img src={url} />
      <Typography variant="h4">
        #{id} {formatResponseText(name)}
      </Typography>
    </>
  );
};

export default SinglePokemonHeader;
