import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import { fetchUsers } from './ActionCreators';

interface UserState {
  users: IUser[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // usersFetching(state: UserState) {
    //   state.isLoading = true;
    // },
    // usersFetchingSuccess(state: UserState, action: PayloadAction<IUser[]>) {
    //   state.isLoading = false;
    //   state.error = '';
    //   state.users = action.payload;
    // },
    // usersFetchingError(state: UserState, action: PayloadAction<string>) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
  },
  extraReducers: {
    [fetchUsers.pending.type]: (state: UserState) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled.type]: (
      state: UserState,
      action: PayloadAction<IUser[]>
    ) => {
      state.isLoading = false;
      state.error = '';
      state.users = action.payload;
    },
    [fetchUsers.rejected.type]: (
      state: UserState,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
