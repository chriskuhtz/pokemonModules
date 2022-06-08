import { Box, Typography } from "@mui/material";
import React from "react";
import { flooredRGBString } from "src/Helpers/flooredRGBString";

const ColorStackComponent = ({
  colorPalette,
}: {
  colorPalette: any;
}): JSX.Element => {
  const keys = Object.keys(colorPalette);

  return (
    <>
      {Object.values(colorPalette).map((o: { rgb: number[] }, i) => (
        <Box
          key={flooredRGBString(o.rgb)}
          width="100%"
          display="flex"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Typography>{keys[i]}</Typography>
          <Box
            sx={{
              backgroundColor: flooredRGBString(o.rgb),
            }}
            width="60%"
            height="48px"
            display="flex"
            justifyContent={"center"}
            alignItems="center"
          >
            <Typography overflow={"hidden"}>
              {flooredRGBString(o.rgb)}
            </Typography>
          </Box>
        </Box>
      ))}
    </>
  );
};

export default ColorStackComponent;
