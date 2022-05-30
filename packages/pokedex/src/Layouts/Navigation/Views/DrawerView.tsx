import React from "react";
import {
  Stack,
  Divider,
  Drawer,
  Toolbar,
  useTheme,
  useMediaQuery,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const DrawerView = ({
  open,
  setOpen,
  currentPokemon,
  setCurrentPokemon,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  currentPokemon: string;
  setCurrentPokemon: (pokemon: string) => void;
}) => {
  const theme = useTheme();

  return (
    <Drawer variant="persistent" open={open} onClose={() => setOpen(!open)}>
      <Stack
        spacing={2}
        sx={{
          py: 9,
          px: { xs: 3, lg: 6 },
          minWidth: { xs: "100vw", md: 0 },
          minHeight: "100%",
        }}
      >
        <Typography>
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="https://github.com/chriskuhtz/pokemonModules"
          >
            Entire Repo
          </a>
        </Typography>
        <Typography
          onClick={() => {
            setCurrentPokemon("bulbasaur");
            setOpen(false);
          }}
        >
          Bulbasaur
        </Typography>
      </Stack>
    </Drawer>
  );
};

export default DrawerView;
