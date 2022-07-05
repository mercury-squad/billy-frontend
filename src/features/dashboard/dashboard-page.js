import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router';

import { Container } from '@mui/material';

import DateRangeFilter from 'features/filters/date-range-filter';
import DashboardCard from 'components/DashboardCard';
import IncomesGraphCard from 'components/IncomesGraphCard';
import InvoiceSummaryGraphCard from 'components/InvoiceSummaryGraphCard';
import styles from './dashboard-page.module.scss';

const PAGE_TITLE = 'Dashboard';
const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const [setHeaderTitle] = useOutletContext();

  useEffect(() => setHeaderTitle(PAGE_TITLE), [setHeaderTitle]);

  const filtersConfig = {
    rangeValue: '12months',
    rangeOptions: [
      { value: '12months', label: 'Last 12 months' },
      { value: '6months', label: 'Last 6 months' },
      { value: '3months', label: 'Last 3 months' },
      { value: '1month', label: 'Last month' },
    ],
    onRangeOptionChange: () => {},
  };

  let cardsText = [
    {
      cardValue: 5,
      cardLabel: 'Ongoing Projects',
    },
    {
      cardValue: '$ 23456,78',
      cardLabel: 'Total Invoices',
    },
    {
      cardValue: '$ 567,99',
      cardLabel: 'Pending Invoices',
    },
    {
      cardValue: '$ 909,30',
      cardLabel: 'Total Overdue',
    },
  ];

  let totalIncome = "$ 23456,78";
  let totalInvoiced = "$ 23456,78";
  let paymentsReceived = "$ 22100,10";
  let totalOverdue = "$ 909,30";

  return (
    <Container className={styles.dashboard}>
      <DateRangeFilter filtersConfig={filtersConfig} />
      <section className="cards">
        {cardsText.map((card) => (
         <DashboardCard className="card" key={card.cardValue} cardLabel={card.cardLabel} cardValue={card.cardValue} />)
        )}
      </section>
      <section className="graphs-cards">
        <IncomesGraphCard className="card" totalIncome={totalIncome} />
        <InvoiceSummaryGraphCard className="card" totalInvoiced={totalInvoiced} paymentsReceived={paymentsReceived} totalOverdue={totalOverdue} />
      </section>
    </Container>
  );
};

export default Dashboard;
