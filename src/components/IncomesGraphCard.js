import React from 'react';

import { Card, CardContent, Typography, Container } from '@mui/material';
import SquareIcon from '@mui/icons-material/Square';

const IncomesGraphCard = (props) => {

  return (
    <Card sx={{ minWidth: 550 }}>
      <CardContent>
        <Typography className="card-title">Income vs Expense</Typography>
        <Container className="horizontal-graph">Graph</Container>
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
