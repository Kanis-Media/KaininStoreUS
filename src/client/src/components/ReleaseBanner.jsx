import React from 'react';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import '../styles/App.css'
const ReleaseBanner = React.forwardRef((props, ref) => {
  const location = useLocation();
  if (location.pathname !== "/") return null;

  return (
    <div fluid ref={ref} className="release-banner">
      <h1>Infinite, Spring 2026</h1>
    </div>
  );
});

export default ReleaseBanner;