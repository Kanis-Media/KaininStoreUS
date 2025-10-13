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
  // const [users, setUsers] = useState([]);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);


//  useEffect(() => {
//   axios.get("/api/users")
//     .then(response => {
//       setUsers(response.data); // Axios auto-parses JSON
//       setLoading(false);
//     })
//     .catch(err => {
//       setError(err);
//       setLoading(false);
//     });
//   }, []);

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }
  // if (loading) {
  //   return <div>Loading...</div>;
  // }


  return(
    <Container fluid className="full-screen-container px-0">
      {/* <h1>{message}</h1> */}
      <ReleaseBanner />
      <SequentialAnimations />
{/* 
       <Container className="mt-4">
        <h2>User List</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {JSON.stringify(user)}
            </li>
          ))}
        </ul>
      </Container> */}

    </Container>);
}

export default UserHomePage;