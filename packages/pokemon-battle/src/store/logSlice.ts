import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface logState {
  value: string[];
}

const initialState: logState = {
  value: [],
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<string>) => {
      state.value.push(action.payload);
    },
    removeLog: (state) => {
      state.value = state.value.slice(1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLog, removeLog } = logSlice.actions;

export const logReducer = logSlice.reducer;
