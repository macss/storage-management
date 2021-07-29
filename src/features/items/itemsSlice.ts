import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Item } from "../../models";
import Services from "../../services/firebaseServices";
import { InitialState, ModelObj } from "../commonTypes";

// Initial configuration
const itemsAdapter = createEntityAdapter<Item>({
  selectId: (item) => item.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = itemsAdapter.getInitialState<InitialState>({
  status: "idle",
  error: undefined
});

// Thunks
export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  (_, { dispatch }) => {
    Services.listenToDb((data) => {
      dispatch(databaseChanged(data));
    }, "items");
  }
);

// Slice
const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    databaseChanged(state, action: PayloadAction<ModelObj<Item>>) {
      if (action.payload) {
        itemsAdapter.setAll(state, action.payload);
      } else {
        itemsAdapter.removeAll(state);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(fetchItems.rejected, (state, _) => {
      state.status = "failed";
    });
  }
});

export default itemsSlice.reducer;

export const { databaseChanged } = itemsSlice.actions;

// Default Selectors
export const {
  selectAll: selectAllItems,
  selectById: selectItemById,
  selectIds: selectItemsIds
} = itemsAdapter.getSelectors<RootState>((state) => state.items);
