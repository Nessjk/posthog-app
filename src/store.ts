import { configureStore } from "@reduxjs/toolkit";
import windowsReducer from "./features/windows/windowsSlice";

export const store = configureStore({
  reducer: {
    windows: windowsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
