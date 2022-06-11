import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

import { ROUTES } from 'common/constants';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>LandingPage</h1>
      <Button onClick={() => navigate(ROUTES.signup)}>Sign up</Button>
      <Button variant="contained" onClick={() => navigate(ROUTES.login)}>
        Login
      </Button>
    </div>
  );
};

export default LandingPage;
