import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useLazyGetMoveByUrlQuery } from "chriskuhtz-pokemon-api";
import { useState } from "react";
import SingularMoveDetails from "./SingularMoveDetails";
import { SingularMoveProps } from "../Models/SinglePokemonModels";
import { formatResponseText } from "../../../Helpers/formatResponseText";
import { PokemonLoadingSpinner } from "chriskuhtz-pokemon-common-components";

const SingularMove = ({ move, isLvlUp, id }: SingularMoveProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const lvl = move?.version_group_details[0].level_learned_at;

  const [trigger, result] = useLazyGetMoveByUrlQuery();

  return (
    <ListItemButton
      onClick={() => {
        move?.move.url && trigger(move.move.url);
        setShowDetails(!showDetails);
      }}
    >
      {result.isLoading && (
        <ListItemIcon>
          <PokemonLoadingSpinner index={id} />
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
    </ListItemButton>
  );
};

export default SingularMove;
