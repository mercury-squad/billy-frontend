import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, InputLabel, Select, MenuItem } from '@mui/material';

import { getClients } from 'features/clients/clients-slice';
import { API, ROUTES } from 'common/constants';
import styles from './project-form.module.scss';
import server from '../../../common/server';

const PAGE_TITLE = 'New Project';

const ProjectForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [setHeaderTitle] = useOutletContext();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    client: '',
    startDate: '',
    endDate: '',
  });

  const clientsList = useSelector((state) => state.clients.results);

  useEffect(() => setHeaderTitle(PAGE_TITLE), [setHeaderTitle]);

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const handleOnChange = (e) => {
    const { name, value } = e?.target ?? {};

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const saveProject = (callback) => {
    const createProject = async () => {
      const res = await server.post(`${API.projects}`, formData);

      if (res.status === 200) {
        const { _id: id } = res.data?.document ?? {};
        callback(id);
      }
    };

    createProject();
  };

  return (
    <div className={styles.projectForm}>
      <div className="form-item">
        <InputLabel>Project Name*</InputLabel>
        <TextField required fullWidth name="name" value={formData.name} onChange={handleOnChange} />
      </div>

      <div className="form-item">
        <InputLabel>Start Date*</InputLabel>
        <TextField
          required
          fullWidth
          name="startDate"
          value={formData.startDate}
          onChange={handleOnChange}
          type="date"
        />
      </div>

      <div className="form-item">
        <InputLabel>End Date*</InputLabel>
        <TextField required fullWidth name="endDate" value={formData.endDate} onChange={handleOnChange} type="date" />
      </div>

      <div className="form-item">
        <InputLabel>Description*</InputLabel>
        <TextField
          required
          fullWidth
          name="description"
          value={formData.description}
          onChange={handleOnChange}
          multiline
          rows={4}
        />
      </div>

      <div className="form-item">
        <InputLabel>Client</InputLabel>
        <Select fullWidth label="Client" name="client" value={formData.client} onChange={handleOnChange}>
          {clientsList.map(({ _id: id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="section-finale">
        <Button variant="contained" onClick={() => saveProject(() => navigate(ROUTES.projects))}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default ProjectForm;
