import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Deposit } from "../../models";
import Services from "../../services/firebaseServices";
import { InitialState, ModelObj } from "../commonTypes";

// Initial configuration
const depositsAdapter = createEntityAdapter<Deposit>({
  selectId: (deposit) => deposit.id,
  sortComparer: (a, b) => a.name?.localeCompare(b.name)
});

const initialState = depositsAdapter.getInitialState<InitialState>({
  status: "idle",
  error: undefined
});

// Thunks
export const fetchDeposits = createAsyncThunk(
  "deposits/fetchDeposits",
  (_, { dispatch }) => {
    Services.listenToDb((data) => {
      dispatch(databaseChanged(data));
    }, "deposits");
  }
);

export const addDeposit = createAsyncThunk(
  "deposits/addDeposit",
  (deposit: Deposit) => {
    const response = Services.addDeposit(deposit);
    return response;
  }
);

// Slice
const depositsSlice = createSlice({
  name: "deposits",
  initialState,
  reducers: {
    databaseChanged(state, action: PayloadAction<ModelObj<Deposit>>) {
      if (action.payload) {
        depositsAdapter.setAll(state, action.payload);
      } else {
        depositsAdapter.removeAll(state);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDeposits.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(fetchDeposits.rejected, (state, _) => {
      state.status = "failed";
    });
  }
});

export default depositsSlice.reducer;

export const { databaseChanged } = depositsSlice.actions;

// Default Selectors
export const {
  selectAll: selectAllDeposits,
  selectById: selectDepositById,
  selectIds: selectDepositsIds
} = depositsAdapter.getSelectors<RootState>((state) => state.deposits);
