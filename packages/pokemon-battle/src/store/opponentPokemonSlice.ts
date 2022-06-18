import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
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
  },
};

export const opponentPokemonSlice = createSlice({
  name: "opponentPokemon",
  initialState,
  reducers: {
    setOpponentPokemon: (state, action: PayloadAction<OpponentPokemon>) => {
      state.value = action.payload;
      //console.log("setOpponentPokemon", state.value);
    },
    applyDamageToOpponentPokemon: (state, action: PayloadAction<number>) => {
      if (state.value.hp.current - action.payload > 0) {
        state.value.hp.current -= action.payload;
      } else {
        state.value.hp.current = 0;
      }
      //console.log("applyDamageToOpponentPokemon", state.value);
    },
  },
});

// Action creators are generated for each case reducer function
export const { applyDamageToOpponentPokemon, setOpponentPokemon } =
  opponentPokemonSlice.actions;

export const opponentPokemonReducer = opponentPokemonSlice.reducer;
