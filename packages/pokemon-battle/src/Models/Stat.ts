export interface Stat {
  initial: number;
  modifier: 0.17 | 0.33 | 0.5 | 0.67 | 0.83 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4;
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
