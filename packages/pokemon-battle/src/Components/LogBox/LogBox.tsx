import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { dismissLog } from "../../Store/logSlice";
import { RootState } from "../../Store/store";

const LogBox = () => {
  const logs = useSelector((state: RootState) => state.logs.value);
  const dispatch = useDispatch();

  return (
    <Box
      onClick={() => {
        logs[0].onDismissal && logs[0].onDismissal();
        dispatch(dismissLog());
      }}
      height="100%"
      sx={{ borderTop: "1px solid darkgray" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h5">{logs[0].message}</Typography>
    </Box>
  );
};

export default LogBox;