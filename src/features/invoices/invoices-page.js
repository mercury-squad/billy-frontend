import { useEffect } from 'react';
import { useOutletContext } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';

import CustomTable from 'components/table/table';
import ApplicationFilters from 'features/filters/application-filters';
import { getInvoices } from './invoices-slice';
import styles from './invoices-page.module.scss';

const PAGE_TITLE = 'Invoices';
const Invoices = () => {
  const dispatch = useDispatch();
  const [setHeaderTitle] = useOutletContext();
  const invoicesData = useSelector((state) => state.invoices);

  useEffect(() => setHeaderTitle(PAGE_TITLE), [setHeaderTitle]);

  useEffect(() => {
    dispatch(getInvoices());
  }, [dispatch]);

  const columns = [
    { field: 'select', displayName: '', width: 10 },
    { field: 'invoiceNumber', displayName: 'Invoice #', width: 10 },
    { field: 'projectName', displayName: 'Project Name', width: 30 },
    { field: 'dueDate', displayName: 'Due Date', width: 15 },
    { field: 'amount', displayName: 'Amount', width: 15 },
    { field: 'status', displayName: 'Payment Status', width: 15 },
    { field: 'actions', displayName: 'Action', width: 15 },
  ];

  const actionButtonConfig = {
    label: 'New Invoice',
    onClick: () => {},
  };
  const filtersConfig = {
    sortValue: '',
    searchValue: '',
    sortOptions: [
      { value: 'projectName', label: 'Project Name' },
      { value: 'dueDate', label: 'Due Date' },
      { value: 'amount', label: 'Amount' },
      { value: 'paymentStatus', label: 'Payment Status' },
    ],
    onSortOptionChange: () => {},
    onSearchChange: () => {},
  };

  return (
    <Container className={styles.invoices}>
      <ApplicationFilters actionButtonConfig={actionButtonConfig} filtersConfig={filtersConfig} />
      <CustomTable rows={invoicesData.results} columns={columns} />
    </Container>
  );
};

export default Invoices;
