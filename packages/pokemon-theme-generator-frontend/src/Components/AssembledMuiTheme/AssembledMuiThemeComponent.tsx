import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { flooredRGBString } from "src/Helpers/flooredRGBString";

const AssembledMuiThemeComponent = ({
  colorPalette,
}: {
  colorPalette: any;
}): JSX.Element => {
  const muiKeys = [
    "primary",
    "secondary",
    "error",
    "warning",
    "info",
    "success",
  ];

  const assembleMuiTheme = () => {
    const assembledArray: string[] = [];
    Object.values(colorPalette).map((o: { rgb: number[] }, i) =>
      assembledArray.push(
        `${muiKeys[i]}: { main: "${flooredRGBString(o.rgb)}"},`
      )
    );

    return [
      'import { createTheme } from "@mui/material";',
      "export const pokemonMuiTheme = createTheme({",
      `palette: {`,
    ]
      .concat(assembledArray)
      .concat(["},", "})"]);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h5"> As Mui Theme:</Typography>
      <Typography>
        {assembleMuiTheme().map((a: string, i) => (
          <Box
            key={a + i}
            pl={
              [
                0,
                1,
                2,
                assembleMuiTheme().length - 1,
                assembleMuiTheme().length - 2,
              ].includes(i)
                ? [2, assembleMuiTheme().length - 2].includes(i)
                  ? 2
                  : 0
                : 4
            }
          >
            {a}
            <br />
          </Box>
        ))}
      </Typography>
    </Stack>
  );
};

export default AssembledMuiThemeComponent;
