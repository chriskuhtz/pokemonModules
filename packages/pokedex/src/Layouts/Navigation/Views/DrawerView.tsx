import React, { useEffect, useState } from "react";
import {
  Stack,
  Drawer,
  Typography,
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useGetAllPokemonQuery } from "chriskuhtz-pokemon-api";
import { Link, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const DrawerView = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { state } = useLocation() as { state: { pokemon: string } };

  const { data, isLoading } = useGetAllPokemonQuery("");
  const [search, setSearch] = useState<string>("");

  if (isLoading) {
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

        <TextField
          id="input-with-icon-textfield"
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ pr: { xs: 6, sm: 0 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CloseIcon onClick={() => setSearch("")} />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />

        {data.results
          .filter((d: { name: string }) => d.name.includes(search))
          .map((d: { name: string }) => (
            <Typography
              key={d.name}
              color={d.name === state.pokemon ? "primary" : "text"}
              onClick={() => {
                setOpen(false);
              }}
            >
              <Link
                to={`/${d.name}`}
                state={{ pokemon: d.name }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {d.name}
              </Link>
            </Typography>
          ))}
      </Stack>
    </Drawer>
  );
};

export default DrawerView;
