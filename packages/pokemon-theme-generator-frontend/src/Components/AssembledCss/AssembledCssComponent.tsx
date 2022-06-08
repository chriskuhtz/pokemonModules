import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { flooredRGBString } from "src/Helpers/flooredRGBString";

const AssembledCssComponent = ({
  colorPalette,
}: {
  colorPalette: any;
}): JSX.Element => {
  const keys = Object.keys(colorPalette);

  const assembleCssVariables = () => {
    const assembledArray: string[] = [];
    Object.values(colorPalette).map((o: { rgb: number[] }, i) =>
      assembledArray.push(`--${keys[i]}: ${flooredRGBString(o.rgb)};`)
    );

    return [`:root {`].concat(assembledArray).concat(["}"]);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h5"> As CSS Variables:</Typography>
      <Typography>
        {assembleCssVariables().map((a: string, i) => (
          <Box
            key={a + i}
            pl={i !== 0 && i !== assembleCssVariables().length - 1 ? 2 : 0}
          >
            {a}
            <br />
          </Box>
        ))}
      </Typography>
    </Stack>
  );
};

export default AssembledCssComponent;
