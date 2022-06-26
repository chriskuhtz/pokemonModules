import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { OpponentPokemon } from "../Models/Pokemon";
import { StatChange } from "../Models/Stat";
import { StatusConditionEnum } from "../Models/StatusConditions";
import { fallbackPokemon } from "../Utils/Constants/fallbackPokemon";
import { hasKey } from "../Utils/hasKey";

const initialState: { value: OpponentPokemon } = {
  value: fallbackPokemon,
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
      console.log(current(state.value));
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
      state.value.statusConditions.primaryCondition = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  applyDamageToOpponentPokemon,
  setOpponentPokemon,
  applyStatChangeToOpponentPokemon,
  applyStatusConditionToOpponentPokemon,
} = opponentPokemonSlice.actions;

export const opponentPokemonReducer = opponentPokemonSlice.reducer;
