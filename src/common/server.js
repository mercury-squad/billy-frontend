import axios from 'axios';
import { ROUTES } from 'common/constants';
import { getAccessToken, removeAccessToken } from 'common/utils';

const handleUnauthorized = () => {
  const { pathname, search } = window.location;
  removeAccessToken();
  const currentUrl = encodeURIComponent(pathname.concat(search));
  window.location.href = `${ROUTES.login}?redirect=${currentUrl}`;
};

const handleResponse = (response) => {
  if (response.error) {
    if (response.status === 401) {
      handleUnauthorized();
    }

    const errorMessage = response.data?.message || response.statusText;
    console.error(errorMessage);
    // TODO: Give visual feedback
  }

  return response;
};

const handleError = (error) => {
  if (error.response?.status === 401) {
    handleUnauthorized();
  }
  return {
    status: error.response?.status,
    message: error.response?.data?.message,
  };
};

const request = (url, data, method = 'GET', options = {}) => {
  const authToken = getAccessToken();
  const requestOptions = {
    url,
    method,
    data,
    headers: {},
  };

  if (authToken) {
    requestOptions.headers.Authorization = `Bearer ${authToken}`;
  }

  return axios({ ...requestOptions, ...options })
    .then(handleResponse)
    .catch(handleError);
};

const server = {
  get: (url) => request(url),
  post: (url, body) => request(url, body, 'POST'),
  put: (url, body) => request(url, body, 'PUT'),
  delete: (url, body) => request(url, body, 'DELETE'),
};

export default server;
