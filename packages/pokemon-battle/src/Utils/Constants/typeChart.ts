export interface TypeEffectiveness {
  super: string[];
  notvery: string[];
  noEffect: string[];
}

export interface TypeChart {
  normal: TypeEffectiveness;
  fire: TypeEffectiveness;
  water: TypeEffectiveness;
  electric: TypeEffectiveness;
  grass: TypeEffectiveness;
  ice: TypeEffectiveness;
  fighting: TypeEffectiveness;
  poison: TypeEffectiveness;
  ground: TypeEffectiveness;
  flying: TypeEffectiveness;
  psychic: TypeEffectiveness;
  bug: TypeEffectiveness;
  rock: TypeEffectiveness;
  ghost: TypeEffectiveness;
  dragon: TypeEffectiveness;
  dark: TypeEffectiveness;
  steel: TypeEffectiveness;
  fairy: TypeEffectiveness;
}

export const typeChart = {
  normal: { super: [], notvery: ["rock", "steel"], noEffect: ["ghost"] },
  fire: {
    super: ["grass", "ice", "bug", "steel"],
    notvery: ["fire", "water", "rock", "dragon"],
    noEffect: [],
  },
  water: {
    super: ["fire", "rock"],
    notvery: ["grass", "water", "dragon"],
    noEffect: [],
  },
  electric: {
    super: ["flying", "water"],
    notvery: ["steel", "dragon", "grass"],
    noEffect: ["ground"],
  },
  grass: {
    super: ["rock", "water", "ground"],
    notvery: ["poison", "fire", "grass", "flying", "bug", "dragon"],
    noEffect: [],
  },
  ice: {
    super: ["flying", "ground", "dragon", "grass"],
    notvery: ["water", "fire", "ice", "steel"],
    noEffect: [],
  },
  fighting: {
    super: ["normal", "rock", "dark", "steel", "ice"],
    notvery: ["poison", "psychic", "fairy", "flying", "bug"],
    noEffect: ["ghost"],
  },
  poison: {
    super: ["grass", "fairy"],
    notvery: ["poison", "ground", "rock", "ghost"],
    noEffect: ["steel"],
  },
  ground: {
    super: ["electric", "poison", "rock", "steel", "fire"],
    notvery: ["grass", "bug"],
    noEffect: ["flying"],
  },
  flying: {
    super: ["fighting", "grass", "bug"],
    notvery: ["steel", "rock", "electric"],
    noEffect: [],
  },
  psychic: {
    super: ["poison", "fighting"],
    notvery: ["steel", "psychic"],
    noEffect: ["dark"],
  },
  bug: {
    super: ["grass", "psychic", "dark"],
    notvery: [
      "fire",
      "fighting",
      "poison",
      "flying",
      "ghost",
      "steel",
      "fairy",
    ],
    noEffect: [],
  },
  rock: {
    super: ["flying", "fire", "bug", "ice"],
    notvery: ["steel", "fighting", "steel"],
    noEffect: [],
  },
  ghost: {
    super: ["psychic", "ghost"],
    notvery: ["dark"],
    noEffect: ["normal"],
  },
  dragon: {
    super: ["dragon"],
    notvery: ["steel"],
    noEffect: ["fairy"],
  },
  dark: {
    super: ["psychic", "ghost"],
    notvery: ["fighting", "dark", "fairy"],
    noEffect: [],
  },
  steel: {
    super: ["ice", "rock", "fairy"],
    notvery: ["fire", "water", "electric", "steel"],
    noEffect: [],
  },
  fairy: {
    super: ["fighting", "dragon", "dark"],
    notvery: ["steel", "fire", "poison"],
    noEffect: [],
  },
};
