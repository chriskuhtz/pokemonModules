import { Typography } from "@mui/material";

interface SinglePokemonAbilities {
  abilities: string[];
}

const SinglePokemonAbilities = ({ abilities }: SinglePokemonAbilities) => {
  return (
    <>
      <Typography variant="h5">
        {abilities.length > 1 ? "Abilities" : "Ability"}
      </Typography>
      <Typography>{abilities.join()}</Typography>
    </>
  );
};

export default SinglePokemonAbilities;
