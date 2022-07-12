import React from 'react';

import { Card, CardContent, Typography, Container } from '@mui/material';
import SquareIcon from '@mui/icons-material/Square';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const IncomesGraphCard = (props) => {

  //Char code based on https://react-chartjs-2.js.org/examples/vertical-bar-chart
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'none',
      },
    },
  };

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const data = {
  labels,
  datasets: [
    {
      //label: 'Total Income',
      data: [65, 59, 80, 81, 56, 55, 40, 65, 20, 66, 71, 80],
      backgroundColor: 'rgb(75, 77, 237)',
    }
  ],
};

  return (
    <Card sx={{ minWidth: 550 }}>
      <CardContent>
        <Typography className="card-title">Income vs Expense</Typography>
        <Container className="horizontal-graph">
          <Bar options={options} data={data} />
        </Container>
        <Typography className="graph-caption">
          <SquareIcon className="incomeIcon" />
          Total Income
        </Typography>
        <Typography className="total-value">{props.totalIncome}</Typography>
      </CardContent>
    </Card>
  );
};

export default IncomesGraphCard;
