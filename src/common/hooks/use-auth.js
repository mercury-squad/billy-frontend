import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from 'features/user/user-slice';

import useServer from 'common/hooks/use-server';
import { API, ROUTES } from 'common/constants';
import { getAccessToken, setAccessToken, removeAccessToken } from 'common/utils';

const useAuth = () => {
  const dispatch = useDispatch();
  const server = useServer();
  const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());
  const navigate = useNavigate();
  const location = useLocation();

  const updateUserState = (userData) => {
    if (userData) {
      dispatch(loadUser(userData));
    }
  };

  const saveCredentials = (response) => {
    const { accessToken } = response || {};
    if (accessToken) {
      setAccessToken(accessToken);
      setIsLoggedIn(true);
      updateUserState(response);
      const params = new URLSearchParams(location.search);
      const redirectUrl = params.get('redirect');
      const next = redirectUrl ? decodeURIComponent(redirectUrl) : ROUTES.dashboard;
      navigate(next);
    }
  };

  const signup = async (data) => {
    const response = await server.post(API.signup, data);
    saveCredentials(response);
  };

  const login = async (data) => {
    const response = await server.post(API.login, data);
    saveCredentials(response?.user);
  };

  const logout = async () => {
    const accessToken = getAccessToken();
    if (accessToken) {
      server.post(API.logout);
    }
    removeAccessToken();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      const getUser = async () => {
        const response = await server.get(API.user);
        updateUserState(response);
      };
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoggedIn,
    login,
    logout,
    signup,
  };
};

export default useAuth;
