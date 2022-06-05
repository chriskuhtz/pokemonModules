import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useLazyGetEvolutionChainByUrlQuery } from "chriskuhtz-pokemon-api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatResponseText } from "../../../Helpers/formatResponseText";
import { determineEvoMethod } from "../Helpers/determineEvoMethod";
import {
  EvolutionStage,
  EvolutionChainProps,
  ChainLink,
} from "../Models/SinglePokemonModels";

const EvolutionChain = ({ evoUrl }: EvolutionChainProps): JSX.Element => {
  const [trigger, result] = useLazyGetEvolutionChainByUrlQuery();

  useEffect(() => {
    if (evoUrl !== "") trigger(evoUrl);
  }, [evoUrl]);

  const [evoChain, setEvoChain] = useState<EvolutionStage[]>([]);

  const assembleEvoChain = (chainLink: ChainLink) => {
    const stages = [
      "Baby Pokemon",
      "Basic Pokemon",
      "First Stage",
      "Second Stage",
    ];
    let stageIndex = chainLink.is_baby ? 0 : 1;

    let nextStage: EvolutionStage = {
      chainLink: chainLink,
      stage: stages[stageIndex],
    };

    const newEvoChain: EvolutionStage[] = [];

    newEvoChain.push(nextStage);
    stageIndex += 1;

    while (nextStage.chainLink.evolves_to.length > 0) {
      nextStage.chainLink.evolves_to.forEach((e) => {
        newEvoChain.push({ chainLink: e, stage: stages[stageIndex] });
      });
      stageIndex += 1;
      nextStage = {
        chainLink: nextStage.chainLink.evolves_to[0],
        stage: stages[stageIndex],
      };
    }
    setEvoChain(newEvoChain);
  };

  useEffect(() => {
    if (result.isSuccess) {
      assembleEvoChain(result.data.chain);
    }
  }, [result]);

  return result.isSuccess ? (
    <Box>
      <Typography variant="h5">Evolution Chain</Typography>
      {evoChain.length > 1 ? (
        evoChain.map((e, i) => (
          <Grid container key={e.chainLink.species.name}>
            <Grid item xs={4}>
              <Typography>
                <strong>{e.stage}: </strong>
              </Typography>
            </Grid>{" "}
            <Grid item xs={4}>
              <Typography>
                <Link
                  to={`/${e.chainLink.species.name}`}
                  state={{ pokemon: e.chainLink.species.name }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {formatResponseText(e.chainLink.species.name)}
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography key={e.chainLink.species.name}>
                <strong>{i !== 0 && determineEvoMethod(e)}</strong>
              </Typography>
            </Grid>
          </Grid>
        ))
      ) : (
        <Typography>This Pokemon does not evolve</Typography>
      )}
    </Box>
  ) : (
    <CircularProgress />
  );
};

export default EvolutionChain;
