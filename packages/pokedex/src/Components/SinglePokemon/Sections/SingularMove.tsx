import {
  Box,
  CircularProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLazyGetMoveByUrlQuery } from "chriskuhtz-pokemon-api";
import { useState } from "react";
import SingularMoveDetails from "./SingularMoveDetails";
import { SingularMoveProps } from "../Models/SinglePokemonModels";
import { formatResponseText } from "../../../Helpers/formatResponseText";

const SingularMove = ({ move, isLvlUp }: SingularMoveProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const lvl = move?.version_group_details[0].level_learned_at;

  const [trigger, result] = useLazyGetMoveByUrlQuery();

  return (
    <ListItem
      onClick={() => {
        move?.move.url && trigger(move.move.url);
        setShowDetails(!showDetails);
      }}
    >
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
          >
            <strong>{formatResponseText(move?.move.name || "")}</strong>
            {isLvlUp && `at level ${lvl}`}
          </Box>
        }
        secondary={
          result.isSuccess && showDetails ? (
            <SingularMoveDetails data={result.data} />
          ) : (
            "more info"
          )
        }
      />
    </ListItem>
  );
};

export default SingularMove;
