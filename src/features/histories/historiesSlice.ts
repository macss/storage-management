import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { Compartment, History } from '../../models'
import Services from '../../services/firebaseServices'
import { InitialState, ModelObj } from '../commonTypes'

// Initial configuration
const historiesAdapter = createEntityAdapter<History>({
  selectId: (history) => history.id,
  sortComparer: (a, b) => a.created_at - b.created_at
})

const initialState = historiesAdapter.getInitialState<InitialState>({
  status: 'idle',
  error: undefined
})

// Thunks
export const fetchHistories = createAsyncThunk(
  'hitories/fetchHistories',
  (_, { dispatch }) => {
    Services.listenToDb((data) => {
      dispatch(databaseChanged(data))
    }, 'histories')
  }
)

// Slice
const historiesSlice = createSlice({
  name: 'histories',
  initialState,
  reducers: {
    databaseChanged(state, action: PayloadAction<ModelObj<History>>) {
      if (action.payload) {
        historiesAdapter.setAll(state, action.payload)
      } else {
        historiesAdapter.removeAll(state)
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHistories.pending, (state, _) => {
      state.status = 'loading'
    })
    builder.addCase(fetchHistories.rejected, (state, _) => {
      state.status = 'failed'
    })
  }
})

export default historiesSlice.reducer

export const { databaseChanged } = historiesSlice.actions

// Default Selectors
export const {
  selectAll: selectAllHistories,
  selectById: selectHistoryById,
  selectIds: selectHistoriesIds
} = historiesAdapter.getSelectors<RootState>((state) => state.histories)

export const selectCompartmentHistories = createSelector(
  [
    selectAllHistories,
    (_: RootState, compartment: Compartment) => compartment.histories
  ],
  (histories, historiesKeys) => {
    if (historiesKeys) {
      return Object.keys(historiesKeys)
        .map((k) => {
          const [history] = histories.filter((hist) => hist.id === k)
          return history
        })
        .filter((ht) => Boolean(ht))
    }
  }
)
