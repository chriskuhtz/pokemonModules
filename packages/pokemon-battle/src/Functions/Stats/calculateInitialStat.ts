export const calculateInitialStat = (
  baseStat: number,
  level: number,
  iv = 0,
  ev = 0
) => {
  //Other Stats = (floor(0.01 x (2 x Base + IV + floor(0.25 x EV)) x Level) + 5) x Nature.

  const calculatedStat =
    Math.floor(0.01 * (2 * baseStat + iv + Math.floor(0.25 * ev)) * level) + 5;

  return calculatedStat;
};

export const calculateInitialHP = (
  baseStat: number,
  level: number,
  iv = 0,
  ev = 0
) => {
  //HP = floor(0.01 x (2 x Base + IV + floor(0.25 x EV)) x Level) + Level + 10.

  const calculatedHP =
    Math.floor(0.01 * (2 * baseStat + iv + Math.floor(0.25 * ev)) * level) +
    level +
    10;
  return calculatedHP;
};
