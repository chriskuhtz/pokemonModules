import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useGetSpeciesByIndexQuery } from "chriskuhtz-pokemon-api";
import { useEffect, useId, useState } from "react";
import EvolutionChain from "./EvolutionChain";

interface SinglePokemonSpecies {
  url: string;
  baseExp: number;
  heldItems: string[];
}

const SinglePokemonSpecies = ({
  url,
  baseExp,
  heldItems,
}: SinglePokemonSpecies) => {
  const id = useId();

  const splitUrl = url.split("/");
  const urlIndex = parseInt(splitUrl[splitUrl.length - 2]);

  const [evoUrl, setEvoUrl] = useState<string | undefined>(undefined);

  const useSpeciesQuery = useGetSpeciesByIndexQuery(urlIndex);

  useEffect(() => {
    if (useSpeciesQuery.isSuccess) {
      setEvoUrl(useSpeciesQuery.data.evolution_chain.url);
    }
  }, [useSpeciesQuery.data, evoUrl, url]);

  return useSpeciesQuery.isSuccess ? (
    <>
      <EvolutionChain evoUrl={evoUrl} />
      <Divider />
      <Box>
        <Typography variant="h5">Misc</Typography>
        <Grid container>
          <Grid item xs={4}>
            <Typography>Base Exp:</Typography>
          </Grid>{" "}
          <Grid item xs={8}>
            <Typography>{baseExp}</Typography>{" "}
          </Grid>{" "}
          <Grid item xs={4}>
            <Typography>Base Happiness:</Typography>{" "}
          </Grid>{" "}
          <Grid item xs={8}>
            <Typography>{useSpeciesQuery.data.base_happiness}</Typography>{" "}
          </Grid>{" "}
          <Grid item xs={4}>
            <Typography>Catch Rate:</Typography>{" "}
          </Grid>{" "}
          <Grid item xs={8}>
            <Typography>{useSpeciesQuery.data.capture_rate}</Typography>{" "}
          </Grid>{" "}
          <Grid item xs={4}>
            <Typography>Growth Rate:</Typography>{" "}
          </Grid>{" "}
          <Grid item xs={8}>
            <Typography>{useSpeciesQuery.data.growth_rate.name}</Typography>{" "}
          </Grid>{" "}
          <Grid item xs={4}>
            <Typography>Egg Groups:</Typography>{" "}
          </Grid>{" "}
          <Grid item xs={8}>
            <Typography>
              {useSpeciesQuery.data.egg_groups
                .map((e: { name: string }) => e.name)
                .join(", ")}
            </Typography>{" "}
          </Grid>{" "}
          <Grid item xs={4}>
            <Typography>Held Items:</Typography>{" "}
          </Grid>{" "}
          <Grid item xs={8}>
            <Typography>
              {heldItems.length > 0 ? heldItems.join(", ") : "none"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  ) : (
    <CircularProgress />
  );
};

export default SinglePokemonSpecies;
