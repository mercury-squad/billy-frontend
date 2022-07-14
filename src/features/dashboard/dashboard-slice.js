import { createSlice } from '@reduxjs/toolkit';
import server from 'common/server';
import { API } from 'common/constants';
import { updateValues } from 'common/utils';

const initialState = {
  onGoingProjects: 0,
  totalInvoice: 0,
  pendingInvoice: 0,
  totalPaymentsReceived: 0,
  totalOverdue: 0,
  projects: [],
  results: [],
};

export const dashboardSlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    loadSummary: (state, action) => {
      updateValues(state, action.payload);
    },
    loadProjects: (state, action) => {
      updateValues(state, action.payload);
    },
    loadInvoices: (state, action) => {
      updateValues(state, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadSummary, loadProjects, loadInvoices } = dashboardSlice.actions;

export const getSummary = (filterDate) => async (dispatch) => {
  const res = await server.get(`${API.dashboard}?filterDate=${filterDate}`);
  if (res.status === 200) {
    dispatch(loadSummary(res.data));
  }
};

export const getProjects = () => async (dispatch) => {
  const res = await server.get(`${API.projects}?page=1&perPage=3&sortBy=startDate&sortOrder=desc`);
  if (res.status === 200) {
    dispatch(loadProjects(res.data));
  }
};

export const getInvoices = () => async (dispatch) => {
  const res = await server.get(`${API.invoices}?page=1&perPage=3&sortBy=createdAt&sortOrder=desc`);
  if (res.status === 200) {
    dispatch(loadInvoices(res.data));
  }
};

export default dashboardSlice.reducer;
