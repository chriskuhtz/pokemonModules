import { Box, Chip } from "@mui/material";
import { useId } from "react";
import { Stats } from "../../Models/Stat";

const ModifierBox = ({ stats }: { stats: Stats }) => {
  const uuid = useId();
  return (
    <Box>
      {Object.entries(stats)
        .filter((o) => o[1].modifier && o[1].modifier !== 0)

        .map((o) => (
          <Chip
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
