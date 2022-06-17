import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { removeLog } from "../../store/logSlice";
import { RootState } from "../../store/store";

const LogBox = () => {
  const logs = useSelector((state: RootState) => state.logs.value);
  const dispatch = useDispatch();

  return (
    <Box
      onClick={() => dispatch(removeLog())}
      height="100%"
      sx={{ border: "1px solid black" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h5">{logs[0]}</Typography>
    </Box>
  );
};

export default LogBox;
