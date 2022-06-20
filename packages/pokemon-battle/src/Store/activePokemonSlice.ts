import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivePokemon } from "../Models/Pokemon";
import { StatChange } from "../Models/Stat";
import { fallbackPokemon } from "../Utils/Constants/fallbackPokemon";
import { hasKey } from "../Utils/hasKey";

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
    applyStatChangeToActivePokemon: (
      state,
      action: PayloadAction<StatChange>
    ) => {
      action.payload.stats.forEach((s) => {
        if (hasKey(state.value.stats, s)) {
          if (state.value.stats[s].modifier + action.payload.modifier < -6) {
            state.value.stats[s].modifier = -6;
          } else if (
            state.value.stats[s].modifier + action.payload.modifier >
            6
          ) {
            state.value.stats[s].modifier = 6;
          } else {
            state.value.stats[s].modifier += action.payload.modifier;
          }
        } else console.error("what kind of stat is this", s);
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  applyDamageToActivePokemon,
  setActivePokemon,
  applyStatChangeToActivePokemon,
} = activePokemonSlice.actions;

export const activePokemonReducer = activePokemonSlice.reducer;
