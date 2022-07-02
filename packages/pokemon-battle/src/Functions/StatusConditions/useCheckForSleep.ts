import { useDispatch, useSelector } from "react-redux";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import { StatusConditionEnum } from "../../Models/StatusConditions";
import { reduceStatusCounterForActivePokemon } from "../../Store/activePokemonSlice";
import { addLog } from "../../Store/logSlice";
import { reduceStatusCounterForOpponentPokemon } from "../../Store/opponentPokemonSlice";
import { RootState } from "../../Store/store";

export const useCheckForSleep = () => {
  const dispatch = useDispatch();
  const activePokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );
  const opponentPokemon: OpponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon.value
  );

  const checkForSleep = (contender: "active" | "opponent"): boolean => {
    const pokemon = contender === "active" ? activePokemon : opponentPokemon;
    const sleepCounter = pokemon.statusConditions.sleepCounter;
    const reduceCounter = () =>
      contender === "active"
        ? dispatch(
            reduceStatusCounterForActivePokemon(StatusConditionEnum.SLEEP)
          )
        : dispatch(
            reduceStatusCounterForOpponentPokemon(StatusConditionEnum.SLEEP)
          );

    if (!sleepCounter) return false;
    else {
      if (sleepCounter === 1) {
        dispatch(
          addLog({
            message: `${pokemon.name} woke up!`,
            onDismissal: () => reduceCounter(),
          })
        );
        return false;
      } else {
        dispatch(
          addLog({
            message: `${pokemon.name} is fast asleep!`,
            onDismissal: () => reduceCounter(),
          })
        );
        return true;
      }
    }
  };

  return { checkForSleep };
};
