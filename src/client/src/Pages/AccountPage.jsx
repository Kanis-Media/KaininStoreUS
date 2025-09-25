import React from "react";
import { Container } from "react-bootstrap";
import  LogoutButton  from "../components/LogoutButton"

function AccountPage() {
    return (
        <Container fluid className="full-screen-container px-0">
            <p>Account Page </p>
            <LogoutButton />
        </Container>    
    );
}

export default AccountPage;