import { startTransition, Suspense, useState } from "react";
import {
  Stack,
  Drawer,
  Typography,
  Box,
  InputAdornment,
  TextField,
  ListItemIcon,
  ListItemText,
  List,
  ListItemButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { extractUrlIndex, useGetAllPokemonQuery } from "chriskuhtz-pokemon-api";
import { useNavigate, useParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { formatResponseText } from "../../../Helpers/formatResponseText";
import {
  PokemonIcon,
  PokemonLoadingSpinner,
} from "chriskuhtz-pokemon-common-components";

const DrawerView = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const navigate = useNavigate();
  let { pokemonId } = useParams();

  const theme = useTheme();
  const isMdorUp = useMediaQuery(theme.breakpoints.up("md"));

  const { data, isLoading } = useGetAllPokemonQuery("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  if (isLoading) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height="100vh"
      >
        <PokemonLoadingSpinner index={25} />
      </Box>
    );
  }
  return (
    <Drawer
      variant={isMdorUp ? "permanent" : "persistent"}
      open={open}
      onClose={() => setOpen(!open)}
    >
      <Stack
        spacing={2}
        sx={{
          py: 11,
          minWidth: { xs: "100vw", md: 0 },
          maxWidth: { xs: 0, md: "225px", lg: "300px", xl: "400px" },
          minHeight: "100%",
        }}
      >
        <TextField
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);

            startTransition(() => {
              setSearchQuery(e.target.value);
            });
          }}
          sx={{ px: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CloseIcon
                  onClick={() => {
                    setSearchQuery("");
                    setSearchInput("");
                  }}
                />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <Suspense fallback={<PokemonLoadingSpinner index={25} />}>
          <List>
            {data.results
              .filter((d: { name: string }) =>
                d.name.includes(searchQuery.toLowerCase())
              )
              .map((d: { name: string; url: string }) => (
                <ListItemButton
                  key={d.name}
                  onClick={() => {
                    setOpen(false);
                    navigate(`/${d.name}`);
                  }}
                >
                  <ListItemIcon>
                    <PokemonIcon index={extractUrlIndex(d.url)} />
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
        </Suspense>
      </Stack>
    </Drawer>
  );
};

export default DrawerView;
