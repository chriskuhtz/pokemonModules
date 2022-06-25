import { useDispatch, useSelector } from "react-redux";
import { Move, TargetEnum } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import { StatChange } from "../../Models/Stat";
import {
  applyStatChangeToActivePokemon,
  updateActiveUiState,
} from "../../Store/activePokemonSlice";
import { Log } from "../../Store/logSlice";
import {
  applyStatChangeToOpponentPokemon,
  updateOpponentUiState,
} from "../../Store/opponentPokemonSlice";
import { RootState } from "../../Store/store";
import { hasKey } from "../../Utils/hasKey";

export const useApplyStatChange = () => {
  const dispatch = useDispatch();

  const activePokemon: ActivePokemon = useSelector(
    (state: RootState) => state.activePokemon.value
  );
  const opponentPokemon: OpponentPokemon = useSelector(
    (state: RootState) => state.opponentPokemon.value
  );
  const applyStatChange = (
    move: Move,
    user: ActivePokemon | OpponentPokemon,
    target: ActivePokemon | OpponentPokemon
  ): { logs: Log[] } => {
    const logs: Log[] = [];
    if (move.statChange && move.statChange.target === TargetEnum.SELF) {
      const onDismissal = () =>
        user === activePokemon
          ? dispatch(updateActiveUiState())
          : dispatch(updateOpponentUiState());

      move.statChange.stats.forEach((s) => {
        if (move.statChange && hasKey(user.stats, s)) {
          if (user.stats[s].modifier === -6) {
            logs.push({
              message: `${user.name}'s ${s} wont go lower. `,
            });
          } else if (user.stats[s].modifier === 6) {
            logs.push({
              message: `${user.name}'s ${s} wont go higher. `,
            });
          } else {
            //dispatch the statChange to the store value
            const statChange = { ...move.statChange, stats: [s] } as StatChange;
            if (user === activePokemon) {
              console.log("apply the statchange to user");
              dispatch(applyStatChangeToActivePokemon(statChange));
            } else if (user === opponentPokemon) {
              console.log("apply the statchange to oppo");
              dispatch(applyStatChangeToOpponentPokemon(statChange));
            }

            logs.push({
              message: `${user.name} ${
                move.statChange && move.statChange.modifier > 0
                  ? "raised"
                  : "lowered"
              } its ${s}. `,
              //update the ui after the log is dismissed
              onDismissal: () => onDismissal(),
            });
          }
        }
      });
    } else if (
      move.statChange &&
      move.statChange.target === TargetEnum.TARGET
    ) {
      const onDismissal = () =>
        target === activePokemon
          ? dispatch(updateActiveUiState())
          : dispatch(updateOpponentUiState());

      move.statChange.stats.forEach((s) => {
        if (move.statChange && hasKey(target.stats, s)) {
          if (target.stats[s].modifier === -6) {
            logs.push({
              message: `${target.name}'s ${s} wont go lower. `,
            });
          } else if (target.stats[s].modifier === 6) {
            logs.push({
              message: `${target.name}'s ${s} wont go higher. `,
            });
          } else {
            //dispatch the statChange to the store value
            const statChange = { ...move.statChange, stats: [s] } as StatChange;
            if (target === activePokemon) {
              console.log("apply the statchange to user");
              dispatch(applyStatChangeToActivePokemon(statChange));
            } else if (target === opponentPokemon) {
              console.log("apply the statchange to oppo");
              dispatch(applyStatChangeToOpponentPokemon(statChange));
            }

            logs.push({
              message: `${user.name} ${
                move.statChange && move.statChange.modifier > 0
                  ? "raised"
                  : "lowered"
              } the opponents ${s}. `,
              //update the ui after the log is dismissed
              onDismissal: () => onDismissal(),
            });
          }
        }
      });
    }
    return { logs: logs };
  };

  return { applyStatChange };
};
