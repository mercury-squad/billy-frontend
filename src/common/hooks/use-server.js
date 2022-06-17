import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from 'common/constants';
import { getAccessToken, removeAccessToken } from 'common/utils';

const useServer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleResponse = (response) => {
    if (response.error) {
      if (response.status === 401) {
        const { pathname, search } = location;
        removeAccessToken();
        const currentUrl = encodeURIComponent(pathname.concat(search));
        navigate(`${ROUTES.login}?redirect=${currentUrl}`);
      }

      const errorMessage = response.data?.message || response.statusText;
      console.error(errorMessage);
      // TODO: Give visual feedback
    }

    return response;
  };

  const handleError = (error) => {
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

  return {
    get: (url) => request(url),
    post: (url, body) => request(url, body, 'POST'),
    put: (url, body) => request(url, body, 'PUT'),
    delete: (url, body) => request(url, body, 'DELETE'),
  };
};

export default useServer;
