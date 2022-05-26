import React from "react";
import { Container } from "@mui/material";

const ContentView = ({ children }) => {
  return (
    <Container maxWidth="sm" sx={{ p: 2 }} disableGutters>
      {children}
    </Container>
  );
};

export default ContentView;
