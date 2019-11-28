import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { setPlayerReactionTime } from '../services/firebase';
import { appContext } from '../app';
import { colors } from '../constants';
import { Button } from './button';

const StyledReactButton = styled.div`
  height: 250px;
  width: 250px;
  background-color: ${({ color }) => color};
  cursor: pointer;
  border-radius: 25px;
  margin-bottom: 25px;
`;

const ResultsLink = styled(Button)`
  margin-top: 25px;
`;

export const ReactionSquares = () => {
  const { updateContext, ...context } = useContext(appContext);
  const { gameId, playerName } = context;
  const [color, setColor] = useState('gray');
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [isGameFinished, setIsGameFinished] = useState(false);

  useEffect(() => {
    setTimeout(function() {
      setColor(colors.pink);
      setStartTime(new Date().getTime());
    }, 2000);
  }, []);
  
  const handleClick = () => {
    const now = new Date().getTime();
    setReactionTime(now - startTime);
    setPlayerReactionTime({ gameId, playerName, reactionTime: now - startTime });
    setIsGameFinished(true);
  };

  return (
    <>
      <StyledReactButton onClick={startTime && !isGameFinished ? handleClick : null} color={color} />
      {reactionTime && 
        <>
          <div>Your reaction time: {reactionTime}ms</div>
          <ResultsLink to={'/results'}>View Results</ResultsLink>
        </>
      }
    </>
  );
};
