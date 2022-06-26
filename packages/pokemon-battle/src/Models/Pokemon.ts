import { Move } from "./Move";
import { HPStat, Stats } from "./Stat";
import { StatusConditions } from "./StatusConditions";

export interface Pokemon {
  name: string;
  primaryType: string;
  secondaryType?: string;
  level: number;
  moves: PokemonMoveSet;
  hp: HPStat;
  stats: Stats;
  statusConditions: StatusConditions;
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
