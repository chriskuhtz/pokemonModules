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
      !target.statusConditions.primaryCondition &&
      move.meta.ailment_chance &&
      move.meta.ailment_chance >= Math.random() * 100
    ) {
      //PARALYSIS
      if (
        !["electric", "ground"].includes(target.primaryType) &&
        !["electric", "ground"].includes(target.secondaryType ?? "") &&
        target.statusConditions.primaryCondition !==
          StatusConditionEnum.PARALYSIS &&
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
      //BURN
      if (
        target.primaryType !== "fire" &&
        target.secondaryType !== "fire" &&
        target.statusConditions.primaryCondition !== StatusConditionEnum.BURN &&
        move.meta.ailment.name === StatusConditionEnum.BURN
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
          message: `${target.name} was burned!`,
          onDismissal: onDismissal,
        });
      }
    }

    return { logs };
  };
  return { applyStatusConditions };
};
