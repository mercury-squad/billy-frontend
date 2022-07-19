import { useEffect } from 'react';
import { ReactComponent as Illustration } from 'assets/img/sent-invoice-illustration.svg';
import { useOutletContext, useLocation, useNavigate } from 'react-router';
import { Button, Box } from '@mui/material';
import { ROUTES } from 'common/constants';

const SentInvoice = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [setHeaderTitle] = useOutletContext();
  useEffect(() => setHeaderTitle(state?.invoiceNumber), [setHeaderTitle, state]);

  return (
    <div className="flex flex-column align-center justify-center">
      <div>
        <Illustration />
      </div>
      <Box className="subtitle">Invoice sent!</Box>
      <Box sx={{ p: '.5rem 0 2rem' }}>Invoice successfully sent to {state?.email}</Box>
      <Button
        sx={{ textTransform: 'initial' }}
        type="submit"
        variant="contained"
        onClick={() => navigate(ROUTES.invoices)}>
        Back to all invoices
      </Button>
    </div>
  );
};

export default SentInvoice;
