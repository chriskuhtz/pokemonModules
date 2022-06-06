import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { TypeIcon } from "chriskuhtz-pokemon-common-components";
import { formatResponseText } from "../../../Helpers/formatResponseText";
import { SinglePokemonTypesProps } from "../Models/SinglePokemonModels";

const SinglePokemonTypes = ({ types }: SinglePokemonTypesProps) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="h5">
        {types.length > 1 ? "Types" : "Type"}
      </Typography>

      {types.map((t) => (
        <Box px={2} display="flex" alignItems="center">
          <TypeIcon type={t} size={40} />
          <Typography sx={{ pl: 1 }} variant="h6">
            {formatResponseText(t)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default SinglePokemonTypes;
