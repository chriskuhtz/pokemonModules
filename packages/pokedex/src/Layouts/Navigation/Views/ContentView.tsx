import React, { ReactElement } from "react";
import { Container } from "@mui/material";

const ContentView = ({ children }: { children: ReactElement }) => {
  return (
    <Container maxWidth="sm" sx={{ p: 2 }} disableGutters>
      {children}
    </Container>
  );
};

export default ContentView;
