import React from "react";
import {
  Stack,
  Divider,
  Drawer,
  useTheme,
  Typography,
  Box,
} from "@mui/material";

const DrawerView = ({ open, setOpen }) => {
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
          <Typography variant="caption">Next Features</Typography>
        </Box>
        <Link
          onClick={() => {
            setOpen(false);
          }}
          style={{ textDecoration: "none", color: "inherit" }}
          to="/next-features"
        >
          Next Features
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

export default DrawerView;
