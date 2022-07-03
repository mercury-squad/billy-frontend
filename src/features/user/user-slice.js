import { createSlice } from '@reduxjs/toolkit';
import { updateValues } from 'common/utils';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  verified: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // https://redux-toolkit.js.org/api/createslice

      // We dinamically update all the state properties instead
      // of doing it mannually like this 👇
      // state.firstName = action.payload.firstName;
      // state.lalstName = action.payload.lastName;
      updateValues(state, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadUser } = userSlice.actions;

export default userSlice.reducer;
