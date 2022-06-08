import { useGetPokemonByNameQuery } from "chriskuhtz-pokemon-api";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Vibrant from "node-vibrant";
import { flooredRGBString } from "src/Helpers/flooredRGBString";
import AssembledCssComponent from "../AssembledCss/AssembledCssComponent";
import AssembledMuiThemeComponent from "../AssembledMuiTheme/AssembledMuiThemeComponent";
import ColorStackComponent from "../ColorStack/ColorStackComponent";

const MainComponent = (): JSX.Element => {
  const [index, setIndex] = useState(1);
  const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`;

  const [selectedPalette, setSelectedPalette] = useState({});
  const [fewColorsPalette, setFewColorsPalette] = useState({});
  const [mediumColorsPalette, setMediumColorsPalette] = useState({});
  const [manyColorsPalette, setManyColorsPalette] = useState({});
  const keys = Object.keys(selectedPalette);

  let v = (colorCount: number) => new Vibrant(img, { colorCount: colorCount });
  const newPalettes = () => {
    const colorCount = { few: 16, medium: 64, many: 128 };
    v(colorCount.few)
      .getPalette()
      .then((palette) => {
        setFewColorsPalette(palette), setSelectedPalette(palette);
      })
      .catch((error) => console.error(error));

    v(colorCount.medium)
      .getPalette()
      .then((palette) => {
        setMediumColorsPalette(palette);
      })
      .catch((error) => console.error(error));

    v(colorCount.many)
      .getPalette()
      .then((palette) => {
        setManyColorsPalette(palette);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    newPalettes();
  }, [index]);
  return (
    <Container maxWidth="md" disableGutters>
      <Stack spacing={3}>
        {" "}
        <Typography variant="h3">Pokemon Theme Generator</Typography>
        <Box display="flex" justifyContent="center">
          <img alt="pokemon" src={img} width="200px" />
        </Box>
        <Button
          variant="contained"
          onClick={() => setIndex(1 + Math.floor(Math.random() * 492))}
        >
          New Random Palette
        </Button>
        {selectedPalette !== {} && (
          <ColorStackComponent colorPalette={selectedPalette} />
        )}
        {selectedPalette !== {} && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <AssembledCssComponent colorPalette={selectedPalette} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <AssembledMuiThemeComponent colorPalette={selectedPalette} />
            </Grid>
          </Grid>
        )}
      </Stack>
    </Container>
  );
};

export default MainComponent;
