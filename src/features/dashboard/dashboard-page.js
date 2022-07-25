import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useOutletContext, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { ReactComponent as ProjectIcon } from 'assets/img/project-icon.svg';
import { ReactComponent as ClientIcon } from 'assets/img/client-icon.svg';
import { ReactComponent as InvoiceIcon } from 'assets/img/invoice-icon.svg';

import {
  Container,
  Button,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
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
  const [filterBy, serFilterBy] = useState('12');
  const [setHeaderTitle] = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filtersConfig = {
    rangeValue: filterBy,
    rangeOptions: [
      { value: '12', label: 'Last 12 months' },
      { value: '6', label: 'Last 6 months' },
      { value: '3', label: 'Last 3 months' },
      { value: '1', label: 'Last month' },
    ],
    onRangeOptionChange: (e) => serFilterBy(e.target.value),
  };

  useEffect(() => setHeaderTitle(PAGE_TITLE), [setHeaderTitle]);
  useEffect(() => {
    dispatch(getSummary(filterBy));
    dispatch(getProjects());
    dispatch(getInvoices());
  }, [dispatch, filterBy]);

  const cardsText = [
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
    DRAFT: 'primary',
    SENT: 'secondary',
    SCHEDULED: 'tertiary',
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

  const projectsData =
    summaryData.projects !== undefined && summaryData.projects.length > 0
      ? [...summaryData.projects].map((project) => ({
          id: project !== undefined ? project._id : '-',
          projectNames: project !== undefined ? `${project.name}\n${project.client.name}` : '-',
          view: project !== undefined ? `END DATE\n${moment(project.endDate).format(DATE_FORMAT)}` : '-',
        }))
      : [];

  const invoicesData =
    summaryData.results !== undefined && summaryData.results.length > 0
      ? [...summaryData.results].map((invoice) => ({
          id: invoice !== undefined ? invoice.invoiceNumber : '-',
          invoice: invoice !== undefined ? `${invoice.invoiceNumber}\n${invoice.project.name}` : '-',
          view: invoice !== undefined ? invoice.status.toUpperCase() : '-',
        }))
      : [];

  const onclickInvoice = () => navigate(ROUTES.newInvoice);
  const onclickProject = () => navigate(ROUTES.newProjects);

  if (summaryData.projects === undefined || summaryData.projects.length <= 0) {
    return (
      <Container className={styles.empty_dashboard}>
        <Typography className="empty-title">New to Billy? Let&apos;s start from</Typography>
        <nav aria-label="main projects invoices">
          <List>
            <ListItem className="newclient-option" onClick={() => navigate(ROUTES.newClients)} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ClientIcon sx={{ fontSize: 16 }} />
                </ListItemIcon>
                <ListItemText primary="Add client" />
              </ListItemButton>
            </ListItem>
            <ListItem className="newclient-option" onClick={() => navigate(ROUTES.newProjects)} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ProjectIcon />
                </ListItemIcon>
                <ListItemText primary="New project" />
              </ListItemButton>
            </ListItem>
            <ListItem className="newclient-option" onClick={() => navigate(ROUTES.newInvoice)} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InvoiceIcon />
                </ListItemIcon>
                <ListItemText primary="Create an invoice" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Container>
    );
  }

  return (
    <Container className={styles.dashboard} style={{ padding: '1rem' }}>
      <DateRangeFilter filtersConfig={filtersConfig} />
      <section className="cards">
        {cardsText.map((card) => (
          <DashboardCard className="card" key={card.id} cardLabel={card.cardLabel} cardValue={card.cardValue} />
        ))}
      </section>
      <section className="graphs-cards">
        <IncomesGraphCard className="card" monthlyIncome={summaryData.monthlyIncome} />
        <InvoiceSummaryGraphCard
          className="card"
          totalInvoiced={summaryData.totalInvoice}
          paymentsReceived={summaryData.totalPaymentsReceived}
          totalOverdue={summaryData.totalOverdue}
        />
      </section>
      <section className="tables">
        <CustomTable className="summary-table" asDesktop rows={projectsData} columns={projectColumns} />
        <CustomTable className="summary-table" asDesktop rows={invoicesData} columns={invoicesColumns} />
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
