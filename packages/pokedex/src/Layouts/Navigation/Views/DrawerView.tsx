import React, { useEffect, useState } from "react";
import {
  Stack,
  Drawer,
  Typography,
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  ListItemButton,
} from "@mui/material";
import { extractUrlIndex, useGetAllPokemonQuery } from "chriskuhtz-pokemon-api";
import { useNavigate, useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { formatResponseText } from "../../../Helpers/formatResponseText";

const DrawerView = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const navigate = useNavigate();
  let { pokemonId } = useParams();

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
          minWidth: { xs: "100vw", md: 0 },
          minHeight: "100%",
        }}
      >
        <Typography variant={"h6"} sx={{ px: { xs: 3, lg: 6 } }}>
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="https://github.com/chriskuhtz/pokemonModules"
          >
            Github Repo
          </a>
        </Typography>

        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ px: 2 }}
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
        <List>
          {data.results
            .filter((d: { name: string }) => d.name.includes(search))
            .map((d: { name: string; url: string }) => (
              <ListItemButton
                key={d.name}
                onClick={() => {
                  setOpen(false);
                  navigate(`/${d.name}`);
                }}
              >
                <ListItemIcon>
                  <img
                    src={
                      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                      extractUrlIndex(d.url) +
                      ".png"
                    }
                  />
                </ListItemIcon>
                <ListItemText
                  sx={{ color: d.name === pokemonId ? "primary" : "text" }}
                  primary={
                    <Typography variant="h5">
                      #
                      {extractUrlIndex(d.url) < 10
                        ? "00" + extractUrlIndex(d.url)
                        : extractUrlIndex(d.url) < 100
                        ? "0" + extractUrlIndex(d.url)
                        : extractUrlIndex(d.url)}{" "}
                      {formatResponseText(d.name)}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
        </List>
      </Stack>
    </Drawer>
  );
};

export default DrawerView;
