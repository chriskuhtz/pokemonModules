import React from "react";
import {
  Stack,
  Divider,
  Drawer,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

const DrawerController = ({ open, setOpen }) => {
  const theme = useTheme();
  const isMdOrUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Drawer open={isMdOrUp || open} onClose={() => setOpen(!open)}>
      <Toolbar />
      <Stack spacing={2} sx={{ p: 3 }}>
        {" "}
        <Link style={{ textDecoration: "none" }} to="/why-pokemon">
          Why Pokemon
        </Link>
        <Link style={{ textDecoration: "none" }} to="/why-monorepo">
          Why Monorepo
        </Link>
        <Link style={{ textDecoration: "none" }} to="/older-modules">
          Api Modules
        </Link>
        <Divider />
        <Link style={{ textDecoration: "none" }} to="/older-modules">
          Older Modules
        </Link>
      </Stack>
    </Drawer>
  );
};

export default DrawerController;
