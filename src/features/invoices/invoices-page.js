import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@mui/material';
import moment from 'moment';

import CustomTable from 'components/table/table';
import { ROUTES, DATE_FORMAT } from 'common/constants';
import { Status, TextWithTag } from 'components/data-visualization/data-visualization';
import ApplicationFilters from 'features/filters/application-filters';
import { getInvoices, updateInvoice, removeInvoices } from './invoices-slice';
import styles from './invoices-page.module.scss';

const PAGE_TITLE = 'All Invoices';
const Invoices = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [setHeaderTitle] = useOutletContext();
  const invoicesData = useSelector((state) => state.invoices);
  const [sortBy, setSortBy] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => setHeaderTitle(PAGE_TITLE), [setHeaderTitle]);

  useEffect(() => {
    let query = '';
    if (sortBy) {
      query += `sortBy=${sortBy}`;
    }
    if (searchKeyword) {
      query += `keyword=${searchKeyword}`;
    }
    dispatch(getInvoices(query));
  }, [dispatch, sortBy, searchKeyword]);

  const tagColorByStatus = {
    draft: 'primary',
    sent: 'secondary',
    scheduled: 'tertiary',
  };

  const statusOptions = [
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' },
  ];

  const invoiceActions = [
    { value: 'duplicate', label: 'Duplicate', onClick: (entry) => console.info('Duplicate', entry) },
    {
      value: 'edit',
      label: 'Edit',
      onClick: (entry) => console.info('Edit', entry),
      shouldDisplay: (row) => row.status === 'draft',
    },
    { value: 'delete', label: 'Delete', onClick: (entry) => console.info('Delete', entry) },
    // { value: 'download', label: 'Download', onClick: (entry) => console.info('Download', entry) },
    { value: 'view', label: 'View', onClick: (entry) => navigate(`${ROUTES.invoices}/${entry._id}`) },
  ];

  const onStatusChange = (status, data) => dispatch(updateInvoice({ _id: data._id, paymentStatus: status }));

  const columns = [
    { id: 'invoiceNumber', display: (data) => data.invoiceNumber, displayName: 'Invoice #', width: 10 },
    {
      id: 'projectName',
      display: (data) => (
        <TextWithTag text={data.projectName} tag={data.status} variant={tagColorByStatus[data.status]} />
      ),
      displayName: 'Project Name',
      width: 30,
    },
    {
      id: 'paymentDueDate',
      display: (data) => <span className="no-wrap">{data.paymentDueDate}</span>,
      displayName: 'Due Date',
      width: 15,
    },
    { id: 'totalAmount', display: (data) => `$${data.totalAmount}`, displayName: 'Amount', width: 15 },
    {
      id: 'paymentStatus',
      display: (data) => (
        <Status
          value={data.paymentStatus}
          options={statusOptions}
          onChange={(status) => onStatusChange(status, data)}
        />
      ),
      displayName: 'Payment Status',
      width: 15,
      align: 'right',
    },
  ];

  const actionButtonConfig = {
    label: 'New Invoice',
    onClick: () => navigate(ROUTES.newInvoice),
  };

  const filtersConfig = {
    sortValue: sortBy,
    searchValue: searchKeyword,
    sortOptions: [
      { value: 'status', label: 'Status' },
      { value: 'paymentStatus', label: 'Payment Status' },
    ],
    onSortOptionChange: setSortBy,
    onSearchChange: setSearchKeyword,
  };

  const getRows = () => {
    return invoicesData.results?.map((invoice) => {
      const paymentDueDate = moment(invoice.paymentDueDate).format(DATE_FORMAT);
      return { ...invoice, paymentDueDate };
    });
  };

  return (
    <Container className={styles.invoices}>
      <ApplicationFilters actionButtonConfig={actionButtonConfig} filtersConfig={filtersConfig} />
      <CustomTable
        mobileCaption="Invoices"
        rows={getRows()}
        columns={columns}
        actions={invoiceActions}
        onRemoveItems={(ids) => dispatch(removeInvoices(ids))}
      />
    </Container>
  );
};

export default Invoices;
