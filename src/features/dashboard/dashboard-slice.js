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
};

export const dashboardSlice = createSlice({
  name: 'summary',
  initialState,
  reducers: {
    loadSummary: (state, action) => {
      updateValues(state, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadSummary } = dashboardSlice.actions;

export const getSummary = (filterDate) => async (dispatch) => {
  const res = await server.get(`${API.dashboard}?filterDate=${filterDate}`);
  if (res.status === 200) {
    dispatch(loadSummary(res.data));
  }
};

export default dashboardSlice.reducer;
