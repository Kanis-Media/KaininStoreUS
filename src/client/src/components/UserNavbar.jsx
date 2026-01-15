import React from "react";
import { useState } from "react";
import KaininTxt from '../assets/KaininText.png'
import LeafKainin from '../assets/LeafKainin.png'
import Bag from '../assets/Bag.svg'
import User from '../assets/User.svg'
import Container from "react-bootstrap/esm/Container"
import "../styles/Navbar.css"
import "../styles/App.css"
import { Navbar, Nav, Col, Row, Offcanvas } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';


const UserNavbar = React.forwardRef((props, ref) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Set the breakpoint for the sidebar behavior
  const expandBreakpoint = 'md'

  return (
    <Row ref={ref} className="custom-navbar-row">
      <Col xs={12}>
        <Navbar expand={expandBreakpoint} className='custom-navbar'>
          <Container fluid className="d-flex align-items-center justify-content-between">
            <Navbar.Toggle onClick={handleShow} />
            {/*Mobile navbar*/}
            {/*div instead of nav due to navbar-nav bs css class flexing by col */}
            <div 
              className="d-flex d-md-none align-items-center justify-content-end right-icons gap-3"
              style={{flexShrink: 0 }}
            >
              <Nav.Link as={Link} to="/">
                <img src={LeafKainin} width="20" alt="Leaf Kainin" />
              </Nav.Link>
                <Nav.Link as={Link} to="/bag">
                    <img src={Bag} width="20" alt="Bag" className="d-inline-block align-top" />
                </Nav.Link>
                
                {!isAuthenticated ? (
                  <button onClick={() => loginWithRedirect()}>
                    <img src={User} width="20" alt="User" />
                  </button>
                  ) : (
                    <Nav.Link as={Link} to="/account">
                        <img src={User} width="20" alt="User"/>
                    </Nav.Link>
                  )
                }
            </div>
            <div className="d-none d-md-flex w-100 justify-content-between">

              {/* Left Section */}
              <Nav
                className="d-none d-md-flex align-items-center gap-2"
                style={{ minWidth: '200px', flexShrink: 0 }}
              >
                <Nav.Link as={Link} to="/">
                  <img src={LeafKainin} width="40" alt="Leaf" />
                </Nav.Link>
            
                <Nav.Link as={Link} to="/about">About US</Nav.Link>
                <Nav.Link as={Link} to="/products">Products</Nav.Link>
              </Nav>

              {/* Center Section */}
              <Nav className="d-flex d-xs-none d-md-block justify-content-center flex-grow-1">
                <Nav.Link as={Link} to="/" id="navImage">
                  <img className="centered-image mx-auto" src={KaininTxt} width="200" alt="KAININ" />
                </Nav.Link>
              </Nav>

              {/* Right Section */}
              <Nav
                className="d-flex align-items-center gap-3 justify-content-end"
                style={{ minWidth: '200px', flexShrink: 0 }}
              >
                <Nav.Link as={Link} to="/bag">
                    <img src={Bag} width="40" alt="Bag" className="d-inline-block align-top" />
                </Nav.Link>
                
                {!isAuthenticated ? (
                  <button className="nav-icon-btn" onClick={() => loginWithRedirect()}>
                    <img src={User} width="40" alt="User" className="d-inline-block align-top" />
                  </button>
                  ) : (
                    <Nav.Link as={Link} to="/account">
                        <img src={User} width="40" alt="User" className="d-inline-block align-top" />
                    </Nav.Link>
                  )
                }
              </Nav>
            </div>
          </Container>
        </Navbar>

        {/* Offcanvas component for the sidebar on mobile */}
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="start"
          className="d-flex d-md-none"
          style={{ backgroundColor: "#3e4f2b" }}
          container={document.getElementById('root')}
        >
          <Offcanvas.Header closeButton>
            <Nav.Link as={Link} to="/" id="navImage">
              <img
                className="centered-image mx-auto"
                src={KaininTxt}
                style={{ maxWidth: "100%", height: "auto" }}
                width="200"
                alt="Kainin Txt"
              />
            </Nav.Link>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/" onClick={handleClose}>Home</Nav.Link>
              <Nav.Link href="#link" onClick={handleClose}>Link</Nav.Link>
              <Nav.Link href="#about" onClick={handleClose}>About</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>


      </Col>
    </Row>
  );
})

export default UserNavbar;