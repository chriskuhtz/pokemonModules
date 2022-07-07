import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { dismissLog } from "../../Store/logSlice";
import { RootState } from "../../Store/store";

const LogBox = () => {
  const logs = useSelector((state: RootState) => state.logs.value.logs);
  const dispatch = useDispatch();

  return (
    <Box
      onClick={() => {
        logs[0].onDismissal && logs[0].onDismissal();
        dispatch(dismissLog());
      }}
      height="100%"
      sx={{ borderTop: "1px solid darkgray", backgroundColor: "white" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box textAlign={"center"}>
        <Typography variant="h5">{logs[0].message}</Typography>
        <Typography variant="h6">{logs[0].secondary}</Typography>
      </Box>
    </Box>
  );
};

export default LogBox;
