import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OpponentPokemon } from "../Models/Pokemon";

const initialState: { value: OpponentPokemon } = {
  value: {
    name: "nidorino",
    level: 10,
    spriteUrl: "",
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
  },
};

export const opponentPokemonSlice = createSlice({
  name: "opponentPokemon",
  initialState,
  reducers: {
    setOpponentPokemon: (state, action: PayloadAction<OpponentPokemon>) => {
      state.value = action.payload;
    },
    applyDamageToOpponentPokemon: (state, action: PayloadAction<number>) => {
      state.value.hp.current -= action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { applyDamageToOpponentPokemon, setOpponentPokemon } =
  opponentPokemonSlice.actions;

export const opponentPokemonReducer = opponentPokemonSlice.reducer;
