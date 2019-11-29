import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { setPlayerReactionTime } from '../services/firebase';
import { appContext } from '../app';
import { colors } from '../constants';
import { Button } from './button';

const StyledReactionSquares = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
  margin-bottom: 25px;
  justify-content: center;
  max-width: 350px;
`;

const ReactionSquare = styled.div`
  height: 150px;
  width: 150px;
  background-color: ${({ color }) => color};
  cursor: pointer;
  border-radius: 25px;
  margin: 10px;

  ${({ disabled }) => disabled && `
    pointer-events: none;
  `}
`;

const ResultsLink = styled(Button)`
  margin-top: 25px;
`;

const reactionSquares = [
  { index: 0 },
  { index: 1 },
  { index: 2 },
  { index: 3 },
  { index: 4 },
  { index: 5 },
];

export const ReactionSquares = ({ practice }) => {
  const { updateContext, ...context } = useContext(appContext);
  const { gameId, playerName } = context;
  const [color, setColor] = useState('gray');
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [targetIndex, setTargetIndex] = useState(null);

  useEffect(() => {
    if (targetIndex) return;
    const randomIndex = Math.floor(Math.random() * reactionSquares.length);
    setTargetIndex(randomIndex);
  }, [targetIndex]);

  useEffect(() => {
    setTimeout(function() {
      setColor(colors.pink);
      setStartTime(new Date().getTime());
    }, 2000);
  }, []);
  
  const handleClick = () => {
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
    setTargetIndex(null);

    setTimeout(function() {
      setColor(colors.pink);
      setStartTime(new Date().getTime());
    }, 2000);
  }

  return (
    <>
      <StyledReactionSquares>
        {reactionSquares.map(({ index }) => {
          if (index === targetIndex) {
            return <ReactionSquare key={index} onMouseDown={handleClick} onTouchStart={handleClick} disabled={!startTime || isGameFinished} color={color} />
          }

          return <ReactionSquare key={index} color="gray" />
        })}
      </StyledReactionSquares>
      {reactionTime && 
        <>
          <div>Your reaction time: {reactionTime}ms</div>
          {practice
            ? <ResultsLink onClick={retry}>Retry</ResultsLink>
            : <ResultsLink to={'/results'}>View Results</ResultsLink>
          }
        </>
      }
    </>
  );
};
