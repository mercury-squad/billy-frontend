import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, TextField, Button } from '@mui/material';

import Logo from 'components/logo';
import useAuth from 'common/hooks/use-auth';
import { ROUTES } from 'common/constants';

import styles from './signup-page.module.scss';

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const signupInputs = [
  { name: 'firstName', label: 'First Name', type: 'text' },
  { name: 'lastName', label: 'Last Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
];

const SignupPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
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

  return (
    <Container component="main" maxWidth="xs" className={styles.signup}>
      <Logo className="text-center" />
      <Box>
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
          <Button variant="contained" onClick={() => auth.signup(formValues)}>
            SIGN UP
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
