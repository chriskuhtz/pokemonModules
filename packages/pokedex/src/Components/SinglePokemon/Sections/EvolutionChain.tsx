import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  useLazyGetEvolutionChainByUrlQuery,
  extractUrlIndex,
} from "chriskuhtz-pokemon-api";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatResponseText } from "../../../Helpers/formatResponseText";
import { determineEvoMethod } from "../Helpers/determineEvoMethod";
import {
  EvolutionStage,
  EvolutionChainProps,
  ChainLink,
} from "../Models/SinglePokemonModels";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import {
  PokemonIcon,
  PokemonLoadingSpinner,
} from "chriskuhtz-pokemon-common-components";

const EvolutionChain = ({ evoUrl, id }: EvolutionChainProps): JSX.Element => {
  const [trigger, result] = useLazyGetEvolutionChainByUrlQuery();
  const navigate = useNavigate();

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
          <List key={e.chainLink.species.name}>
            {i !== 0 && (
              <ListItem>
                <ListItemIcon sx={{ ml: 4 }}>
                  {(i !== evoChain.length - 1 &&
                    e.stage === evoChain[i + 1].stage) ||
                  (i !== 0 && e.stage === evoChain[i - 1].stage) ? (
                    <SubdirectoryArrowRightIcon />
                  ) : (
                    <ArrowDownwardIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={<strong>{determineEvoMethod(e)}</strong>}
                />
              </ListItem>
            )}
            <ListItemButton
              onClick={() => navigate(`/${e.chainLink.species.name}`)}
            >
              <ListItemIcon>
                <PokemonIcon index={extractUrlIndex(e.chainLink.species.url)} />
              </ListItemIcon>
              <ListItemText
                primary={formatResponseText(e.chainLink.species.name)}
                secondary={<strong>{e.stage}</strong>}
              />
            </ListItemButton>
          </List>
        ))
      ) : (
        <Typography>This Pokemon does not evolve</Typography>
      )}
    </Box>
  ) : (
    <PokemonLoadingSpinner index={id} />
  );
};

export default EvolutionChain;
