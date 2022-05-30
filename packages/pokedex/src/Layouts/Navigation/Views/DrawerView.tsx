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
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useGetGenOnePokemonQuery } from "chriskuhtz-pokemon-api";

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
  const { data } = useGetGenOnePokemonQuery("");

  if (!data) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
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
        <Typography variant={"h6"}>
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="https://github.com/chriskuhtz/pokemonModules"
          >
            Github Repo
          </a>
        </Typography>
        {data.results.map((d: { name: string }) => (
          <Typography
            onClick={() => {
              setCurrentPokemon(d.name);
              setOpen(false);
            }}
          >
            {d.name}
          </Typography>
        ))}
      </Stack>
    </Drawer>
  );
};

export default DrawerView;
