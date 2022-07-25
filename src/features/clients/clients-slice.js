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

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    loadClients: (state, action) => {
      updateValues(state, action.payload);
    },
  },
});

export const { loadClients } = clientsSlice.actions;

export const getClients =
  (query = '') =>
  async (dispatch) => {
    const url = query ? `${API.clients}?${query}` : API.clients;

    const res = await server.get(url);

    if (res.status === 200) {
      const { clients, ...data } = res.data;
      dispatch(loadClients({ ...data, results: clients }));
    }
  };

export const removeClients = (ids) => async (dispatch) => {
  if (!ids.length) return;
  const res = await server.delete(API.projects, { ids });
  if (res.status === 200) {
    dispatch(getClients());
  }
};

export default clientsSlice.reducer;
