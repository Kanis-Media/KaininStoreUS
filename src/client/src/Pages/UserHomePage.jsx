'use client';
import React, {useState, useEffect} from "react"
import {Container, Col, Row} from 'react-bootstrap'
import SequentialAnimations from "../components/SequentialAnimations.jsx"
import ReleaseBanner from "../components/ReleaseBanner.jsx"
import '../styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'


function UserHomePage(){
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // replaces `data`


  useEffect(() => {
    fetch("/api/database")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(json => {
        setUsers(json); // assuming json is an array of user objects
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }


  return(
    <Container fluid className="full-screen-container px-0">
      {/* <h1>{message}</h1> */}
      <ReleaseBanner />
      <SequentialAnimations />

       <Container className="mt-4">
        <h2>User List</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {JSON.stringify(user)}
            </li>
          ))}
        </ul>
      </Container>

    </Container>);
}

export default UserHomePage;