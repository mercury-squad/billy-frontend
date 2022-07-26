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

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    loadProjects: (state, action) => {
      updateValues(state, action.payload);
    },
  },
});

export const { loadProjects } = projectsSlice.actions;

export const getProjects =
  (query = '') =>
  async (dispatch) => {
    const url = query ? `${API.projects}?${query}` : API.projects;

    const res = await server.get(url);

    if (res.status === 200) {
      const { projects, ...data } = res.data;
      dispatch(loadProjects({ ...data, results: projects }));
    }
  };

/* export const removeProjects = (ids) => async (dispatch) => {
  if (!ids.length) return;
  const res = await server.delete(API.projects, { ids });
  if (res.status === 200) {
    dispatch(getProjects());
  }
}; */

export default projectsSlice.reducer;
