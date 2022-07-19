import { useEffect, useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, InputLabel, Select, MenuItem } from '@mui/material';
import moment from 'moment';
import Input from 'components/input';
import { useForm } from 'react-hook-form';

import { getClients } from 'features/clients/clients-slice';
import { API, ROUTES, DATE_FORMAT } from 'common/constants';
import styles from './project-form.module.scss';
import server from '../../../common/server';

const PAGE_TITLE = 'New Project';
const defaultValues = {
  name: '',
  description: '',
  client: '',
  startDate: '',
  endDate: '',
};

const ProjectForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({ defaultValues });

  const [setHeaderTitle] = useOutletContext();

  const clientsList = useSelector((state) => state.clients.results);

  useEffect(() => setHeaderTitle(PAGE_TITLE), [setHeaderTitle]);

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  const saveProject = (callback) => {
    const createProject = async (formData) => {
      const res = await server.post(`${API.projects}`, formData);

      if (res.status === 200) {
        const { _id: id } = res.data?.document ?? {};
        callback(id);
      }
    };

    handleSubmit(createProject)();
  };

  return (
    <div className={styles.projectForm}>
      <div className="form-item">
        <InputLabel>Project Name*</InputLabel>
        <Input rules={{ required: true, minLength: 2, maxLength: 50 }} fullWidth name="name" control={control} />
      </div>

      <div className="form-item">
        <InputLabel>Start Date*</InputLabel>
        <Input fullWidth name="startDate" control={control} type="date" rules={{ required: true }} />
      </div>

      <div className="form-item">
        <InputLabel>End Date*</InputLabel>
        <Input
          fullWidth
          name="endDate"
          control={control}
          type="date"
          rules={{ required: true, min: moment().format(DATE_FORMAT) }}
        />
      </div>

      <div className="form-item">
        <InputLabel>Description*</InputLabel>
        <Input
          rules={{ required: true, minLength: 5 }}
          fullWidth
          name="description"
          control={control}
          multiline
          rows={4}
        />
      </div>

      <div className="form-item">
        <InputLabel>Client</InputLabel>
        <Input select fullWidth name="client" control={control} rules={{ required: true }}>
          {clientsList.map(({ _id: id, name }) => (
            <MenuItem key={id} value={id}>
              {name}
            </MenuItem>
          ))}
        </Input>
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
