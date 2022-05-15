import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Container, useTheme, useMediaQuery } from "@mui/material";
import DrawerView from "../Views/DrawerView";
import ContentView from "../Views/ContentView";
import { Link } from "react-router-dom";

const TopBarController = ({ children }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmOrDown = useMediaQuery(theme.breakpoints.down("md"));
  const isMdOrUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        {" "}
        <Toolbar>
          {isSmOrDown && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Pokemon Modules Blog
            </Typography>
          </Link>
        </Toolbar>{" "}
      </AppBar>

      <Toolbar />
      <DrawerView open={isMdOrUp || open} setOpen={setOpen} />
      <ContentView>{children}</ContentView>
    </Box>
  );
};

export default TopBarController;
