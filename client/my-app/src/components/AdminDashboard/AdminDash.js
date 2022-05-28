import React from 'react';
import Grid from '@mui/material/Grid';
import { Box, CssBaseline, styled, Typography } from '@mui/material';
import BarChart from './BarChart';
import TotalNum from './student/TotalNum';
import FourMonths from './student/FourMonths';
import SixMonths from './student/SixMonths';

const Item = styled(Typography)({
  fontSize: 40,
  paddingTop: 100,
  paddingLeft: 10,
  fontWeight: 'bold',
  color: 'white'
});


export default function AdminDAsh() {

  return (
    <Grid sx={{ flexGrow: 1 }} container>
      <CssBaseline />
      <Grid item xs={12}>
        <Grid
          container
          justifyContent= "center"
          spacing={3}
          mb={7}
        >
          <Grid item>
            <TotalNum Item={Item}/>
          </Grid>
          <Grid item>
            <FourMonths Item={Item}/>
          </Grid>
          <Grid item>
            <SixMonths Item={Item}/>
          </Grid>
        </Grid>
        <Grid item >
          <Box component='div' sx={{maxWidth: '70%', margin: 'auto'}}>
            <BarChart />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}