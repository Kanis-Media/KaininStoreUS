// 
import React from 'react';
import styled from 'styled-components';

// Define styled components OUTSIDE the component function
const Container = styled.div`
  display: flex;
  height: 100vh;
  margin: 1%;
`;

const Pane = styled.div`
  flex: ${props => props.weight};
  overflow-y: auto;
  min-height: 100vh; /* Ensures pane is always full height */
`;

export default function SplitScreen({ leftWeight, rightWeight, children }) {
  const [left, right] = React.Children.toArray(children);

  return (
    <Container>
      <Pane weight={leftWeight}>{left}</Pane>
      <Pane weight={rightWeight}>{right}</Pane>
    </Container>
  );
}