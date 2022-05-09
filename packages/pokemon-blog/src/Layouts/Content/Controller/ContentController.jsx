import React from "react";
import { Container } from "@mui/material";

const ContentController = ({ children }) => {
  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      {children}
    </Container>
  );
};

export default ContentController;
