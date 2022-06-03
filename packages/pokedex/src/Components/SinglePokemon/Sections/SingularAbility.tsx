import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import { useGetAbilityByIndexQuery } from "chriskuhtz-pokemon-api";

const SingularAbility = ({
  index,
  isHidden,
}: {
  index: number;
  isHidden: boolean;
}) => {
  const { data: abilityData, isLoading } = useGetAbilityByIndexQuery(index);

  if (isLoading) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <Box display="flex" justifyContent={"space-between"} alignItems="center">
        <Typography variant="h6">{abilityData.name} </Typography>
        {isHidden && <Chip label="hidden ability" variant="outlined" />}
      </Box>

      <Typography>{abilityData.effect_entries[1].short_effect}</Typography>
    </>
  );
};

export default SingularAbility;
