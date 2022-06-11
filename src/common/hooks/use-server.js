import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from 'common/constants';
import { getAccessToken, removeAccessToken } from 'common/utils';

const useServer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleResponse = (response) => {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);

      if (!response.ok) {
        if (response.status === 401) {
          const { pathname, search } = location;
          removeAccessToken();
          const currentUrl = encodeURIComponent(pathname.concat(search));
          navigate(`${ROUTES.login}?redirect=${currentUrl}`);
        }

        const errorMessage = data?.message || response.statusText;
        console.error(errorMessage);
        // TODO: Give visual feedback
      }

      return data;
    });
  };
  const request = (url, body, method = 'GET', options = {}) => {
    const authToken = getAccessToken();
    const fetchOptions = {
      method,
      headers: {},
    };

    if (authToken) {
      fetchOptions.headers.Authorization = `Bearer ${authToken}`;
    }

    if (body instanceof FormData || typeof body === 'string') {
      fetchOptions.body = body;
    } else if (body) {
      fetchOptions.headers['Content-Type'] = 'application/json';
      fetchOptions.body = JSON.stringify(body);
    }

    return fetch(url, { ...fetchOptions, ...options }).then(handleResponse);
  };

  return {
    get: (url) => request(url),
    post: (url, body) => request(url, body, 'POST'),
    put: (url, body) => request(url, body, 'PUT'),
    delete: (url, body) => request(url, body, 'DELETE'),
  };
};

export default useServer;
