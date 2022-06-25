import { Move } from "../../Models/Move";
import { Stat } from "../../Models/Stat";

export const accuracyCheck = (
  move: Move,
  evasion: Stat,
  accuracy: Stat
): boolean => {
  if (move.accuracy === null) {
    console.log("move cant miss");
    return true;
  }
  const evasionFactor =
    evasion.modifier >= 0
      ? evasion.initial + evasion.initial * 0.5 * evasion.modifier
      : evasion.initial + evasion.initial * 0.15 * evasion.modifier;

  const accuracyFactor =
    accuracy.modifier >= 0
      ? accuracy.initial + accuracy.initial * 0.5 * accuracy.modifier
      : accuracy.initial + accuracy.initial * 0.15 * accuracy.modifier;

  const moveFactor = move.accuracy;
  const adjustedAccuracy = (moveFactor / evasionFactor) * accuracyFactor;

  console.log("accuracyCheck", accuracyCheck);

  return adjustedAccuracy >= move.accuracy;
};
