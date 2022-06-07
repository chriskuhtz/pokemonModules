import { useGetPokemonByNameQuery } from "chriskuhtz-pokemon-api";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Vibrant from "node-vibrant";

const MainComponent = (): JSX.Element => {
  const [index, setIndex] = useState(1);
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`;
  let v = new Vibrant(img, { colorCount: 64 });
  const [colorPalette, setColorPalette] = useState({});

  const keys = Object.keys(colorPalette);

  const newPalette = () =>
    v
      .getPalette()
      .then((palette) => {
        console.log(palette), setColorPalette(palette);
      })
      .catch((error) => console.error(error));

  const flooredRGBString = (rgb: number[]): string => {
    return `rgb(${rgb.map((r: number) => Math.floor(r)).join()})`;
  };
  const assembleCssVariables = () => {
    const assembledArray: string[] = [];
    Object.values(colorPalette).map((o: { rgb: number[] }, i) =>
      assembledArray.push(`--${keys[i]}: ${flooredRGBString(o.rgb)};`)
    );

    return [`:root {`].concat(assembledArray).concat(["}"]);
  };

  useEffect(() => {
    console.log(Object.entries(colorPalette));
  }, [colorPalette]);

  const assembleMuiTheme = () => {
    const muiKeys = [
      "primary",
      "secondary",
      "error",
      "warning",
      "info",
      "success",
    ];
    const assembledArray: string[] = [];
    Object.values(colorPalette).map((o: { rgb: number[] }, i) =>
      assembledArray.push(
        `${muiKeys[i]}: { main: "${flooredRGBString(o.rgb)}"},`
      )
    );

    return [`palette: {`].concat(assembledArray).concat(["},"]);
  };

  useEffect(() => {
    console.log(Object.entries(colorPalette));
  }, [colorPalette]);

  useEffect(() => {
    newPalette();
  }, [index]);
  return (
    <Container maxWidth="md" disableGutters>
      <Stack spacing={3}>
        {" "}
        <Typography variant="h3">Pokemon Theme Generator</Typography>
        <Box display="flex" justifyContent="center">
          {" "}
          <img alt="pokemon" src={img} width="200px" />
        </Box>
        <Button
          variant="contained"
          onClick={() => setIndex(Math.floor(Math.random() * 493))}
        >
          New Random Palette
        </Button>
        {Object.values(colorPalette).map((o: { rgb: number[] }, i) => (
          <Box
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
        <Box>
          <Box>
            <Typography variant="h5"> As CSS Variables:</Typography>
            <Typography>
              {assembleCssVariables().map((a: string, i) => (
                <Box
                  pl={
                    i !== 0 && i !== assembleCssVariables().length - 1 ? 2 : 0
                  }
                >
                  {a}
                  <br />
                </Box>
              ))}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5"> As Mui Theme:</Typography>
            <Typography>
              {assembleMuiTheme().map((a: string, i) => (
                <Box
                  pl={i !== 0 && i !== assembleMuiTheme().length - 1 ? 2 : 0}
                >
                  {a}
                  <br />
                </Box>
              ))}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default MainComponent;
