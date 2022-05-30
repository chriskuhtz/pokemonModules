import React, { ReactElement } from "react";
import { Container } from "@mui/material";

const ContentView = ({
  children,
  currentPokemon,
}: {
  children: ReactElement;
  currentPokemon: string;
}) => {
  return (
    <Container maxWidth="sm" sx={{ p: 2 }} disableGutters>
      <section>
        {React.cloneElement(children, { pokemon: currentPokemon })}
      </section>
    </Container>
  );
};

export default ContentView;
