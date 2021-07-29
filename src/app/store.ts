import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {
  compartmentsReducer,
  depositsReducer,
  historiesReducer,
  itemsReducer,
  usersReducer
} from "../features";

export const store = configureStore({
  reducer: {
    deposits: depositsReducer,
    compartments: compartmentsReducer,
    histories: historiesReducer,
    items: itemsReducer,
    users: usersReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
