import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, Button, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import Input from 'components/input';

import Logo from 'components/logo/logo';
import useAuth from 'common/hooks/use-auth';
import { ROUTES } from 'common/constants';

import backgroundPatternImage from '../../../assets/img/sign-in-pattern.png';

import styles from './signup-page.module.scss';

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const signupInputs = [
  {
    name: 'firstName',
    fullWidth: true,
    label: 'First Name',
    type: 'text',
    rules: { required: true, minLength: 2, maxLength: 25 },
  },
  {
    name: 'lastName',
    fullWidth: true,
    label: 'Last Name',
    type: 'text',
    rules: { required: true, minLength: 2, maxLength: 25 },
  },
  { name: 'email', fullWidth: true, label: 'Email', type: 'email' },
  {
    name: 'password',
    fullWidth: true,
    label: 'Password',
    type: 'password',
    rules: { required: true, minLength: 5, maxLength: 15 },
  },
];

const SignupPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [error, setError] = useState();
  const { handleSubmit, control } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate(ROUTES.dashboard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignup = async (data) => {
    const response = await auth.signup(data);
    if (response.message) {
      setError(response.message);
    } else {
      setError('');
    }
  };

  const pendingVerification = user && user.email && user.verified === false;

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
          {pendingVerification ? (
            <Typography component="p" variant="p">
              Please check your email to verify your account
            </Typography>
          ) : (
            <>
              <Typography component="h2" variant="h5">
                Create your account
              </Typography>
              <Box component="form" className="signup-form">
                {signupInputs.map(({ name, fullWidth, label, type, rules }) => (
                  <Input
                    required
                    fullWidth={fullWidth}
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
                <Button variant="contained" onClick={handleSubmit(handleSignup)} fullWidth size="large">
                  SIGN UP
                </Button>
                {error && <Alert severity="error">{error}</Alert>}
              </Box>
            </>
          )}
          <div className="signup-in-link">
            <p>Already had Billy account?</p>
            <a onClick={() => navigate(ROUTES.login)}>Log in</a>
          </div>
        </Box>
      </Container>
      <div className="footer">
        <p className="footer-text">InvoiceBilly©2022</p>
      </div>
    </Box>
  );
};

export default SignupPage;
