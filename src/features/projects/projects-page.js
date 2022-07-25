import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Container } from '@mui/material';
import CustomTable from 'components/table/table';
import ApplicationFilters from 'features/filters/application-filters';
import { ROUTES, DATE_FORMAT } from 'common/constants';
import { getProjects } from './projects-slice';

import styles from './projects-page.module.scss';

const PAGE_TITLE = 'All Projects';

const Projects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [setHeaderTitle] = useOutletContext();
  const [sortBy, setSortBy] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const projectsData = useSelector((state) => state.projects);

  useEffect(() => setHeaderTitle(PAGE_TITLE), [setHeaderTitle]);

  useEffect(() => {
    let query = '';

    if (sortBy) {
      query += `sortBy=${sortBy}`;
    }

    if (searchKeyword) {
      if (sortBy) {
        query += `&keyword=${searchKeyword}`;
      } else {
        query += `keyword=${searchKeyword}`;
      }
    }

    dispatch(getProjects(query));
  }, [dispatch, sortBy, searchKeyword]);

  const actionButtonConfig = {
    label: 'New Project',
    onClick: () => navigate(ROUTES.newProjects),
  };

  const filtersConfig = {
    sortValue: sortBy,
    searchValue: searchKeyword,
    sortOptions: [
      { value: 'name', label: 'Project Name' },
      { value: 'endDate', label: 'End Date' },
      { value: 'status', label: 'Status' },
      { value: 'clientName', label: 'Client Name' },
    ],
    onSortOptionChange: setSortBy,
    onSearchChange: setSearchKeyword,
  };

  const columns = [
    // { id: 'select', display: (data) => data.select, displayName: '', width: 10 },
    { id: 'name', display: (data) => data.name, displayName: 'Project Name', width: 30 },
    { id: 'status', display: (data) => data.status, displayName: 'Project Status', width: 15 },
    {
      id: 'endDate',
      display: (data) => moment(data.endDate).utc().format(DATE_FORMAT),
      displayName: 'End Date',
      width: 15,
    },
    { id: 'clientName', display: (data) => data.clientName, displayName: 'Client Name', width: 15 },
  ];

  return (
    <Container className={styles.projects}>
      <ApplicationFilters actionButtonConfig={actionButtonConfig} filtersConfig={filtersConfig} />
      <CustomTable rows={projectsData.results} columns={columns} />
    </Container>
  );
};

export default Projects;
