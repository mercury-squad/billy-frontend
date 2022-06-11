export const getAccessToken = () => {
  return window.localStorage.getItem('accessToken');
};

export const setAccessToken = (accessToken) => {
  return window.localStorage.setItem('accessToken', accessToken);
};

export const removeAccessToken = () => {
  return window.localStorage.removeItem('accessToken');
};
