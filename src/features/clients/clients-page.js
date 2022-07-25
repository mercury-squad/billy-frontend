import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { ROUTES } from 'common/constants';
import CustomTable from 'components/table/table';
import ApplicationFilters from 'features/filters/application-filters';
import { getClients, removeClients } from './clients-slice';
import styles from './clients-page.module.scss';

const PAGE_TITLE = 'All Clients';

const Clients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [setHeaderTitle] = useOutletContext();
  const [sortBy, setSortBy] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const clientsData = useSelector((state) => state.clients);

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

    dispatch(getClients(query));
  }, [dispatch, sortBy, searchKeyword]);

  const actionButtonConfig = {
    label: 'New Client',
    onClick: () => navigate(ROUTES.newClients),
  };

  const filtersConfig = {
    sortValue: sortBy,
    searchValue: searchKeyword,
    sortOptions: [
      { value: 'name', label: 'Client Name' },
      { value: 'contactPerson', label: 'Contact' },
      { value: 'email', label: 'Email' },
    ],
    onSortOptionChange: setSortBy,
    onSearchChange: setSearchKeyword,
  };

  const clientActions = [
    {
      value: 'edit',
      label: 'Edit',
    },
    {
      value: 'delete',
      label: 'Delete',
      onClick: (entry) => dispatch(removeClients([entry._id])),
    },
  ];

  const columns = [
    // { id: 'select', display: (data) => data.select, displayName: '', width: 10 },
    { id: 'name', display: (data) => data.name, displayName: 'Client Name', width: 30 },
    { id: 'contactPerson', display: (data) => data.contactPerson, displayName: 'Contact', width: 15 },
    { id: 'email', display: (data) => data.email, displayName: 'Email', width: 15 },
  ];

  return (
    <Container className={styles.clients}>
      <ApplicationFilters actionButtonConfig={actionButtonConfig} filtersConfig={filtersConfig} />
      <CustomTable
        rows={clientsData.results}
        columns={columns}
        actions={clientActions}
        onRemoveItems={(ids) => dispatch(removeClients(ids))}
      />
    </Container>
  );
};

export default Clients;
