import React from 'react';

import { Card, CardContent, Typography, Container } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const InvoiceSummaryGraphCard = (props) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const { totalInvoiced, paymentsReceived, totalOverdue } = props;

  const data = {
    labels: [],
    datasets: [
      {
        label: null,
        data: [totalInvoiced, paymentsReceived, totalOverdue],
        backgroundColor: [
          'rgb(75, 77, 237)',
          'rgb(37, 167, 156)',
          'rgb(240, 131, 87)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className="graph-card">
      <CardContent>
        <Typography className="card-title">Invoice Summary</Typography>
        <Container className="graph-container">
          <Container className="vertical-graph">
            <Doughnut data={data} />
          </Container>
          <Container className="final-values">
            <Container className="final-invoiced">
              <Typography>Total Invoiced</Typography>
              <Typography className="final-value">$ {totalInvoiced}</Typography>
            </Container>

            <Container className="final-payments">
              <Typography>Payments Received</Typography>
              <Typography className="final-value">$ {paymentsReceived}</Typography>
            </Container>

            <Container className="final-overdue">
              <Typography>Total Overdue</Typography>
              <Typography className="final-value">$ {totalOverdue}</Typography>
            </Container>
          </Container>
        </Container>
      </CardContent>
    </Card>
  );
};

export default InvoiceSummaryGraphCard;
