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
  target: "self" | "opponent";
}

export enum StatEnum {
  "minusSix" = 0.14,
  "minusFive" = 0.28,
  "minusFour" = 0.42,
  "minusThree" = 0.56,
  "minusTwo" = 0.7,
  "minusOne" = 0.85,
  "base" = 1,
  "plusOne" = 1.5,
  "plusTwo" = 2,
  "plusThree" = 2.5,
  "plusFour" = 3,
  "plusFive" = 3.5,
  "plusSix" = 4,
}
