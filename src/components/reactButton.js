import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledReactButton = styled.div`
  height: 250px;
  width: 250px;
  background-color: ${({ color }) => color};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'initial'};
`;

export const ReactButton = (props) => {
  const [color, setColor] = useState('gray');
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    setTimeout(function() {
      setColor('pink');
      setStartTime(new Date().getTime());
    }, 2000);
  }, []);
  
  const handleClick = () => {
    console.log('CLICKING...', );
    setEndTime(new Date().getTime());
  }
  console.log('REACTION TIME', endTime - startTime);
  return (
    <StyledReactButton onClick={startTime ? handleClick : null} color={color} disabled={!startTime} />
  );
};
