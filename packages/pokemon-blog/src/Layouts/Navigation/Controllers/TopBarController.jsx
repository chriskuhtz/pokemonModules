import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Container, useTheme, useMediaQuery } from "@mui/material";
import DrawerController from "./DrawerController";
import ContentController from "../../Content/Controller/ContentController";

const TopBarController = ({ children }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmOrDown = useMediaQuery(theme.breakpoints.down("md"));

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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokemon Modules Blog
          </Typography>
        </Toolbar>{" "}
      </AppBar>

      <Toolbar />
      <DrawerController open={open} setOpen={setOpen} />
      <ContentController>{children}</ContentController>
    </Box>
  );
};

export default TopBarController;