import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Log {
  message: string;
  secondary?: string;
  onDismissal?: Function;
}
export interface logState {
  value: { logs: Log[]; archive: Log[] };
}

const initialState: logState = {
  value: { logs: [], archive: [] },
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<Log>) => {
      state.value.logs.push(action.payload);
    },
    addMultipleLogs: (state, action: PayloadAction<Log[]>) => {
      state.value.logs = state.value.logs.concat(action.payload);
    },
    dismissLog: (state) => {
      state.value.archive = state.value.archive.concat(state.value.logs[0]);
      if (state.value.archive.length > 15) {
        state.value.archive = state.value.archive.slice(-15);
      }
      state.value.logs = state.value.logs.slice(1);
    },
    clearLogs: (state) => {
      state.value.logs = state.value.logs.slice(0, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLog, dismissLog, clearLogs, addMultipleLogs } =
  logSlice.actions;

export const logReducer = logSlice.reducer;
