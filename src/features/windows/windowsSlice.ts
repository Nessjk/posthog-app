import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type WindowState = {
  id: string;
  itemId: string;
  x: number;
  y: number;
  z: number;
  width: number;
  height: number;
  focused: boolean;
};

type WindowsState = { byId: Record<string, WindowState> };
const initialState: WindowsState = { byId: {} };

const windowsSlice = createSlice({
  name: "windows",
  initialState,
  reducers: {
    openWindow(state, action: PayloadAction<{ itemId: string }>) {
      const id = action.payload.itemId; // one window per item
      if (!state.byId[id]) {
        state.byId[id] = {
          id,
          itemId: id,
          x: 60,
          y: 60,
          z: Date.now(),
          width: 520,
          height: 360,
          focused: true,
        };
      }
      Object.values(state.byId).forEach((w) => (w.focused = w.id === id));
    },
    closeWindow(state, action: PayloadAction<{ id: string }>) {
      delete state.byId[action.payload.id];
    },
    focusWindow(state, action: PayloadAction<{ id: string }>) {
      const w = state.byId[action.payload.id];
      if (!w) return;
      w.focused = true;
      w.z = Date.now();
      Object.values(state.byId).forEach((other) => {
        if (other.id !== w.id) other.focused = false;
      });
    },
    moveWindow(
      state,
      action: PayloadAction<{ id: string; x: number; y: number }>
    ) {
      const w = state.byId[action.payload.id];
      if (!w) return;
      w.x = action.payload.x;
      w.y = action.payload.y;
    },
  },
});

export const { openWindow, closeWindow, focusWindow, moveWindow } =
  windowsSlice.actions;
export default windowsSlice.reducer;
