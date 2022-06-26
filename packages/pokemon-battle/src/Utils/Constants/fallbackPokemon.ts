import { PriorityEnum, TargetEnum } from "../../Models/Move";
import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";

export const fallbackPokemon: OpponentPokemon | ActivePokemon = {
  name: "Fallback",
  primaryType: "poison",
  level: 10,
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
