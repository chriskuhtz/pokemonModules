import {
  Box,
  Button,
  Chip,
  createTheme,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { orange } from "@mui/material/colors";
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
//187,89,193

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
