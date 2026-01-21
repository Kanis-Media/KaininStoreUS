import React from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";

function LoginPage() {
    return (
        <Container fluid className="full-screen-container px-0">
           <div className="justify-content-center" style={{textAlign: 'center'}}>
                <Card style={{ width: '20rem',  }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>Card Title</Card.Title>
                            <Card.Text>
                             Choose How to sign in 
                            </Card.Text>
                            <Button variant="primary">Sign in with apple</Button>
                            <Button variant="primary">Sign in with google</Button>
                            <input type="text" id="username" name="username" placeholder="Enter your username"></input>
                        </Card.Body>
                </Card>
            </div>
        </Container>    
    );
}

export default LoginPage;