import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import moment from 'moment';

import CustomTable from 'components/table/table';
import { ROUTES, DATE_FORMAT } from 'common/constants';
import ApplicationFilters from 'features/filters/application-filters';
import { getInvoices } from './invoices-slice';
import styles from './invoices-page.module.scss';

const PAGE_TITLE = 'Invoices';
const Invoices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    { field: 'paymentDueDate', displayName: 'Due Date', width: 15 },
    { field: 'totalAmount', displayName: 'Amount', width: 15 },
    { field: 'paymentStatus', displayName: 'Payment Status', width: 15 },
    { field: 'actions', displayName: 'Action', width: 15 },
  ];

  const actionButtonConfig = {
    label: 'New Invoice',
    onClick: () => navigate(ROUTES.newInvoice),
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

  const getRows = () => {
    return invoicesData.results?.map((invoice) => {
      const { _id: id } = invoice;
      const paymentDueDate = moment(invoice.paymentDueDate).format(DATE_FORMAT);
      return { ...invoice, paymentDueDate, actions: <Link to={`${ROUTES.invoices}/${id}`}>Preview</Link> };
    });
  };

  return (
    <Container className={styles.invoices}>
      <ApplicationFilters actionButtonConfig={actionButtonConfig} filtersConfig={filtersConfig} />
      <CustomTable rows={getRows()} columns={columns} />
    </Container>
  );
};

export default Invoices;
