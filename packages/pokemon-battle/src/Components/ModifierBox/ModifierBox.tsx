import { Box, Chip } from "@mui/material";
import { Stats } from "../../Models/Stat";

const ModifierBox = ({ stats }: { stats: Stats }) => {
  return (
    <Box>
      {Object.entries(stats)
        .filter((o) => o[1].modifier && o[1].modifier !== 1)

        .map((o) => (
          <Chip
            sx={{ mr: 0.25, mt: 0.25 }}
            label={`${o[0]}:${o[1].modifier}`}
          />
        ))}
    </Box>
  );
};

export default ModifierBox;
