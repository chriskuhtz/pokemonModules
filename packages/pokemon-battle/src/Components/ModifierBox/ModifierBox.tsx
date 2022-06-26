import { Box, Chip } from "@mui/material";
import { useId } from "react";
import { Stats } from "../../Models/Stat";
import {
  StatusConditionEnum,
  StatusConditions,
} from "../../Models/StatusConditions";

const ModifierBox = ({
  stats,
  statusConditions,
}: {
  stats: Stats;
  statusConditions: StatusConditions;
}) => {
  const uuid = useId();
  return (
    <Box>
      {statusConditions.primaryCondition === StatusConditionEnum.PARALYSIS && (
        <Chip sx={{ mr: 0.25, mt: 0.25 }} label={`paralyzed`} color="warning" />
      )}
      {statusConditions.primaryCondition === StatusConditionEnum.BURN && (
        <Chip sx={{ mr: 0.25, mt: 0.25 }} label={`burned`} color="error" />
      )}
      {Object.entries(stats)
        .filter((o) => o[1].modifier && o[1].modifier !== 0)
        .map((o) => (
          <Chip
            variant="outlined"
            key={`${uuid}${o[0]}`}
            sx={{ mr: 0.25, mt: 0.25 }}
            label={`${o[0]} ${o[1].modifier > 0 ? "+" : ""}${o[1].modifier}`}
            color={o[1].modifier > 0 ? "success" : "error"}
          />
        ))}
    </Box>
  );
};

export default ModifierBox;
