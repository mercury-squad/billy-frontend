import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser, resetUser } from 'features/user/user-slice';

import server from 'common/server';
import { API, ROUTES } from 'common/constants';
import { getAccessToken, setAccessToken, removeAccessToken } from 'common/utils';

const useAuth = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());
  const [failedLogin, setFailedLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const updateUserState = (userData) => {
    if (userData) {
      dispatch(loadUser(userData));
    }
  };

  const saveCredentials = (accessToken) => {
    if (accessToken) {
      setAccessToken(accessToken);
      setIsLoggedIn(true);
      const params = new URLSearchParams(location.search);
      const redirectUrl = params.get('redirect');
      const next = redirectUrl ? decodeURIComponent(redirectUrl) : ROUTES.dashboard;
      navigate(next);
    }
  };

  const signup = async (data) => {
    const response = await server.post(API.signup, data);
    if (response.status === 200) {
      updateUserState(response.data);
    }
    return response;
  };

  const login = async (data) => {
    const response = await server.post(API.login, data);
    if (response.status === 200) {
      const { user, accessToken } = response?.data || {};
      updateUserState(user);
      saveCredentials(accessToken);
      setFailedLogin(false);
    }
    if (response.status === 404 || response.status === 403) {
      setFailedLogin(true);
    }
    return response;
  };

  const logout = async () => {
    const accessToken = getAccessToken();
    if (accessToken) {
      const res = await server.post(API.logout);
      if (res.status === 200) dispatch(resetUser());
    }
    removeAccessToken();
    setIsLoggedIn(false);
  };

  const verifyAccount = async (data) => {
    return server.post(API.confirmEmail, data);
  };

  useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken) {
      const getUser = async () => {
        const response = await server.get(API.user);
        updateUserState(response.data);
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
    verifyAccount,
    failedLogin,
  };
};

export default useAuth;
