import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, TextField, Button, Alert } from '@mui/material';

import Logo from 'components/logo';
import useAuth from 'common/hooks/use-auth';
import { ROUTES } from 'common/constants';

import styles from './signup-page.module.scss';

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const signupInputs = [
  { name: 'firstName', label: 'First Name', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
];

const SignupPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [error, setError] = useState();
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate(ROUTES.dashboard);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignup = async () => {
    const response = await auth.signup(formValues);
    if (response.message) {
      setError(response.message);
    } else {
      setError('');
    }
  };

  const pendingVerification = user?.verified === false;

  return (
    <Container component="main" maxWidth="xs" className={styles.signup}>
      <Logo className="text-center" />
      <Box>
        {pendingVerification ? (
          <Typography component="p" variant="p">
            Please check your email to verify your account
          </Typography>
        ) : (
          <>
            <Typography component="h2" variant="h5">
              Let&apos;s create your account
            </Typography>
            <Box component="form">
              {signupInputs.map(({ name, label, type }) => (
                <TextField
                  required
                  fullWidth
                  name={name}
                  autoComplete={name}
                  margin="normal"
                  key={`${name}Input`}
                  id={`${name}Input`}
                  label={label}
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  type={type}
                  value={formValues[name]}
                  onChange={handleInputChange}
                />
              ))}
              <Button variant="contained" onClick={handleSignup}>
                SIGN UP
              </Button>
              {error && <Alert severity="error">{error}</Alert>}
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default SignupPage;
