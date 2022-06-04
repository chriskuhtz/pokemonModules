import { Typography } from "@mui/material";
import { useId } from "react";

interface SinglePokemonMisc {
  baseExp: number;
  heldItems: string[];
}

const SinglePokemonMisc = ({ baseExp, heldItems }: SinglePokemonMisc) => {
  const id = useId();

  return (
    <>
      <Typography variant="h5">Misc:</Typography>
      <Typography>Base Exp: {baseExp}</Typography>
      <Typography variant="h6">Held Items:</Typography>
      {heldItems.map((h) => (
        <Typography key={id + h}>{h}</Typography>
      ))}
    </>
  );
};

export default SinglePokemonMisc;
