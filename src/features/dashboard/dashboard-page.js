import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useOutletContext, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Container, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import CustomTable from 'components/table/table';
import DateRangeFilter from 'features/filters/date-range-filter';
import { TextWithTag } from 'components/data-visualization/data-visualization';
import DashboardCard from 'components/DashboardCard';
import IncomesGraphCard from 'components/IncomesGraphCard';
import InvoiceSummaryGraphCard from 'components/InvoiceSummaryGraphCard';
import { ROUTES, DATE_FORMAT } from 'common/constants';
import { getSummary, getProjects, getInvoices } from './dashboard-slice';
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
    dispatch(getProjects());//here or within its own effect?
    dispatch(getInvoices());//here or within its own effect?
  }, [dispatch, filtersConfig.rangeValue]);

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

  const tagColorByStatus = {
    draft: 'primary',
    sent: 'secondary',
    scheduled: 'tertiary',
  };

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
      displayName: <Link to="/projects">View all</Link>,
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
      display: ({ view }) => <TextWithTag tag={view} variant={tagColorByStatus[view]} />,
      displayName: <Link to="/invoices">View all</Link>,
      width: 15,
    },
  ];

  let projectsData =
    summaryData.projects !== undefined && summaryData.projects.length > 0
      ? [...summaryData.projects].map((project) => ({
          projectNames: project !== undefined ? `${project.name}\n${project.client.name}` : '-',
          view: project !== undefined ? `END DATE\n${moment(project.endDate).format(DATE_FORMAT)}` : '-',
        }))
      : [];

  let invoicesData =
    summaryData.results !== undefined && summaryData.results.length > 0
      ? [...summaryData.results].map((invoice) => ({
          invoice: invoice !== undefined ? `${invoice.invoiceNumber}\n${invoice.project.name}` : '-',
          view: invoice !== undefined ? invoice.status.toUpperCase() : '-',
        }))
      : [];

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
