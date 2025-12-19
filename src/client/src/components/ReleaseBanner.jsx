import React from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Box } from '@mui/material';

const ReleaseBanner = React.forwardRef((props, ref) => {

  const location = useLocation();

  if (location.pathname !== "/") return null;

  return (
   <Grid item size={12} ref={ref}>
        <Box className="App-header">
          <h1>Infinite, Spring 2026</h1>
        </Box>
    </Grid>
  );
});

export default ReleaseBanner;