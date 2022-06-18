import { Box, LinearProgress, Typography } from "@mui/material";
import { ProgressWithLabelProps } from "./ProgressWithLabelProps";

const ProgressWithLabel = ({
  label,
  color,
  value,
  healthBar,
}: ProgressWithLabelProps) => {
  return (
    <Box display="flex" alignItems={"center"}>
      <Box width={"30%"}>
        <Typography>{label}</Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          value={value}
          variant="determinate"
          color={
            color ?? healthBar
              ? value < 20
                ? "error"
                : value < 50
                ? "warning"
                : "success"
              : "primary"
          }
        />
      </Box>
    </Box>
  );
};
export default ProgressWithLabel;
