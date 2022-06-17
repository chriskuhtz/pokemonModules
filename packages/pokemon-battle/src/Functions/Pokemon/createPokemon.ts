import { PlayerPokemon, Pokemon } from "../../Models/Pokemon";
import { HPStat, Stat } from "../../Models/Stat";
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
    moves: {
      first: {
        name: "Tackle",
        damage: 35,
        type: "normal",
        moveType: "physical",
        powerPoints: { initial: 35, current: 35 },
      },
      second: {
        name: "Tackle",
        damage: 35,
        type: "steel",
        moveType: "physical",
        powerPoints: { initial: 35, current: 35 },
      },
      third: {
        name: "Tackle",
        damage: 35,
        type: "grass",
        moveType: "physical",
        powerPoints: { initial: 35, current: 35 },
      },
      fourth: {
        name: "Tackle",
        damage: 35,
        type: "electric",
        moveType: "physical",
        powerPoints: { initial: 35, current: 35 },
      },
    },
    stats: {
      hp: { current: 50, initial: 50 },
      attack: { current: 50, initial: 50, modifier: 1 },
      defense: { current: 50, initial: 50, modifier: 1 },
      specialAttack: { current: 50, initial: 50, modifier: 1 },
      specialDefense: { current: 50, initial: 50, modifier: 1 },
      speed: { current: 50, initial: 50, modifier: 1 },
      evasion: { current: 1, initial: 1, modifier: 1 },
      accuracy: { current: 1, initial: 1, modifier: 1 },
    },
  };

  // calculate the stats according to the level
  const formattedStats = stats.map((s) => {
    return { key: s.stat.name, value: s.base_stat };
  });
  const calculatedStats = formattedStats.map((s) => {
    if (s.key === "hp") {
      const calculatedHP = calculateInitialHP(s.value, level);
      return {
        key: s.key,
        value: { current: calculatedHP, max: calculatedHP },
      };
    } else {
      const calculatedStat = calculateInitialStat(s.value, level);
      return {
        key: s.key,
        value: {
          current: calculatedStat,
          initial: calculatedStat,
          modifier: 1,
        },
      };
    }
  });

  calculatedStats.forEach((s) => {
    s.key === "hp" &&
      hasKey(createdPokemon.stats, s.key) &&
      (createdPokemon.stats[s.key] = s.value as Stat);
  });

  return createdPokemon;
};

export const createPlayerPokemon = (
  stats: [{ base_stat: number; stat: { name: string } }],
  spriteUrl: string,
  pokemon: string,
  level = 5
): PlayerPokemon => {
  const createdPokemon = createPokemon(stats, pokemon, level);
  return { ...createdPokemon, spriteUrl: spriteUrl };
};

export const createOpponentPokemon = (
  stats: [{ base_stat: number; stat: { name: string } }],
  spriteUrl: string,
  pokemon: string,
  level = 5
): PlayerPokemon => {
  const createdPokemon = createPokemon(stats, pokemon, level);
  return { ...createdPokemon, spriteUrl: spriteUrl };
};
