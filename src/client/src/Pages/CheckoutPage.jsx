import React from "react";
import { Container } from "react-bootstrap";
import { PaymentForm } from 'react-square-web-payments-sdk';

function CheckoutPage() {
  <Container fluid className=" full-screen-container px-0">
    <PaymentForm
            applicationId="sandbox-XXXXXX"
            cardTokenizeResponseReceived={(token, verifiedBuyer) => {
              console.log('token:', token);
              console.log('verifiedBuyer:', verifiedBuyer);
            }}
            locationId='XXXXXXXXXX'
          >
    </PaymentForm>
  </Container>
}
export default CheckoutPage;