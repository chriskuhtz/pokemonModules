import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Log {
  message: string;
  secondary?: string;
  onDismissal?: Function;
}
export interface logState {
  value: Log[];
}

const initialState: logState = {
  value: [],
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<Log>) => {
      state.value.push(action.payload);
    },
    addMultipleLogs: (state, action: PayloadAction<Log[]>) => {
      state.value = state.value.concat(action.payload);
    },
    dismissLog: (state) => {
      state.value = state.value.slice(1);
    },
    clearLogs: (state) => {
      state.value = state.value.slice(0, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLog, dismissLog, clearLogs, addMultipleLogs } =
  logSlice.actions;

export const logReducer = logSlice.reducer;
