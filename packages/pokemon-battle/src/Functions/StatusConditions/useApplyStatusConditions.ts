import { useDispatch, useSelector } from "react-redux";
import { Move } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import { StatusConditionEnum } from "../../Models/StatusConditions";
import {
  applyStatusConditionToActivePokemon,
  updateActiveUiState,
} from "../../Store/activePokemonSlice";
import { Log } from "../../Store/logSlice";
import {
  applyStatusConditionToOpponentPokemon,
  updateOpponentUiState,
} from "../../Store/opponentPokemonSlice";
import { RootState } from "../../Store/store";

export const useApplyStatusConditions = () => {
  const dispatch = useDispatch();

  const activePokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );

  const applyStatusConditions = (
    move: Move,
    user: ActivePokemon | OpponentPokemon,
    target: ActivePokemon | OpponentPokemon
  ): { logs: Log[] } => {
    const logs: Log[] = [];

    if (
      move.meta.ailment_chance &&
      move.meta.ailment_chance >= Math.random() * 10
    ) {
      if (
        !target.statusConditions.paralyzed &&
        move.meta.ailment.name === StatusConditionEnum.PARALYSIS
      ) {
        user === activePokemon
          ? dispatch(
              applyStatusConditionToOpponentPokemon(
                move.meta.ailment.name as StatusConditionEnum
              )
            )
          : dispatch(
              applyStatusConditionToActivePokemon(
                move.meta.ailment.name as StatusConditionEnum
              )
            );
        const onDismissal = () =>
          user === activePokemon
            ? dispatch(updateOpponentUiState())
            : dispatch(updateActiveUiState());

        logs.push({
          message: `${target.name} was paralyzed!`,
          onDismissal: onDismissal,
        });
      }
    }

    return { logs };
  };
  return { applyStatusConditions };
};
