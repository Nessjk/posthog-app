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

// In the openWindow action, replace the hardcoded values with:
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

// bit random width and height based on the viewport size just so that the window doesn't take up the whole screen nor doesn't look smushed
const defaultWidth = Math.min(800, Math.max(520, viewportWidth * 0.6));
const defaultHeight = Math.min(600, Math.max(360, viewportHeight * 0.7));

const windowsSlice = createSlice({
  name: "windows",
  initialState,
  reducers: {
    openWindow(state, action: PayloadAction<{ itemId: string }>) {
      const id = action.payload.itemId; // one window per item
      if (!state.byId[id]) {
        // Calculate position to avoid overlap
        const existingWindows = Object.values(state.byId);
        const offset = 30; // pixels to offset each new window
        const baseX = 60;
        const baseY = 60;

        // Calculate new position based on number of existing windows
        const newX = baseX + existingWindows.length * offset;
        const newY = baseY + existingWindows.length * offset;

        // Ensure window stays within viewport bounds
        const maxX = viewportWidth - defaultWidth;
        const maxY = viewportHeight - defaultHeight;

        state.byId[id] = {
          id,
          itemId: id,
          x: Math.min(newX, maxX),
          y: Math.min(newY, maxY),
          z: Date.now(),
          width: defaultWidth,
          height: defaultHeight,
          focused: true,
        };
      }
      Object.values(state.byId).forEach((w) => (w.focused = w.id === id));
    },
    closeWindow(state, action: PayloadAction<{ id: string }>) {
      delete state.byId[action.payload.id];
    },

    resizeWindow(
      state,
      action: PayloadAction<{ id: string; width: number; height: number }>
    ) {
      const w = state.byId[action.payload.id];
      if (!w) return;
      w.width = action.payload.width;
      w.height = action.payload.height;
    },
    focusWindow(state, action: PayloadAction<{ id: string }>) {
      const w = state.byId[action.payload.id];

      if (!w) return;
      w.focused = true;

      // In focusWindow, find the highest existing z and add 1
      const maxZ = Math.max(...Object.values(state.byId).map((w) => w.z), 0);
      w.z = maxZ + 1;
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
