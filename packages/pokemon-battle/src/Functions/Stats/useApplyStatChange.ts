import { useDispatch, useSelector } from "react-redux";
import { Move, TargetEnum } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";
import { StatChange } from "../../Models/Stat";
import { applyStatChangeToActivePokemon } from "../../Store/activePokemonSlice";
import { Log } from "../../Store/logSlice";
import { applyStatChangeToOpponentPokemon } from "../../Store/opponentPokemonSlice";
import { RootState } from "../../Store/store";
import { hasKey } from "../../Utils/hasKey";

export const useApplyStatChange = () => {
  const fallBackStatChange: StatChange = {
    stats: [],
    modifier: 0,
    chance: 0,
    target: TargetEnum.USER,
  };
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
    if (move.statChange && move.statChange.target === TargetEnum.USER) {
      const onDismissal = (statChange: StatChange) =>
        user === activePokemon
          ? dispatch(applyStatChangeToActivePokemon(statChange))
          : dispatch(applyStatChangeToOpponentPokemon(statChange));

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
            logs.push({
              message: `${user.name} ${
                move.statChange && move.statChange.modifier > 0
                  ? "raised"
                  : "lowered"
              } its ${s}. `,
              onDismissal: () =>
                onDismissal({ ...move.statChange, stats: [s] } as StatChange),
            });
          }
        }
      });
    } else if (move.statChange && move.statChange.target === "opponent") {
      const onDismissal = (statChange: StatChange) =>
        target === activePokemon
          ? dispatch(applyStatChangeToActivePokemon(statChange))
          : dispatch(applyStatChangeToOpponentPokemon(statChange));

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
            logs.push({
              message: `${user.name} ${
                move.statChange && move.statChange.modifier > 0
                  ? "raised"
                  : "lowered"
              } the opponents ${s}. `,
              onDismissal: () =>
                onDismissal({ ...move.statChange, stats: [s] } as StatChange),
            });
          }
        }
      });
    }
    return { logs: logs };
  };

  return { applyStatChange };
};
