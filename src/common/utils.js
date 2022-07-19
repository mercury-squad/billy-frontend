export const getAccessToken = () => {
  return window.localStorage.getItem('accessToken');
};

export const setAccessToken = (accessToken) => {
  return window.localStorage.setItem('accessToken', accessToken);
};

export const removeAccessToken = () => {
  return window.localStorage.removeItem('accessToken');
};

// Updates only the existing keys (or the ones provided) in the target obj
export const updateValues = (target, source, keys) => {
  if (!source) return;
  (keys || Object.keys(target)).forEach((key) => {
    if (source[key] !== undefined) {
      target[key] = source[key];
    }
  });
};

export const formatDate = () => {
  return '';
};
