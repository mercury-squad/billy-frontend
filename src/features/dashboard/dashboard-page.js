import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useOutletContext, useNavigate } from 'react-router';

import { Container, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import CustomTable from 'components/table/table';
import DateRangeFilter from 'features/filters/date-range-filter';
import DashboardCard from 'components/DashboardCard';
import IncomesGraphCard from 'components/IncomesGraphCard';
import InvoiceSummaryGraphCard from 'components/InvoiceSummaryGraphCard';
import { ROUTES } from 'common/constants';
import { getSummary } from './dashboard-slice';
import styles from './dashboard-page.module.scss';

const PAGE_TITLE = 'Dashboard';
const Dashboard = () => {
  const user = useSelector((state) => state.user);
  let summaryData = useSelector((state) => state.summary);
  const [setHeaderTitle] = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filtersConfig = {
    rangeValue: '12',
    rangeOptions: [
      { value: '12', label: 'Last 12 months' },
      { value: '6', label: 'Last 6 months' },
      { value: '3', label: 'Last 3 months' },
      { value: '1', label: 'Last month' },
    ],
    onRangeOptionChange: () => {},
  };

  useEffect(() => setHeaderTitle(PAGE_TITLE), [setHeaderTitle]);
  useEffect(() => {
    dispatch(getSummary(filtersConfig.rangeValue));
  }, [dispatch]);

  let cardsText = [
    {
      id: 'ongoing_projects',
      cardValue: summaryData !== undefined ? summaryData.onGoingProjects : 0,
      cardLabel: 'Ongoing Projects',
    },
    {
      id: 'total_invoices',
      cardValue: summaryData !== undefined ? `$ ${summaryData.totalInvoice}` : 0,
      cardLabel: 'Total Invoices',
    },
    {
      id: 'pending_invoices',
      cardValue: summaryData !== undefined ? `$ ${summaryData.pendingInvoice}` : 0,
      cardLabel: 'Pending Invoices',
    },
    {
      id: 'total_overdue',
      cardValue: summaryData !== undefined ? `$ ${summaryData.totalOverdue}` : 0,
      cardLabel: 'Total Overdue',
    },
  ];

  const commonDisplay = (data) => (
    <>
      {data.split('\n').map((item, i) => (
        <p key={i}>{item}</p>
      ))}
    </>
  );

  const projectColumns = [
    {
      id: 'projectNames',
      display: ({ projectNames }) => commonDisplay(projectNames),
      displayName: 'Projects',
      width: 30,
    },
    {
      id: 'view',
      display: ({ view }) => commonDisplay(view),
      displayName: 'View all',
      width: 15,
    },
  ];

  const invoicesColumns = [
    {
      id: 'invoice',
      display: ({ invoice }) => commonDisplay(invoice),
      displayName: 'Latest Invoices',
      width: 30,
    },
    {
      id: 'view',
      display: ({ view }) => commonDisplay(view),
      displayName: 'View all',
      width: 15,
    },
  ];

  //const projectsData = useSelector((state) => state.projects);
  const projectsData = [
    { projectNames: 'Web Page creation\nClient Name 1', view: 'END DATE\n2022-07-21' },
    { projectNames: 'Company Logo design\nClient Name 2', view: 'END DATE\n2022-08-11' },
  ];
  const invoicesData = [
    { invoice: 'INV 001\nWeb Page creation', view: 'DRAFT' },
    { invoice: 'INV 002\nCompany Logo design', view: 'SCHEDULE' },
  ];

  const onclickInvoice = () => navigate(ROUTES.newInvoice);
  const onclickProject = () => {};

  return (
    <Container className={styles.dashboard}>
      <DateRangeFilter filtersConfig={filtersConfig} />
      <section className="cards">
        {cardsText.map((card) => (
          <DashboardCard className="card" key={card.id} cardLabel={card.cardLabel} cardValue={card.cardValue} />
        ))}
      </section>
      <section className="graphs-cards">
        <IncomesGraphCard className="card" totalIncome={summaryData.totalInvoice} />
        <InvoiceSummaryGraphCard
          className="card"
          totalInvoiced={summaryData.totalInvoice}
          paymentsReceived={summaryData.totalPaymentsReceived}
          totalOverdue={summaryData.totalOverdue}
        />
      </section>
      <section className="tables">
        <CustomTable className="summary-table" rows={projectsData} columns={projectColumns} />
        <CustomTable className="summary-table" rows={invoicesData} columns={invoicesColumns} />
      </section>
      <section className="buttons">
        <Button size="large" className="button" variant="contained" onClick={onclickProject}>
          <AddIcon />
          New Project
        </Button>
        <Button size="large" className="button" variant="contained" onClick={onclickInvoice}>
          <AddIcon />
          New Invoice
        </Button>
      </section>
    </Container>
  );
};

export default Dashboard;
