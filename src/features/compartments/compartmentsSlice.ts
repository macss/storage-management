import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  createSelector,
  PayloadAction
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Compartment } from "../../models";
import Services from "../../services/firebaseServices";
import { InitialState, ModelObj } from "../commonTypes";

// Initial configuration
const compartmentsAdapter = createEntityAdapter<Compartment>({
  selectId: (compartment) => compartment.id,
  sortComparer: (a, b) => a.location.localeCompare(b.location)
});

const initialState = compartmentsAdapter.getInitialState<InitialState>({
  status: "idle",
  error: undefined
});

// Thunks
export const fetchCompartments = createAsyncThunk(
  "compartments/fetchCompartments",
  (_, { dispatch }) => {
    Services.listenToDb((data) => {
      dispatch(databaseChanged(data));
    }, "compartments");
  }
);

export const addNewCompartment = createAsyncThunk(
  "compartments/addNewCompartment",
  (compartment: Compartment) => {
    const response = Services.addNewCompartment(compartment);
    return response;
  }
);

// Slice
const compartmentsSlice = createSlice({
  name: "compartments",
  initialState,
  reducers: {
    databaseChanged(state, action: PayloadAction<ModelObj<Compartment>>) {
      if (action.payload) {
        compartmentsAdapter.setAll(state, action.payload);
      } else {
        compartmentsAdapter.removeAll(state);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCompartments.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(fetchCompartments.rejected, (state, _) => {
      state.status = "failed";
    });
  }
});

export default compartmentsSlice.reducer;

export const { databaseChanged } = compartmentsSlice.actions;

// Default Selectors
export const {
  selectAll: selectAllCompartmens,
  selectById: selectCompartmentById,
  selectIds: selectCompartmentsIds
} = compartmentsAdapter.getSelectors<RootState>((state) => state.compartments);

// Custom Selectors
export const selectCompartmentByDeposit = createSelector(
  [selectAllCompartmens, (_: RootState, depositId: string) => depositId],
  (compartments, depositId) =>
    compartments.filter((compartment) => compartment.deposit_id === depositId)
);
