import { createSlice } from '@reduxjs/toolkit';
import server from 'common/server';
import { API } from 'common/constants';
import { updateValues } from 'common/utils';

const initialState = {
  page: 1,
  results: [],
  total: 0,
  perPage: null,
};

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    loadInvoices: (state, action) => {
      updateValues(state, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadInvoices } = invoicesSlice.actions;

export const getInvoices = () => async (dispatch) => {
  const res = await server.get(API.invoices);
  if (res.status === 200) {
    dispatch(loadInvoices(res.data));
  }
};

export default invoicesSlice.reducer;