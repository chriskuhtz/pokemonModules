import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useGetPokemonByNameQuery } from "chriskuhtz-pokemon-api";
import SinglePokemonAbilities from "../Sections/SinglePokemonAbilities";
import SinglePokemonHeader from "../Sections/SinglePokemonHeader";
import SinglePokemonStats from "../Sections/SinglePokemonStats";
import SinglePokemonTypes from "../Sections/SinglePokemonTypes";

const SinglePokemonComponent = ({
  pokemon,
}: {
  pokemon: string;
}): JSX.Element => {
  const { data } = useGetPokemonByNameQuery(pokemon);
  console.log(data);

  if (!data) {
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
    <Stack spacing={2}>
      <SinglePokemonHeader
        url={data.sprites.other["official-artwork"].front_default}
        id={data.id}
        name={data.name.charAt(0).toUpperCase() + data.name.slice(1)}
      />
      <SinglePokemonTypes
        types={data.types.map((t: { type: { name: string } }) => t.type.name)}
      />

      <SinglePokemonAbilities
        abilities={data.abilities.map(
          (a: { ability: { name: string } }) => a.ability.name
        )}
      />

      <SinglePokemonStats stats={data.stats} />
    </Stack>
  );
};

export default SinglePokemonComponent;
