import { useDispatch, useSelector } from "react-redux";
import { Move } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import { StatusConditionEnum } from "../../Models/StatusConditions";
import { applyStatusConditionToActivePokemon } from "../../Store/activePokemonSlice";
import { Log } from "../../Store/logSlice";
import { applyStatusConditionToOpponentPokemon } from "../../Store/opponentPokemonSlice";
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
    console.log(move);
    const logs: Log[] = [];

    const willHit =
      move.meta.ailment_chance === 0 ||
      (move.meta.ailment_chance &&
        move.meta.ailment_chance >= Math.random() * 100);

    console.log(willHit);
    if (!target.statusConditions.primaryCondition && willHit) {
      //PARALYSIS
      if (
        !["electric", "ground"].includes(target.primaryType) &&
        !["electric", "ground"].includes(target.secondaryType ?? "") &&
        move.meta.ailment.name === StatusConditionEnum.PARALYSIS
      ) {
        const onDismissal = () =>
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
        logs.push({
          message: `${target.name} was paralyzed!`,
          onDismissal: onDismissal,
        });
      }
      //BURN
      if (
        target.primaryType !== "fire" &&
        target.secondaryType !== "fire" &&
        move.meta.ailment.name === StatusConditionEnum.BURN
      ) {
        const onDismissal = () =>
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

        logs.push({
          message: `${target.name} was burned!`,
          onDismissal: onDismissal,
        });
      }
      //POISON
      if (
        !["poison", "steel"].includes(target.primaryType) &&
        !["poison", "steel"].includes(target.secondaryType ?? "") &&
        move.meta.ailment.name === StatusConditionEnum.POISON
      ) {
        const onDismissal = () =>
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

        logs.push({
          message: `${target.name} was poisoned!`,
          onDismissal: onDismissal,
        });
      }
      //SLEEP
      if (move.meta.ailment.name === StatusConditionEnum.SLEEP) {
        const onDismissal = () =>
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

        logs.push({
          message: `${target.name} fell asleep!`,
          onDismissal: onDismissal,
        });
      }
    }

    return { logs };
  };
  return { applyStatusConditions };
};
