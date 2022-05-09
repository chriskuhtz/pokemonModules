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
} from "@mui/material";
import { Link } from "react-router-dom";

const DrawerController = ({ open, setOpen }) => {
  const theme = useTheme();
  const isMdOrUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Drawer
      variant="persistent"
      open={isMdOrUp || open}
      onClose={() => setOpen(!open)}
    >
      <Toolbar />
      <Stack spacing={2} sx={{ p: 3, minWidth: { xs: "100vw", md: 0 } }}>
        {" "}
        <Link
          onClick={() => {
            setOpen(false);
          }}
          style={{ textDecoration: "none", color: "inherit" }}
          to="/intro"
        >
          Intro
        </Link>
        <Box>
          <Divider />
          <Typography variant="caption">Modules</Typography>
        </Box>
        <Link
          onClick={() => {
            setOpen(false);
          }}
          style={{ textDecoration: "none", color: "inherit" }}
          to="/api-modules"
        >
          Api Module
        </Link>
        <Box>
          <Divider />
          <Typography variant="caption">Legacy</Typography>
        </Box>
        <Link
          onClick={() => {
            setOpen(false);
          }}
          style={{ textDecoration: "none", color: "inherit" }}
          to="/older-modules"
        >
          Older Modules
        </Link>
        <Box>
          <Divider />
          <Typography variant="caption">Github</Typography>
        </Box>
        <Typography>
          <a
            style={{ textDecoration: "none", color: "inherit" }}
            href="https://github.com/chriskuhtz/pokemonModules"
          >
            Entire Repo
          </a>
        </Typography>
      </Stack>
    </Drawer>
  );
};

export default DrawerController;
