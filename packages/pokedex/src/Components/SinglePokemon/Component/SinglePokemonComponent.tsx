import { Box, Divider, Stack } from "@mui/material";
import { useGetPokemonByNameQuery } from "chriskuhtz-pokemon-api";
import {
  PokemonIcon,
  PokemonLoadingSpinner,
} from "chriskuhtz-pokemon-common-components";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import SinglePokemonAbilities from "../Sections/SinglePokemonAbilities";
import SinglePokemonHeader from "../Sections/SinglePokemonHeader";
import SinglePokemonMoves from "../Sections/SinglePokemonMoves";
import SinglePokemonSpecies from "../Sections/SinglePokemonSpecies";
import SinglePokemonStats from "../Sections/SinglePokemonStats";
import SinglePokemonTypes from "../Sections/SinglePokemonTypes";

const SinglePokemonComponent = (): JSX.Element => {
  let { pokemonId } = useParams();

  const { data, isLoading } = useGetPokemonByNameQuery(pokemonId);

  useEffect(() => {
    console.log(data);
    window.scrollTo(0, 0);
  }, [data]);

  if (isLoading) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height="100vh"
      >
        <PokemonLoadingSpinner index={Math.floor(Math.random() * 493)} />
      </Box>
    );
  }
  return (
    <Stack spacing={2}>
      <SinglePokemonHeader
        url={data.sprites.other["official-artwork"].front_default}
        id={data.id}
        name={data.name}
      />
      <Divider />
      <SinglePokemonTypes
        types={data.types.map((t: { type: { name: string } }) => t.type.name)}
      />
      <Divider />
      <SinglePokemonSpecies
        id={data.id}
        url={data.species.url}
        baseExp={data.base_experience}
        heldItems={data.held_items.map(
          (h: { item: { name: string } }) => h.item.name
        )}
      />
      <Divider />
      <SinglePokemonAbilities abilities={data.abilities} id={data.id} />
      <Divider />
      <SinglePokemonStats stats={data.stats} />
      <Divider />
      <SinglePokemonMoves moves={data.moves} id={data.id} />
    </Stack>
  );
};

export default SinglePokemonComponent;
