import { Navigate, Route, Routes } from "react-router-dom";
import SinglePokemonComponent from "./Components/SinglePokemon/Component/SinglePokemonComponent";
import TopBarController from "./Layouts/Navigation/Controllers/TopBarController";

const App = (): JSX.Element => {
  const intitialPokemon = "pikachu";

  return (
    <TopBarController>
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
    </TopBarController>
  );
};

export default App;
