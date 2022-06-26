import { useSelector, useDispatch } from "react-redux";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import { StatusConditionEnum } from "../../Models/StatusConditions";
import {
  applyDamageToActivePokemon,
  updateActiveUiState,
} from "../../Store/activePokemonSlice";
import { addMultipleLogs, Log } from "../../Store/logSlice";
import {
  applyDamageToOpponentPokemon,
  updateOpponentUiState,
} from "../../Store/opponentPokemonSlice";
import { RootState } from "../../Store/store";
import { useGameOver } from "./useGameOver";

export const useApplyEndOfTurnEffects = () => {
  const dispatch = useDispatch();
  const { gameOver } = useGameOver();

  const applyEndOfTurnEffects = (
    pokemon: ActivePokemon | OpponentPokemon,
    contender: "active" | "opponent"
  ) => {
    let logs: Log[] = [];
    if (pokemon.statusConditions.primaryCondition) {
      if (
        [StatusConditionEnum.BURN].includes(
          pokemon.statusConditions.primaryCondition
        )
      ) {
        console.log(pokemon.statusConditions.primaryCondition);
        const damage = Math.round(pokemon.hp.initial / 16);
        dispatch(
          contender === "active"
            ? applyDamageToActivePokemon(damage)
            : applyDamageToOpponentPokemon(damage)
        );
        logs.push({
          message: `${pokemon.name} was hurt by burn.`,
          onDismissal: () =>
            contender === "active"
              ? dispatch(updateActiveUiState())
              : dispatch(updateOpponentUiState()),
        });

        //check if one contender fainted
        if (pokemon.hp.current - damage <= 0) {
          const gameIsOver = gameOver();
          logs = logs.concat(gameIsOver.logs);
        }
      }
    }

    dispatch(addMultipleLogs(logs));
  };

  return { applyEndOfTurnEffects };
};
