/* eslint-disable react/destructuring-assignment */
import React from 'react';

import { Card, CardContent, Typography, Container } from '@mui/material';
import SquareIcon from '@mui/icons-material/Square';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

const IncomesGraphCard = (props) => {
  const { monthlyIncome } = props;
  // Chart code based on https://react-chartjs-2.js.org/examples/vertical-bar-chart
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'none',
      },
    },
  };

  const labels = [];
  const data = [];
  let totalIncome = 0;

  if (monthlyIncome !== undefined && monthlyIncome.length > 0) {
    const currentMonth = new Date().getMonth();
    for (let pos = currentMonth + 1; pos < monthlyIncome.length; pos++) {
      labels.push(monthlyIncome[pos].month);
      data.push(monthlyIncome[pos].income);
      totalIncome += monthlyIncome[pos].income;
    }

    for (let pos = 0; pos <= currentMonth; pos++) {
      labels.push(monthlyIncome[pos].month);
      data.push(monthlyIncome[pos].income);
      totalIncome += monthlyIncome[pos].income;
    }
  }

  const graphData = {
    labels,
    datasets: [
      {
        // label: 'Total Income',
        data,
        backgroundColor: 'rgb(112, 219, 210)',
      },
    ],
  };

  return (
    <Card className="graph-card">
      <CardContent>
        <Typography className="card-title">Incomes History (last year)</Typography>
        <Container className="horizontal-graph">
          <Bar options={options} data={graphData} />
        </Container>
        <Typography className="graph-caption">
          <SquareIcon className="incomeIcon" />
          Total Income
        </Typography>
        <Typography className="total-value">$ {totalIncome}</Typography>
      </CardContent>
    </Card>
  );
};

export default IncomesGraphCard;
