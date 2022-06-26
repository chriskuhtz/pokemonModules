import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { OpponentPokemon } from "../Models/Pokemon";
import { StatChange } from "../Models/Stat";
import { StatusConditionEnum } from "../Models/StatusConditions";
import { fallbackPokemon } from "../Utils/Constants/fallbackPokemon";
import { hasKey } from "../Utils/hasKey";

const initialState: { value: OpponentPokemon; uiState: OpponentPokemon } = {
  value: fallbackPokemon,
  uiState: fallbackPokemon,
};

export const opponentPokemonSlice = createSlice({
  name: "opponentPokemon",
  initialState,
  reducers: {
    setOpponentPokemon: (state, action: PayloadAction<OpponentPokemon>) => {
      state.value = action.payload;
    },
    applyDamageToOpponentPokemon: (state, action: PayloadAction<number>) => {
      if (state.value.hp.current - action.payload > 0) {
        state.value.hp.current -= action.payload;
      } else {
        state.value.hp.current = 0;
      }
    },
    applyStatChangeToOpponentPokemon: (
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
    applyStatusConditionToOpponentPokemon: (
      state,
      action: PayloadAction<StatusConditionEnum>
    ) => {
      if (action.payload === StatusConditionEnum.PARALYSIS) {
        state.value.statusConditions.paralyzed = true;
      }
    },
    updateOpponentUiState: (state) => {
      state.uiState = state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  applyDamageToOpponentPokemon,
  setOpponentPokemon,
  applyStatChangeToOpponentPokemon,
  applyStatusConditionToOpponentPokemon,
  updateOpponentUiState,
} = opponentPokemonSlice.actions;

export const opponentPokemonReducer = opponentPokemonSlice.reducer;
