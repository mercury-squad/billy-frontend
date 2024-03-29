import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, TextField, Button } from '@mui/material';

import Logo from 'components/logo/logo';
import useAuth from 'common/hooks/use-auth';
import { ROUTES } from 'common/constants';
import Input from 'components/input';
import { useForm } from 'react-hook-form';

import backgroundPatternImage from '../../../assets/img/sign-in-pattern.png';

import styles from '../signup/signup-page.module.scss';
import stylesP from './login-page.module.scss';

const defaultValues = {
  email: '',
  password: '',
};

const signInInputs = [
  { name: 'email', label: 'Email', type: 'text', rules: { required: true } },
  { name: 'password', label: 'Password', type: 'password', rules: { required: true } },
];

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate(ROUTES.dashboard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isLoggedIn]);

  return (
    <Box className={styles.signup}>
      <div
        className="background-image"
        alt="background-image"
        style={{ backgroundImage: `url(${backgroundPatternImage})` }}
      />
      <Container component="main" maxWidth="sm" className="over">
        <Logo className="text-center logo" />
        <Box className="white-container">
          <Typography component="h2" variant="h5">
            Welcome back to Billy!
          </Typography>
          <Box component="form">
            {signInInputs.map(({ name, label, type, rules }) => (
              <Input
                required
                fullWidth
                name={name}
                autoComplete={name}
                margin="normal"
                key={`${name}Input`}
                id={`${name}Input`}
                label={label}
                type={type}
                control={control}
                rules={rules}
              />
            ))}
            <a href="" className="small-link">
              Forgot password?
            </a>
            <Button variant="contained" onClick={() => handleSubmit(auth.login)()} fullWidth size="large">
              LOG IN
            </Button>
          </Box>
          <div className="signup-in-link">
            <p>Don't have Billy account?</p>
            <a onClick={() => navigate(ROUTES.signup)}>Create account</a>
          </div>
          {auth.failedLogin?
            <p className= {stylesP.error}>Email or password is wrong. Please check your input.</p>
            : <></>
          }
        </Box>
      </Container>
      <div className="footer">
        <p className="footer-text">InvoiceBilly©2022</p>
      </div>
    </Box>
  );
};

export default LoginPage;
