import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, CircularProgress, Button } from '@mui/material';

import Logo from 'components/logo/logo';
import useAuth from 'common/hooks/use-auth';
import { ROUTES } from 'common/constants';

const VerifyAccount = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState();
  const [verified, setVerified] = useState(false);

  const verifyAccount = async () => {
    const params = new URLSearchParams(location.search);
    const verificationToken = params.get('verificationToken');
    const email = params.get('email');

    if (!verificationToken || !email) {
      setError('Invalid request.');
      return;
    }
    const response = await auth.verifyAccount({ verificationToken, email });

    if (response?.status === 200) {
      setVerified(true);
    } else {
      setError(response.message);
    }
  };

  useEffect(() => {
    verifyAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="flex flex-column justify-center" component="main" maxWidth="xs" sx={{ mt: 10 }}>
      <Logo className="flex justify-center" />
      <Box sx={{ mt: '2rem' }}>
        {!verified && !error && (
          <>
            <p>We are validating your account, please wait a moment</p>
            <CircularProgress />
          </>
        )}

        {verified && (
          <div className="flex flex-column justify-center text-center">
            Your account has been verified successfully.
            <Button onClick={() => navigate(ROUTES.login)}>Go to Login</Button>
          </div>
        )}

        {error && <p className="text-center">{error}</p>}
      </Box>
    </Container>
  );
};

export default VerifyAccount;
