import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import SinglePokemonComponent from "./Components/SinglePokemon/Component/SinglePokemonComponent";
import TopBarController from "./Layouts/Navigation/Controllers/TopBarController";
import surprisedPikachu from "./data/surprised_pikachu.jpeg";

const App = (): JSX.Element => {
  const navigate = useNavigate();
  const intitialPokemon = "pikachu";

  function ErrorFallback({
    error,
    resetErrorBoundary,
  }: {
    error: Error;
    resetErrorBoundary: () => void;
  }) {
    return (
      <Stack spacing={2}>
        <img src={surprisedPikachu} />
        <Typography variant="h5">
          Unfortunately, the API that provides my data is only 99% complete.
          Sometimes an unexpected error can occur.
        </Typography>
        <Button variant="contained" size="large" onClick={resetErrorBoundary}>
          Back to Safety
        </Button>
      </Stack>
    );
  }

  return (
    <TopBarController>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          navigate("/");
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={`/${intitialPokemon}`}
                state={{ pokemon: intitialPokemon }}
              />
            }
          />
          <Route path="/:pokemonId" element={<SinglePokemonComponent />} />
        </Routes>
      </ErrorBoundary>
    </TopBarController>
  );
};

export default App;
