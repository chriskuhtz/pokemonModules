import { LinearProgress, Typography } from "@mui/material";
import { useId } from "react";
import constants from "../../../data/constants.json";
import { SinglePokemonStatsProps } from "../Models/SinglePokemonModels";

const SinglePokemonStats = ({ stats }: SinglePokemonStatsProps) => {
  const key = useId();
  return (
    <>
      <Typography variant="h5">Stats</Typography>
      {stats.map((s: { base_stat: number; stat: { name: string } }, i) => {
        const mappedStat = {
          name: s.stat.name,
          value: s.base_stat,
        };

        return (
          <Typography key={key + mappedStat.name}>
            {mappedStat.name}: {mappedStat.value}
            <LinearProgress
              variant="determinate"
              value={
                100 *
                (mappedStat.value /
                  Object.values(constants.highestBaseStats)[i])
              }
            />
          </Typography>
        );
      })}
    </>
  );
};

export default SinglePokemonStats;
