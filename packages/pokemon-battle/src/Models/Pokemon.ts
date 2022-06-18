import { Move } from "./Move";
import { HPStat, Stats } from "./Stat";

export interface Pokemon {
  name: string;
  level: number;
  moves: PokemonMoveSet;
  hp: HPStat;
  stats: Stats;
}

export interface PokemonMoveSet {
  first: Move;
  second?: Move;
  third?: Move;
  fourth?: Move;
}

export interface ActivePokemon extends Pokemon {
  spriteUrl: string;
}

export interface OpponentPokemon extends Pokemon {
  spriteUrl: string;
}

export interface WildPokemon extends Pokemon {
  spriteUrl: string;
}
