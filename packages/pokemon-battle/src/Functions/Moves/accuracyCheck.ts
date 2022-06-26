import { Move } from "../../Models/Move";
import { Stat } from "../../Models/Stat";
import { calculateModifiedStat } from "../Stats/calculateModifiedStat";

export const accuracyCheck = (
  move: Move,
  evasion: Stat,
  accuracy: Stat
): boolean => {
  if (move.accuracy === null) {
    console.log("move cant miss");
    return true;
  }
  const evasionFactor = calculateModifiedStat(evasion);
  const accuracyFactor = calculateModifiedStat(accuracy);
  const moveFactor = move.accuracy;
  const adjustedAccuracy = (moveFactor / evasionFactor) * accuracyFactor;

  return adjustedAccuracy >= Math.random() * 100;
};
