import React from "react";
import { Container } from "@mui/material";

const ContentController = ({ children }) => {
  return <Container maxWidth="sm">{children}</Container>;
};

export default ContentController;
