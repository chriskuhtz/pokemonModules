import { Box, Chip, Typography } from "@mui/material";
import { useGetAbilityByUrlQuery } from "chriskuhtz-pokemon-api";
import { PokemonLoadingSpinner } from "chriskuhtz-pokemon-common-components";
import { formatResponseText } from "../../../Helpers/formatResponseText";
import { SingularAbilityProps } from "../Models/SinglePokemonModels";

const SingularAbility = ({ url, isHidden, id }: SingularAbilityProps) => {
  const { data: abilityData, isLoading } = useGetAbilityByUrlQuery(url);

  if (isLoading) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height="100vh"
      >
        <PokemonLoadingSpinner index={id} />
      </Box>
    );
  }
  return (
    <>
      <Box display="flex" justifyContent={"space-between"} alignItems="center">
        <Typography variant="h6">
          {formatResponseText(abilityData.name)}{" "}
        </Typography>
        {isHidden && <Chip label="hidden ability" variant="outlined" />}
      </Box>

      <Typography>
        {formatResponseText(
          abilityData.effect_entries[abilityData.effect_entries.length - 1]
            .short_effect
        )}
      </Typography>
    </>
  );
};

export default SingularAbility;
