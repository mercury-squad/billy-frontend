import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import CustomTable from 'components/table/table';
import ApplicationFilters from 'features/filters/application-filters';
import { getProjects } from './projects-slice';

import styles from './projects-page.module.scss';

const PAGE_TITLE = 'Projects';
const Projects = () => {
  const dispatch = useDispatch();
  const [setHeaderTitle] = useOutletContext();
  const projectsData = useSelector((state) => state.projects);

  useEffect(() => setHeaderTitle(PAGE_TITLE), [setHeaderTitle]);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const actionButtonConfig = {
    label: 'New Project',
    onClick: () => {},
  };

  const filtersConfig = {
    sortValue: '',
    searchValue: '',
    sortOptions: [
      { value: 'projectName', label: 'Project Name' },
      { value: 'endDate', label: 'End Date' },
      { value: 'status', label: 'Status' },
      { value: 'clientName', label: 'Client Name' },
    ],
    onSortOptionChange: () => {},
    onSearchChange: () => {},
  };

  const columns = [
    { id: 'select', display: (data) => data.select, displayName: '', width: 10 },
    { id: 'name', display: (data) => data.name, displayName: 'Project Name', width: 30 },
    { id: 'status', display: (data) => data.status, displayName: 'Project Status', width: 15 },
    { id: 'endDate', display: (data) => data.endDate, displayName: 'End Date', width: 15 },
    { id: 'clientName', display: (data) => data.clientName, displayName: 'Client Name', width: 15 },
    { id: 'actions', display: (data) => data.actions, displayName: 'Action', width: 15 },
  ];

  return (
    <Container className={styles.projects}>
      <ApplicationFilters actionButtonConfig={actionButtonConfig} filtersConfig={filtersConfig} />
      <CustomTable rows={projectsData.results} columns={columns} />
    </Container>
  );
};

export default Projects;
