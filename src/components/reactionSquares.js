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

  ${({ disabled }) => disabled && `
    pointer-events: none;
  `}
`;

const ResultsLink = styled(Button)`
  margin-top: 25px;
`;

export const ReactionSquares = ({ practice }) => {
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
    console.log('PRACTICE', practice);
    if (practice) {
      const now = new Date().getTime();
      setReactionTime(now - startTime);
      setIsGameFinished(true);
      return;
    }

    const now = new Date().getTime();
    setReactionTime(now - startTime);
    setPlayerReactionTime({ gameId, playerName, reactionTime: now - startTime });
    setIsGameFinished(true);
  };

  const retry = () => {
    setReactionTime(null);
    setColor('gray');
    setIsGameFinished(false);
    setStartTime(null);

    setTimeout(function() {
      setColor(colors.pink);
      setStartTime(new Date().getTime());
    }, 2000);
  }

  return (
    <>
      <StyledReactButton onClick={handleClick} disabled={!startTime || isGameFinished} color={color} />
      {reactionTime && 
        <>
          <div>Your reaction time: {reactionTime}ms</div>
          {practice
            ? <Button onClick={retry}>Retry</Button>
            : <ResultsLink to={'/results'}>View Results</ResultsLink>
          }
        </>
      }
    </>
  );
};
