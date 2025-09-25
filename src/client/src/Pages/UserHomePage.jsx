'use client';
import React, {useState, useEffect} from "react"
import {Container, Col, Row} from 'react-bootstrap'
import SequentialAnimations from "../components/SequentialAnimations.jsx"
import ReleaseBanner from "../components/ReleaseBanner.jsx"
import '../styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'


function UserHomePage(){
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/database")
      .then(res => res.json())
      .then(json => setUsers(json.users));
    // Specify how to clean up after this effect:
    return () => {};
  }, []); // empty 2nd arg - only runs once

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  return(
    <Container fluid className="full-screen-container px-0">
      {/* <h1>{message}</h1> */}
      <ReleaseBanner />
      <SequentialAnimations />
    </Container>);
}

export default UserHomePage;