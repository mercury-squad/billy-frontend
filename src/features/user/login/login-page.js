import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Box, TextField, Button } from '@mui/material';

import Logo from 'components/logo/logo';
import useAuth from 'common/hooks/use-auth';
import { ROUTES } from 'common/constants';

import styles from '../signup/signup-page.module.scss';

const defaultValues = {
  email: '',
  password: '',
};

const signInInputs = [
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'password', label: 'Password', type: 'password' },
];

const LoginPage = () => {
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
  }, [auth.isLoggedIn]);

  return (
    <Container component="main" maxWidth="xs" className={styles.signup}>
      <Logo className="text-center" />
      <Box>
        <Typography component="h2" variant="h5">
          Welcome back to Billy!
        </Typography>
        <Box component="form">
          {signInInputs.map(({ name, label, type }) => (
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
          <Button variant="contained" onClick={() => auth.login(formValues)}>
            LOGIN
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
