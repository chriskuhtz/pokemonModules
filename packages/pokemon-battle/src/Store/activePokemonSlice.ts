import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivePokemon } from "../Models/Pokemon";
import { StatChange } from "../Models/Stat";
import { StatusConditionEnum } from "../Models/StatusConditions";
import { fallbackPokemon } from "../Utils/Constants/fallbackPokemon";
import { hasKey } from "../Utils/hasKey";

const initialState: { value: ActivePokemon; uiState: ActivePokemon } = {
  value: fallbackPokemon,
  uiState: fallbackPokemon,
};

export const activePokemonSlice = createSlice({
  name: "activePokemon",
  initialState,
  reducers: {
    setActivePokemon: (state, action: PayloadAction<ActivePokemon>) => {
      state.value = action.payload;
    },
    applyDamageToActivePokemon: (state, action: PayloadAction<number>) => {
      if (state.value.hp.current - action.payload > 0) {
        state.value.hp.current -= action.payload;
      } else {
        state.value.hp.current = 0;
      }
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
    applyStatusConditionToActivePokemon: (
      state,
      action: PayloadAction<StatusConditionEnum>
    ) => {
      if (action.payload === StatusConditionEnum.PARALYSIS) {
        state.value.statusConditions.paralyzed = true;
      }
    },
    updateActiveUiState: (state) => {
      state.uiState = state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  applyDamageToActivePokemon,
  setActivePokemon,
  applyStatChangeToActivePokemon,
  applyStatusConditionToActivePokemon,
  updateActiveUiState,
} = activePokemonSlice.actions;

export const activePokemonReducer = activePokemonSlice.reducer;
