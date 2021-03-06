import { Box, Chip } from "@mui/material";
import { useId } from "react";
import { Stats } from "../../Models/Stat";
import {
  StatusConditionEnum,
  StatusConditions,
} from "../../Models/StatusConditions";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import PsychologyIcon from "@mui/icons-material/Psychology";
import HotelIcon from "@mui/icons-material/Hotel";

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
        <Chip
          sx={{ mr: 0.25, mt: 0.25 }}
          label={<ElectricBoltIcon />}
          color="warning"
        />
      )}
      {statusConditions.primaryCondition === StatusConditionEnum.BURN && (
        <Chip
          sx={{ mr: 0.25, mt: 0.25 }}
          label={<LocalFireDepartmentIcon />}
          color="error"
        />
      )}
      {statusConditions.primaryCondition === StatusConditionEnum.POISON && (
        <Chip
          sx={{ mr: 0.25, mt: 0.25 }}
          label={<CoronavirusIcon />}
          color="secondary"
        />
      )}
      {statusConditions.primaryCondition === StatusConditionEnum.SLEEP && (
        <Chip sx={{ mr: 0.25, mt: 0.25 }} label={<HotelIcon />} />
      )}
      {statusConditions.primaryCondition === StatusConditionEnum.FREEZE && (
        <Chip sx={{ mr: 0.25, mt: 0.25 }} color="info" label={<AcUnitIcon />} />
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
