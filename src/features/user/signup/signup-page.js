import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, TextField, Button, Alert } from '@mui/material';

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
  confirmPassword: '',
};

const signupInputs = [
  { name: 'firstName', fullWidth: false, label: 'First Name', type: 'text' },
  { name: 'lastName', fullWidth: false, label: 'Last Name', type: 'text' },
  { name: 'email', fullWidth: true, label: 'Email', type: 'text' },
  { name: 'password', fullWidth: true, label: 'Password', type: 'password' },
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
                {signupInputs.map(({ name, fullWidth, label, type }) => (
                  <TextField
                    required
                    fullWidth={fullWidth}
                    name={name}
                    autoComplete={name}
                    margin="normal"
                    key={`${name}Input`}
                    id={`${name}Input`}
                    label={label}
                    /* InputLabelProps={{ shrink: true }} */
                    /* variant="standard" */
                    type={type}
                    value={formValues[name]}
                    onChange={handleInputChange}
                  />
                ))}
                <Button variant="contained" onClick={handleSignup} fullWidth size="large">
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
