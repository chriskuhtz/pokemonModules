import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OpponentPokemon } from "../Models/Pokemon";
import { fallbackPokemon } from "../Utils/Constants/fallbackPokemon";

const initialState: { value: OpponentPokemon } = {
  value: fallbackPokemon,
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
