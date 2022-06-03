import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import {
  useGetAbilityByIndexQuery,
  useGetPokemonByNameQuery,
} from "chriskuhtz-pokemon-api";
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
      <Divider />
      <SinglePokemonTypes
        types={data.types.map((t: { type: { name: string } }) => t.type.name)}
      />
      <Divider />

      <SinglePokemonAbilities abilities={data.abilities} />
      <Divider />
      <SinglePokemonStats stats={data.stats} />
      <Divider />
      <Typography variant="h5">Misc:</Typography>
      <Typography>Base Exp: {data.base_experience}</Typography>
      <Typography variant="h6">Held Items:</Typography>
      {data.held_items.map((h: { item: { name: string } }) => (
        <Typography>{h.item.name}</Typography>
      ))}
    </Stack>
  );
};

export default SinglePokemonComponent;
