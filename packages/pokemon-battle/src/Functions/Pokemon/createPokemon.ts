import {
  LoadedMove,
  LoadedOpponentTargets,
  PriorityEnum,
  TargetEnum,
} from "../../Models/Move";
import { ActivePokemon, OpponentPokemon, Pokemon } from "../../Models/Pokemon";
import { StatusConditionEnum } from "../../Models/StatusConditions";
import { hasKey } from "../../Utils/hasKey";
import {
  calculateInitialHP,
  calculateInitialStat,
} from "../Stats/calculateInitialStat";

const createPokemon = (
  stats: [{ base_stat: number; stat: { name: string } }],
  name: string,
  level = 5,
  moves: LoadedMove[],
  primaryType: string,
  secondaryType?: string
): Pokemon => {
  const createdPokemon: ActivePokemon | OpponentPokemon = {
    name: name,
    primaryType: primaryType,
    secondaryType: secondaryType,
    level: level,
    spriteUrl: "",
    moves: {
      first: {
        name: "tackle",
        power: 40,

        type: "normal",
        powerPoints: { initial: 35, current: 35 },
        damage_class: "physical",
        target: TargetEnum.TARGET,
        priority: PriorityEnum.STANDARD,
        accuracy: 100,
        meta: {
          max_hits: null,
          min_hits: null,
          max_turns: null,
          min_turns: null,
          ailment: { name: "none" },
          ailment_chance: 0,
          crit_rate: 0,
          flinch_chance: 0,
          drain: 0,
          healing: 0,
          stat_chance: 0,
        },
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
    statusConditions: {},
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
  const formatMoves = () => {
    return moves.map((m: LoadedMove) => {
      return {
        name: m.name,
        power: m.power,
        statChange:
          m.stat_changes.length > 0
            ? {
                target:
                  LoadedOpponentTargets.includes(m.target.name) &&
                  m.meta.category?.name !== "damage+raise"
                    ? TargetEnum.TARGET
                    : TargetEnum.SELF,
                chance: m.meta.stat_chance,
                modifier: m.stat_changes[0].change,
                stats: m.stat_changes.map((s) => s.stat.name),
              }
            : undefined,
        type: m.type.name,
        powerPoints: { initial: m.pp, current: m.pp },
        damage_class: m.damage_class.name,
        target: LoadedOpponentTargets.includes(m.target.name)
          ? TargetEnum.TARGET
          : TargetEnum.SELF,
        priority: m.priority,
        accuracy: m.accuracy,
        meta: m.meta,
      };
    });
  };

  const formattedMoves = formatMoves();
  createdPokemon.moves.first = formattedMoves[0];
  if (formattedMoves[1]) {
    createdPokemon.moves.second = formattedMoves[1];
  }
  if (formattedMoves[2]) {
    createdPokemon.moves.third = formattedMoves[2];
  }
  if (formattedMoves[3]) {
    createdPokemon.moves.fourth = formattedMoves[3];
  }
  return createdPokemon;
};

export const createActivePokemon = (
  stats: [{ base_stat: number; stat: { name: string } }],
  spriteUrl: string,
  pokemon: string,
  types: { slot: number; type: { name: string } }[],
  moves: LoadedMove[],
  level = 100
): ActivePokemon => {
  const createdPokemon = createPokemon(
    stats,
    pokemon,
    level,
    moves,
    types[0].type.name,
    types[1]?.type?.name ?? undefined
  );
  return { ...createdPokemon, spriteUrl: spriteUrl };
};

export const createOpponentPokemon = (
  stats: [{ base_stat: number; stat: { name: string } }],
  spriteUrl: string,
  pokemon: string,
  types: { slot: number; type: { name: string } }[],
  moves: LoadedMove[],
  level = 100
): ActivePokemon => {
  const createdPokemon = createPokemon(
    stats,
    pokemon,
    level,
    moves,
    types[0].type.name,
    types[1]?.type?.name ?? undefined
  );
  return { ...createdPokemon, spriteUrl: spriteUrl };
};
