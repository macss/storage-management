import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../models";
import Services from "../../services/firebaseServices";
import { InitialState, ModelObj } from "../commonTypes";

// Initial configuration
const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user.id,
  sortComparer: (a, b) => a.fullname.localeCompare(b.fullname)
});

const initialState = usersAdapter.getInitialState<InitialState>({
  status: "idle",
  error: undefined
});

// Thunks
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  (_, { dispatch }) => {
    Services.listenToDb((data) => {
      dispatch(databaseChanged(data));
    }, "users");
  }
);

// Slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    databaseChanged(state, action: PayloadAction<ModelObj<User>>) {
      if (action.payload) {
        usersAdapter.setAll(state, action.payload);
      } else {
        usersAdapter.removeAll(state);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, _) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.rejected, (state, _) => {
      state.status = "failed";
    });
  }
});

export default usersSlice.reducer;

export const { databaseChanged } = usersSlice.actions;

// Default Selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUsersIds
} = usersAdapter.getSelectors<RootState>((state) => state.users);
