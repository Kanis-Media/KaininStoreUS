'use client';
import React, {useState, useEffect} from "react"
import {Container, Col, Row} from 'react-bootstrap'
import SequentialAnimations from "../components/SequentialAnimations.jsx"
import ReleaseBanner from "../components/ReleaseBanner.jsx"
import '../styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";

//Testing push changes 

function UserHomePage(){

  return(
    <Container fluid className="full-screen-container px-0" style={{overflow: "hidden"}}>
      <ReleaseBanner />
      <div>
        <SequentialAnimations />
      </div>
    </Container>);
}

export default UserHomePage;