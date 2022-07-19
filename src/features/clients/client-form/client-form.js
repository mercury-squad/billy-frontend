import { useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { Button, InputLabel } from '@mui/material';
import { useForm } from 'react-hook-form';

import Input from 'components/input';
import { API, ROUTES } from 'common/constants';
import styles from './client-form.module.scss';
import server from '../../../common/server';

const PAGE_TITLE = 'New Client';
const defaultValues = { name: '', contactPerson: '', address: '', phoneNumber: '', email: '' };

const ClientForm = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({ defaultValues });

  const [setHeaderTitle] = useOutletContext();

  useEffect(() => setHeaderTitle(PAGE_TITLE), [setHeaderTitle]);

  const saveClient = (callback) => {
    const createClient = async (formData) => {
      const res = await server.post(`${API.clients}`, formData);

      if (res.status === 200) {
        const { _id: id } = res.data?.document ?? {};
        callback(id);
      }
    };

    handleSubmit(createClient)();
  };

  return (
    <div className={styles.clientForm}>
      <div className="form-item">
        <InputLabel>Client Name*</InputLabel>
        <Input required fullWidth name="name" rules={{ required: true, minLength: 2 }} control={control} />
      </div>

      <div className="form-item">
        <InputLabel>Contact Person*</InputLabel>
        <Input required fullWidth name="contactPerson" rules={{ required: true, minLength: 5 }} control={control} />
      </div>

      <div className="form-item">
        <InputLabel>Address*</InputLabel>
        <Input
          required
          fullWidth
          name="address"
          rules={{ required: true, minLength: 5 }}
          control={control}
          multiline
          rows={4}
        />
      </div>

      <div className="form-item">
        <InputLabel>Phone Number*</InputLabel>
        <Input required fullWidth name="phoneNumber" type="tel" rules={{ required: true }} control={control} />
      </div>

      <div className="form-item">
        <InputLabel>Email*</InputLabel>
        <Input required fullWidth name="email" type="email" rules={{ required: true }} control={control} />
      </div>

      <div className="section-finale">
        <Button variant="contained" onClick={() => saveClient(() => navigate(ROUTES.clients))}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ClientForm;
