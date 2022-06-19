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
      //console.log("addLog", state.value);
    },
    dismissLog: (state) => {
      state.value = state.value.slice(1);
      //console.log("dismissLog", state.value);
    },
    clearLogs: (state) => {
      state.value = state.value.slice(0, 1);
      //console.log("clearLogs", state.value);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLog, dismissLog, clearLogs } = logSlice.actions;

export const logReducer = logSlice.reducer;
