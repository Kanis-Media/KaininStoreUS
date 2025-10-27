import React from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

const ReleaseBanner = React.forwardRef((props, ref) => {

  const location = useLocation();

  if (location.pathname !== "/") return null;

  return (
   <Row ref={ref}>
      <Col>
        <div className="App-header">
          <h1>Infinite, Spring 2026</h1>
        </div>
      </Col>
    </Row>
  );
});

export default ReleaseBanner;