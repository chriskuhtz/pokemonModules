import React, { ReactElement } from "react";
import { Container, useMediaQuery, useTheme } from "@mui/material";

const ContentView = ({ children }: { children: ReactElement }) => {
  const theme = useTheme();
  const isLgorUp = useMediaQuery(theme.breakpoints.up("lg"));
  const maxWidth = isLgorUp ? "sm" : "xs";
  return (
    <Container maxWidth={maxWidth} sx={{ p: 2 }} disableGutters>
      {children}
    </Container>
  );
};

export default ContentView;
