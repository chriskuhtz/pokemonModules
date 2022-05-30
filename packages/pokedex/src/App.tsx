import { useState } from "react";
import SinglePokemonComponent from "./Components/SinglePokemon/Component/SinglePokemonComponent";
import TopBarController from "./Layouts/Navigation/Controllers/TopBarController";

const App = (): JSX.Element => {
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
