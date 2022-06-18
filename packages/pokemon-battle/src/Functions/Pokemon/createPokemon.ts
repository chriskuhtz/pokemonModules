import { ActivePokemon, Pokemon } from "../../Models/Pokemon";
import { hasKey } from "../../Utils/hasKey";
import {
  calculateInitialHP,
  calculateInitialStat,
} from "../Stats/calculateInitialStat";

const createPokemon = (
  stats: [{ base_stat: number; stat: { name: string } }],
  pokemon: string,
  level = 5
): Pokemon => {
  const createdPokemon: Pokemon = {
    name: pokemon,
    level: level,
    moves: {
      first: {
        name: "Tackle",
        damage: 35,
        type: "normal",
        moveType: "physical",
        powerPoints: { initial: 35, current: 35 },
        target: "opponent",
      },
      second: {
        name: "Tackle",
        damage: 35,
        type: "steel",
        moveType: "physical",
        powerPoints: { initial: 35, current: 35 },
        target: "opponent",
      },
      third: {
        name: "Tackle",
        damage: 35,
        type: "grass",
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
      attack: { initial: 50, modifier: 1 },
      defense: { initial: 50, modifier: 1 },
      specialAttack: { initial: 50, modifier: 1 },
      specialDefense: { initial: 50, modifier: 1 },
      speed: { initial: 50, modifier: 1 },
      evasion: { initial: 1, modifier: 1 },
      accuracy: { initial: 1, modifier: 1 },
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
          modifier: 1,
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
  level = 100
): ActivePokemon => {
  const createdPokemon = createPokemon(stats, pokemon, level);
  return { ...createdPokemon, spriteUrl: spriteUrl };
};

export const createOpponentPokemon = (
  stats: [{ base_stat: number; stat: { name: string } }],
  spriteUrl: string,
  pokemon: string,
  level = 100
): ActivePokemon => {
  const createdPokemon = createPokemon(stats, pokemon, level);
  return { ...createdPokemon, spriteUrl: spriteUrl };
};
