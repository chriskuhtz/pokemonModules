import { useState } from "react";
import SinglePokemonComponent from "./Components/SinglePokemon/Component/SinglePokemonComponent";
import TopBarController from "./Layouts/Navigation/Controllers/TopBarController";
import { useGetAllPokemonQuery } from "chriskuhtz-pokemon-api";

const App = (): JSX.Element => {
  const { data, isLoading, isError } = useGetAllPokemonQuery();
  const [currentPokemon, setCurrentPokemon] = useState<string>("pikachu");

  return (
    <TopBarController
      currentPokemon={currentPokemon}
      setCurrentPokemon={setCurrentPokemon}
    >
      <SinglePokemonComponent pokemon={currentPokemon} />
    </TopBarController>
  );
};

export default App;
