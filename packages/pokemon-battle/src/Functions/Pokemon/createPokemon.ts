import { ActivePokemon, Pokemon } from "../../Models/Pokemon";
import { hasKey } from "../../Utils/hasKey";
import {
  calculateInitialHP,
  calculateInitialStat,
} from "../Stats/calculateInitialStat";

const createPokemon = (
  stats: [{ base_stat: number; stat: { name: string } }],
  pokemon: string,
  level = 5,
  primaryType: string,
  secondaryType?: string
): Pokemon => {
  const createdPokemon: Pokemon = {
    name: pokemon,
    primaryType: primaryType,
    secondaryType: secondaryType,
    level: level,
    moves: {
      first: {
        name: "Howl",
        statChange: {
          stats: ["attack", "defense", "speed", "specialAttack"],
          modifier: 1,
          chance: 1,
          target: "self",
        },
        type: "normal",
        moveType: "stat",
        powerPoints: { initial: 35, current: 35 },
        target: "self",
      },
      second: {
        name: "Leer",
        statChange: {
          stats: ["defense"],
          modifier: -6,
          chance: 1,
          target: "opponent",
        },
        type: "normal",
        moveType: "stat",
        powerPoints: { initial: 35, current: 35 },
        target: "opponent",
      },
      third: {
        name: "Metal Claw",
        statChange: {
          stats: ["attack"],
          modifier: 1,
          chance: 0.3,
          target: "self",
        },
        damage: 35,
        type: "steel",
        moveType: "physical",
        powerPoints: { initial: 35, current: 35 },
        target: "opponent",
      },
      fourth: {
        name: "Tackle",
        damage: 35,
        type: "electric",
        moveType: "physical",
        powerPoints: { initial: 35, current: 35 },
        target: "opponent",
      },
    },
    hp: { current: 50, initial: 50 },
    stats: {
      attack: { initial: 50, modifier: 0 },
      defense: { initial: 50, modifier: 0 },
      specialAttack: { initial: 50, modifier: 0 },
      specialDefense: { initial: 50, modifier: 0 },
      speed: { initial: 50, modifier: 0 },
      evasion: { initial: 1, modifier: 0 },
      accuracy: { initial: 1, modifier: 0 },
    },
  };

  // calculate the stats according to the level
  const formattedStats = stats.map((s) => {
    return { key: s.stat.name, value: s.base_stat };
  });
  const calculatedStats = formattedStats.map((s) => {
    if (s.key === "hp") {
      const calculatedHP = calculateInitialHP(s.value, level);
      createdPokemon.hp = {
        current: calculatedHP,
        initial: calculatedHP,
      };
    } else {
      const calculatedStat = calculateInitialStat(s.value, level);
      if (hasKey(createdPokemon.stats, s.key)) {
        createdPokemon.stats[s.key] = {
          initial: calculatedStat,
          modifier: 0,
        };
      }
    }
  });

  return createdPokemon;
};

export const createActivePokemon = (
  stats: [{ base_stat: number; stat: { name: string } }],
  spriteUrl: string,
  pokemon: string,
  types: { slot: number; type: { name: string } }[],
  level = 100
): ActivePokemon => {
  const createdPokemon = createPokemon(
    stats,
    pokemon,
    level,
    types[0].type.name,
    types[1].type.name
  );
  return { ...createdPokemon, spriteUrl: spriteUrl };
};

export const createOpponentPokemon = (
  stats: [{ base_stat: number; stat: { name: string } }],
  spriteUrl: string,
  pokemon: string,
  types: { slot: number; type: { name: string } }[],
  level = 100
): ActivePokemon => {
  const createdPokemon = createPokemon(
    stats,
    pokemon,
    level,
    types[0].type.name,
    types[1].type.name
  );
  return { ...createdPokemon, spriteUrl: spriteUrl };
};
