import { Move } from "./Move";
import { HPStat, Stat } from "./Stat";

export interface Pokemon {
  name: string;
  moves: PokemonMoveSet;
  stats: {
    hp: HPStat;
    attack: Stat;
    defense: Stat;
    specialAttack: Stat;
    specialDefense: Stat;
    speed: Stat;
    accuracy: Stat;
    evasion: Stat;
  };
}

export interface PokemonMoveSet {
  first: Move;
  second?: Move;
  third?: Move;
  fourth?: Move;
}

export interface PlayerPokemon extends Pokemon {
  spriteUrl: string;
}

export interface OpponentPokemon extends Pokemon {
  spriteUrl: string;
}

export interface WildPokemon extends Pokemon {
  spriteUrl: string;
}
