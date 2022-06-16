import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {
  useGetMoveByUrlQuery,
  useLazyGetMoveByUrlQuery,
} from "chriskuhtz-pokemon-api";
import { useEffect, useState } from "react";
import SingularMoveDetails from "./SingularMoveDetails";
import { SingularMoveProps } from "../Models/SinglePokemonModels";
import { formatResponseText } from "../../../Helpers/formatResponseText";
import {
  PokemonLoadingSpinner,
  TypeIcon,
} from "chriskuhtz-pokemon-common-components";

const SingularMove = ({ move, isLvlUp, id }: SingularMoveProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const lvl = move?.version_group_details[0].level_learned_at;

  const { data, isLoading, isSuccess } = useGetMoveByUrlQuery(
    move?.move.url || ""
  );

  return (
    <ListItemButton
      sx={{ mx: -2 }}
      onClick={() => {
        setShowDetails(!showDetails);
      }}
      alignItems="flex-start"
    >
      <ListItemIcon>
        {isLoading && <PokemonLoadingSpinner index={id} />}
        {isSuccess && <TypeIcon size={40} type={data.type.name} />}
      </ListItemIcon>

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
          isSuccess && showDetails ? (
            <SingularMoveDetails data={data} />
          ) : (
            "more info"
          )
        }
      />
    </ListItemButton>
  );
};

export default SingularMove;
