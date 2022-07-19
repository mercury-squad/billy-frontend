import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { TextField, Button, InputLabel } from '@mui/material';

import { API, ROUTES } from 'common/constants';
import styles from './client-form.module.scss';
import server from '../../../common/server';

const PAGE_TITLE = 'New Client';

const ClientForm = () => {
  const navigate = useNavigate();

  const [setHeaderTitle] = useOutletContext();

  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    address: '',
    phoneNumber: '',
    email: '',
  });

  useEffect(() => setHeaderTitle(PAGE_TITLE), [setHeaderTitle]);

  const handleOnChange = (e) => {
    const { name, value } = e?.target ?? {};

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const saveClient = (callback) => {
    const createClient = async () => {
      const res = await server.post(`${API.clients}`, formData);

      if (res.status === 200) {
        const { _id: id } = res.data?.document ?? {};
        callback(id);
      }
    };

    createClient();
  };

  return (
    <div className={styles.clientForm}>
      <div className="form-item">
        <InputLabel>Client Name*</InputLabel>
        <TextField required fullWidth name="name" value={formData.name} onChange={handleOnChange} />
      </div>

      <div className="form-item">
        <InputLabel>Contact Person*</InputLabel>
        <TextField required fullWidth name="contactPerson" value={formData.contactPerson} onChange={handleOnChange} />
      </div>

      <div className="form-item">
        <InputLabel>Address*</InputLabel>
        <TextField
          required
          fullWidth
          name="address"
          value={formData.address}
          onChange={handleOnChange}
          multiline
          rows={4}
        />
      </div>

      <div className="form-item">
        <InputLabel>Phone Number*</InputLabel>
        <TextField required fullWidth name="phoneNumber" value={formData.phoneNumber} onChange={handleOnChange} />
      </div>

      <div className="form-item">
        <InputLabel>Email*</InputLabel>
        <TextField required fullWidth name="email" value={formData.email} onChange={handleOnChange} />
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
