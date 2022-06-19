import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivePokemon } from "../Models/Pokemon";
import { fallbackPokemon } from "../Utils/Constants/fallbackPokemon";

const initialState: { value: ActivePokemon } = {
  value: fallbackPokemon,
};

export const activePokemonSlice = createSlice({
  name: "activePokemon",
  initialState,
  reducers: {
    setActivePokemon: (state, action: PayloadAction<ActivePokemon>) => {
      state.value = action.payload;
      //console.log("setActivePokemon", state.value);
    },
    applyDamageToActivePokemon: (state, action: PayloadAction<number>) => {
      if (state.value.hp.current - action.payload > 0) {
        state.value.hp.current -= action.payload;
      } else {
        state.value.hp.current = 0;
      }
      //console.log("applyDamageToActivePokemon", state.value);
    },
  },
});

// Action creators are generated for each case reducer function
export const { applyDamageToActivePokemon, setActivePokemon } =
  activePokemonSlice.actions;

export const activePokemonReducer = activePokemonSlice.reducer;
