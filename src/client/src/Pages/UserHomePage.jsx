'use client';
import {Container} from 'react-bootstrap'
import SequentialAnimations from "../components/SequentialAnimations.jsx"
import ReleaseBanner from "../components/ReleaseBanner.jsx"
import {Grid, Box} from '@mui/material'
import '../styles/App.css'

function UserHomePage(){
  return(
    <Grid container fluid className="full-screen-container px-0" style={{overflow: "hidden"}}>
      <ReleaseBanner />
      <div>
        <SequentialAnimations />
      </Box>
    </Grid>);
}

export default UserHomePage;