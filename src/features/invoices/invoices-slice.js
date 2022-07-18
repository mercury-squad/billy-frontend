import { createSlice } from '@reduxjs/toolkit';
import server from 'common/server';
import { API } from 'common/constants';
import { updateValues } from 'common/utils';

const initialState = {
  page: 1,
  results: [],
  total: 0,
  perPage: null,
  loading: false,
};

export const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    loadInvoices: (state, action) => {
      state.loading = false;
      updateValues(state, action.payload);
    },
    loadingInvoices: (state) => {
      state.loading = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadInvoices, loadingInvoices } = invoicesSlice.actions;

export const getInvoices =
  (query = '') =>
  async (dispatch) => {
    dispatch(loadingInvoices());
    const url = query ? `${API.invoices}?${query}` : API.invoices;
    const res = await server.get(url);
    if (res.status === 200) {
      dispatch(loadInvoices(res.data));
    }
  };

export const updateInvoice = (data) => async (dispatch) => {
  const { _id: id, ...rest } = data;
  if (!id) return;
  const res = await server.put(`${API.invoices}/${id}`, rest);
  if (res.status === 200) {
    dispatch(getInvoices());
  }
};

export const removeInvoices = (ids) => async (dispatch) => {
  if (!ids.length) return;
  const res = await server.delete(API.invoices, { ids });
  if (res.status === 200) {
    dispatch(getInvoices());
  }
};

export default invoicesSlice.reducer;
