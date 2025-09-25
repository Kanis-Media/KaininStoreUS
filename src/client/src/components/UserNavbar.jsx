import React from "react";
import { useState } from "react";
import KaininTxt from '../assets/KaininText.png'
import KaininLeaf from '../assets/KaininLeaf.png'
import Bag from '../assets/Bag.svg'
import User from '../assets/User.svg'
import Container from "react-bootstrap/esm/Container"
import "../styles/Navbar.css"
import "../styles/App.css"
import { Navbar, Nav, Col, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const UserNavbar = React.forwardRef((props, ref) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <Row ref={ref}>
      <Col xs={12}>
        <Navbar className='custom-navbar'>
          <Container fluid className="d-flex align-items-center justify-content-between">

            {/* Left Section */}
            <div
              className="d-flex align-items-center gap-2"
              style={{ minWidth: '200px', flexShrink: 0 }}
            >
              <Nav.Link as={Link} to="/">
                <img src={KaininLeaf} width="40" alt="Leaf" />
              </Nav.Link>
          
              <Nav.Link as={Link} to="/about">About US</Nav.Link>
              <Nav.Link as={Link} to="/products">Products</Nav.Link>
            </div>

            {/* Center Section */}
            <div className="d-flex justify-content-center flex-grow-1">
              <Nav.Link as={Link} to="/" id="navImage">
                <img className="centered-image mx-auto" src={KaininTxt} width="200" alt="KAININ" />
              </Nav.Link>
            </div>

            {/* Right Section */}
            <div
              className="d-flex align-items-center gap-3 justify-content-end"
              style={{ minWidth: '200px', flexShrink: 0 }}
            >
              <Nav.Link as={Link} to="/bag">
                  <img src={Bag} width="40" alt="Bag" className="d-inline-block align-top" />
              </Nav.Link>
              
              {!isAuthenticated ? (
                <button onClick={() => loginWithRedirect()}>
                  <img src={User} width="40" alt="User" className="d-inline-block align-top" />
                </button>
                ) : (
                  <Nav.Link as={Link} to="/account">
                      <img src={User} width="40" alt="User" className="d-inline-block align-top" />
                  </Nav.Link>
                )
              }
            </div>
          </Container>
        </Navbar>
      </Col>
    </Row>
  );
})

export default UserNavbar;