import { TargetEnum } from "./Move";

export interface Stat {
  initial: number;
  modifier: -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export interface HPStat {
  current: number;
  initial: number;
}

export interface Stats {
  attack: Stat;
  defense: Stat;
  specialAttack: Stat;
  specialDefense: Stat;
  speed: Stat;
  accuracy: Stat;
  evasion: Stat;
}

export interface StatChange {
  stats: string[];
  modifier: number;
  chance: number;
  target: TargetEnum;
}
