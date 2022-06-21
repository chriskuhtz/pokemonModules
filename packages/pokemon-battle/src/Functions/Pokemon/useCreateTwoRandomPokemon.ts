import {
  useGetAllPokemonQuery,
  useGetPokemonByNameQuery,
} from "chriskuhtz-pokemon-api";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivePokemon } from "../../Store/activePokemonSlice";
import { setOpponentPokemon } from "../../Store/opponentPokemonSlice";
import { RootState } from "../../Store/store";
import { createActivePokemon, createOpponentPokemon } from "./createPokemon";
import { useFetchMoves } from "./useFetchMoves";

export const useCreateTwoRandomPokemon = () => {
  const dispatch = useDispatch();
  //get two random pokemon for the fight
  const { data: allPokemonData } = useGetAllPokemonQuery("");
  const [randomPokemon, setRandomPokemon] = useState(["pikachu", "eevee"]);
  useEffect(() => {
    if (allPokemonData) {
      const randomActive =
        allPokemonData.results[Math.floor(Math.random() * 493)].name;
      const randomOpponent =
        allPokemonData.results[Math.floor(Math.random() * 493)].name;

      setRandomPokemon([randomActive, randomOpponent]);
    }
  }, [allPokemonData]);

  //all hooks,selectors etc for active Pokemon
  const activePokemon = useSelector((state: RootState) => state.activePokemon);
  const { data: activeData } = useGetPokemonByNameQuery(randomPokemon[0]);
  const [activeMoveUrls, setActiveMoveUrls] = useState<string[]>([]);
  const { fetchMoves: fetchActiveMoves, moves: activeMoves } = useFetchMoves();

  //all hooks,selectors etc for opponent Pokemon
  const opponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon
  );
  const { data: opponentData } = useGetPokemonByNameQuery(randomPokemon[1]);
  const [opponentMoveUrls, setOpponentMoveUrls] = useState<string[]>([]);
  const { fetchMoves: fetchOpponentMoves, moves: opponentMoves } =
    useFetchMoves();

  //extract the move urls after the pokemon is loaded
  useEffect(() => {
    if (
      activeData &&
      activeMoveUrls.length === 0 &&
      opponentData &&
      opponentMoveUrls.length === 0
    ) {
      setActiveMoveUrls(
        activeData.moves.slice(0, 4).map((m: { move: { url: string } }) => {
          return m.move.url;
        })
      );
      setOpponentMoveUrls(
        opponentData.moves.slice(1, 5).map((m: { move: { url: string } }) => {
          return m.move.url;
        })
      );
    }
  }, [activeData, activeMoveUrls, opponentData, opponentMoveUrls]);

  //load the move data from the urls
  useEffect(() => {
    if (activeMoveUrls.length !== 0 && opponentMoveUrls.length !== 0) {
      fetchActiveMoves(activeMoveUrls);
      fetchOpponentMoves(opponentMoveUrls);
    }
  }, [activeMoveUrls, opponentMoveUrls]);

  //create Pokemon Objects out of the pokemon and move data
  useEffect(() => {
    if (
      activeData &&
      opponentData &&
      activeMoves.length !== 0 &&
      opponentMoves.length !== 0
    ) {
      const activePokemon = createActivePokemon(
        activeData.stats,
        activeData.sprites.back_default,
        activeData.name,
        activeData.types,
        activeMoves
      );
      const opponentPokemon = createOpponentPokemon(
        opponentData.stats,
        opponentData.sprites.front_default,
        opponentData.name,
        opponentData.types,
        opponentMoves
      );
      dispatch(setActivePokemon(activePokemon));
      dispatch(setOpponentPokemon(opponentPokemon));
    }
  }, [activeData, opponentData, opponentMoves, activeMoves]);

  return { activePokemon, opponentPokemon };
};
