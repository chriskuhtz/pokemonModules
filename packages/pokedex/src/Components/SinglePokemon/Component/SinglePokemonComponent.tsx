import { Box, CircularProgress, Divider, Stack } from "@mui/material";
import { useGetPokemonByNameQuery } from "chriskuhtz-pokemon-api";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SinglePokemonAbilities from "../Sections/SinglePokemonAbilities";
import SinglePokemonHeader from "../Sections/SinglePokemonHeader";
import SinglePokemonMoves from "../Sections/SinglePokemonMoves";
import SinglePokemonSpecies from "../Sections/SinglePokemonSpecies";
import SinglePokemonStats from "../Sections/SinglePokemonStats";
import SinglePokemonTypes from "../Sections/SinglePokemonTypes";

const SinglePokemonComponent = (): JSX.Element => {
  const { state } = useLocation() as { state: { pokemon: string } };
  const { data, isLoading } = useGetPokemonByNameQuery(state.pokemon);

  useEffect(() => {
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
        <CircularProgress />
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
        url={data.species.url}
        baseExp={data.base_experience}
        heldItems={data.held_items.map(
          (h: { item: { name: string } }) => h.item.name
        )}
      />
      <Divider />
      <SinglePokemonAbilities abilities={data.abilities} />
      <Divider />
      <SinglePokemonStats stats={data.stats} />
      <Divider />
      <SinglePokemonMoves moves={data.moves} />
    </Stack>
  );
};

export default SinglePokemonComponent;
