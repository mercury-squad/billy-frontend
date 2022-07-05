import { createSlice } from '@reduxjs/toolkit';
import server from 'common/server';
import { API } from 'common/constants';
import { updateValues } from 'common/utils';

const initialState = {
  page: 1,
  projects: [],
  total: 0,
  perPage: null,
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    loadProjects: (state, action) => {
      updateValues(state, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadProjects } = projectsSlice.actions;

export const getProjects = () => async (dispatch) => {
  const res = await server.get(API.projects);
  if (res.status === 200) {
    dispatch(loadProjects(res.data));
  }
};

export default projectsSlice.reducer;
