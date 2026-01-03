import React from "react";
import Container from 'react-bootstrap/Container';
import { PaymentForm } from 'react-square-web-payments-sdk';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function BagPage(){
  return(
    <Container fluid className=" full-screen-container px-0">
        <p>Bag Bag Overview Page</p>
        <Link to="/checkout">Checkout</Link>
    </Container>);
}

export default BagPage;
