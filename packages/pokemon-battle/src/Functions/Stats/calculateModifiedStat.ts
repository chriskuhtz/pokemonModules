import { Stat } from "../../Models/Stat";

export const calculateModifiedStat = (stat: Stat): number => {
  const modifiedStat =
    stat.modifier >= 0
      ? stat.initial + stat.initial * 0.5 * stat.modifier
      : stat.initial + stat.initial * 0.15 * stat.modifier;
  return modifiedStat;
};
