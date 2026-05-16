import React from "react";
import { Container, Col, Row, Card, Button } from "react-bootstrap";
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function LoginPage() {
        const query = useQuery();
        const provider = query.get('provider');

        const handleSuperTokens = () => {
                // Redirect to server-side SuperTokens auth start endpoint.
                // The server must implement the /auth/supertokens route to initiate the flow.
                window.location.href = '/auth/supertokens';
        }

        return (
                <Container fluid className="full-screen-container px-0">
                     <div className="justify-content-center" style={{textAlign: 'center'}}>
                                <Card style={{ width: '20rem' }}>
                                                <Card.Body>
                                                        <Card.Title>Sign In</Card.Title>
                                                        <Card.Text>
                                                         Choose how to sign in
                                                        </Card.Text>
                                                        {provider === 'supertokens' ? (
                                                                <>
                                                                    <Button variant="primary" onClick={handleSuperTokens}>Sign in with SuperTokens</Button>
                                                                    <div style={{marginTop: '10px', fontSize: '0.85rem', color: '#666'}}>
                                                                        Clicking will redirect to <code>/auth/supertokens</code> — ensure server-side SuperTokens routes exist.
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Button variant="primary">Sign in with Apple</Button>
                                                                    <Button variant="primary" style={{marginLeft: '8px'}}>Sign in with Google</Button>
                                                                </>
                                                            )}
                                                </Card.Body>
                                </Card>
                        </div>
                </Container>
        );
}

export default LoginPage;