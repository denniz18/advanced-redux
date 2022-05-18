import axios from 'axios';
import { IUser } from '../../models/IUser';
import { AppDispatch } from '../store';
import { userSlice } from '../reducers/UserSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchUsers = () => async (dispath: AppDispatch) => {
//   try {
//     dispath(userSlice.actions.usersFetching());
//     const response = await axios.get<IUser[]>(
//       'https://jsonplaceholder.typicode.com/users'
//     );
//     setTimeout(() => {
//       dispath(userSlice.actions.usersFetchingSuccess(response.data));
//     }, 500);
//   } catch (error) {
//     let errorMessage = 'Something went wrong';
//     if (error instanceof Error) {
//       errorMessage = error.message;
//       dispath(userSlice.actions.usersFetchingError(errorMessage));
//     }
//   }
// };

export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>(
        'https://jsonplaceholder.typicode.com/users'
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);
