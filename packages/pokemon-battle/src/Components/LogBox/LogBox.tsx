import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { removeLog } from "../../Store/logSlice";
import { RootState } from "../../Store/store";

const LogBox = () => {
  const logs = useSelector((state: RootState) => state.logs.value);
  const dispatch = useDispatch();

  return (
    <Box
      onClick={() => dispatch(removeLog())}
      height="100%"
      sx={{ borderTop: "1px solid darkgray" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h5">{logs[0]}</Typography>
    </Box>
  );
};

export default LogBox;
