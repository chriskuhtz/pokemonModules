import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useLazyGetEvolutionChainByIndexQuery } from "chriskuhtz-pokemon-api";
import { useEffect, useState } from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import HotelIcon from "@mui/icons-material/Hotel";
import RepeatIcon from "@mui/icons-material/Repeat";

interface EvolutionDetails {
  min_level: number;
  min_happiness: number;
  item?: { name: string };
  held_item?: { name: string };
  trigger: { name: string };
}
interface ChainLink {
  species: { name: string };
  evolves_to: ChainLink[];
  is_baby: boolean;
  evolution_details: EvolutionDetails[];
}
interface EvolutionStage {
  chainLink: ChainLink;
  stage: string;
}
const EvolutionChain = ({
  evoUrl,
}: {
  evoUrl: string | undefined;
}): JSX.Element => {
  const splitEvoUrl = evoUrl?.split("/");
  const evoUrlIndex =
    (splitEvoUrl && parseInt(splitEvoUrl[splitEvoUrl.length - 2])) || null;

  const [trigger, result] = useLazyGetEvolutionChainByIndexQuery();

  useEffect(() => {
    if (evoUrlIndex !== null) trigger(evoUrlIndex);
  }, [evoUrlIndex]);

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

  const determineEvoMethod = (e: EvolutionStage): string => {
    if (
      e.chainLink.evolution_details.length > 0 &&
      e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
        .min_level
    )
      return `At Level ${
        e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
          .min_level
      }`;
    else if (
      e.chainLink.evolution_details.length > 0 &&
      e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
        .min_happiness
    ) {
      return `Level Up with Happiness ${
        e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
          .min_happiness
      }`;
    } else if (
      e.chainLink.evolution_details.length > 0 &&
      e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
        .item
    ) {
      return `Using a ${
        e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
          .item?.name
      }`;
    } else if (
      e.chainLink.evolution_details.length > 0 &&
      e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
        .trigger.name === "trade"
    ) {
      return `Trade while holding a ${
        e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
          .held_item?.name
      }`;
    } else if (
      e.chainLink.evolution_details.length > 0 &&
      e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
        .held_item
    ) {
      return `Level Up while holding a ${
        e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
          .held_item?.name
      }`;
    } else if (
      e.chainLink.evolution_details.length > 0 &&
      e.chainLink.evolution_details[e.chainLink.evolution_details.length - 1]
        .trigger.name === "trade"
    ) {
      return `Trade Evolution`;
    }
    return "unknown evolution method";
  };

  return result.isSuccess ? (
    <Box>
      <Typography variant="h5">Evolution Chain</Typography>
      {evoChain.length > 1 ? (
        evoChain.map((e, i) => (
          <Grid container>
            <Grid item xs={4}>
              <Typography>
                <strong>{e.stage}: </strong>
              </Typography>
            </Grid>{" "}
            <Grid item xs={4}>
              <Typography>{e.chainLink.species.name}</Typography>
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
