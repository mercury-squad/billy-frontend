import React from 'react';

import { Card, CardContent, Typography } from '@mui/material';

const DashboardCard = (props) => {
  return (
    <Card sx={{ minWidth: 260 }}>
      <CardContent>
        <Typography className="card-value">{props.cardValue}</Typography>
        <Typography className="card-label">{props.cardLabel}</Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
