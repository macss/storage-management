import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Compartment, Item } from "../../models";
import FirebaseServices from "../../services/firebaseServices";
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
    FirebaseServices.listenToDb((data) => {
      dispatch(databaseChanged(data));
    }, "items");
  }
);

export const addNewItem = createAsyncThunk(
  "items/addNewItem",
  async (item: Item) => {
    const response = await FirebaseServices.addNewItem(item);
    return response;
  }
);

export const addItemToCompartment = createAsyncThunk(
  "items/addItemToCompartment",
  async (info: {
    item_id: string;
    quantity: string | number;
    compartment: Compartment;
  }) => {
    const response = await FirebaseServices.addItemToCompartment(info);
    return response;
  }
);

export const removeItemFromCompartment = createAsyncThunk(
  "items/removeItemFromCompartment",
  async (info: {
    item_id: string;
    quantity: string | number;
    compartment: Compartment;
  }) => {
    const response = await FirebaseServices.removeItemFromCompartment(info);
    return response;
  }
);

export const updateItemInfo = createAsyncThunk(
  "items/updateItemInfo",
  async (item: Item) => {
    const updates = {
      [`/items/${item.id}`]: item
    };
    const response = await FirebaseServices.updateData(updates);
    return response;
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
