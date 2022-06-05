import React, { ReactElement, ReactNode, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Container, useTheme, useMediaQuery } from "@mui/material";
import DrawerView from "../Views/DrawerView";
import ContentView from "../Views/ContentView";

const TopBarController = ({
  children,
}: {
  children: ReactElement;
}): JSX.Element => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isSmOrDown = useMediaQuery(theme.breakpoints.down("md"));
  const isMdOrUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container maxWidth={false} disableGutters sx={{ minHeight: "100vh" }}>
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
              Pokedex 0.0.1
            </Typography>
          </Toolbar>{" "}
        </AppBar>

        <Toolbar />
        <DrawerView open={isMdOrUp || open} setOpen={setOpen} />
        <ContentView>{children}</ContentView>
      </Box>
    </Container>
  );
};

export default TopBarController;
