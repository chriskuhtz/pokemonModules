import { ActivePokemon, OpponentPokemon } from "../../Models/Pokemon";

export const fallbackPokemon: OpponentPokemon | ActivePokemon = {
  name: "nidorino",
  primaryType: "poison",
  level: 10,
  spriteUrl: "",
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
    attack: { initial: 50, modifier: 0 },
    defense: { initial: 50, modifier: 0 },
    specialAttack: { initial: 50, modifier: 0 },
    specialDefense: { initial: 50, modifier: 0 },
    speed: { initial: 50, modifier: 0 },
    evasion: { initial: 1, modifier: 0 },
    accuracy: { initial: 1, modifier: 0 },
  },
};
