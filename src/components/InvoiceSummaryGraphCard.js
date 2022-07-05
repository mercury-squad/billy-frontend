import React from 'react';

import { Card, CardContent, Typography, Container } from '@mui/material';

const InvoiceSummaryGraphCard = (props) => {
  return (
    <Card sx={{ minWidth: 550 }}>
      <CardContent>
        <Typography className="card-title">Invoice Summary</Typography>
        <Container className="graph-container">
          <Container className="vertical-graph">Graph</Container>
          <Container className="final-values">
            <Container className="final-invoiced">
              <Typography>Total Invoiced</Typography>
              <Typography className="final-value">{props.totalInvoiced}</Typography>
            </Container>

            <Container className="final-payments">
              <Typography>Payments Received</Typography>
              <Typography className="final-value">{props.paymentsReceived}</Typography>
            </Container>

            <Container className="final-overdue">
              <Typography>Total Overdue</Typography>
              <Typography className="final-value">{props.totalOverdue}</Typography>
            </Container>
          </Container>
        </Container>
      </CardContent>
    </Card>
  );
};

export default InvoiceSummaryGraphCard;
