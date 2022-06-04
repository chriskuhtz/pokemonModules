import {
  Box,
  CircularProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Move } from "./SinglePokemonMoves";
import { useLazyGetMoveByIndexQuery } from "chriskuhtz-pokemon-api";
import { useEffect, useState } from "react";
import SingularMoveDetails from "./SingularMoveDetails";

const SingularMove = ({
  move,
  isLvlUp,
}: {
  move?: Move;
  isLvlUp?: boolean;
}) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const splitUrl = move?.move.url.split("/");

  const urlIndex = splitUrl && parseInt(splitUrl[splitUrl.length - 2]);

  const lvl = move?.version_group_details[0].level_learned_at;

  const [trigger, result] = useLazyGetMoveByIndexQuery();

  return (
    <ListItem>
      {result.isLoading && (
        <ListItemIcon>
          <CircularProgress />
        </ListItemIcon>
      )}
      <ListItemText
        primary={
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            onClick={() => {
              urlIndex && trigger(urlIndex);
              setShowDetails(!showDetails);
            }}
          >
            <strong>{move?.move.name}</strong>
            {isLvlUp && `at level ${lvl}`}
          </Box>
        }
        secondary={
          result.isSuccess && showDetails ? (
            <SingularMoveDetails
              data={result.data}
              setShowDetails={setShowDetails}
            />
          ) : (
            "more info"
          )
        }
      />
    </ListItem>
  );
};

export default SingularMove;
