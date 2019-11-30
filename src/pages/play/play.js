import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import styled from 'styled-components';

import { watchGameStarted, createPlayer } from '../../services/firebase';
import {
  Button,
  Title,
  Input,
  ReactionSquares,
} from '../../components';
import { appContext } from '../../app';

const PlayerNameInput = styled(Input)`
  margin-bottom: 25px;
`;

const PlayerReadyButton = styled(Button)`
  margin-bottom: 25px;
`;

export const Play = (props) => {
  const { updateContext, ...context } = useContext(appContext);
  const { gameId } = context;
  const [playerReady, setPlayerReady] = useState(!!context.playerName);
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState('');

  useEffect(function() {
    const parsedQueryString = queryString.parse(props.location.search);
    if (parsedQueryString.gameId === gameId) return;
    if (parsedQueryString.gameId && parsedQueryString.gameId !== 'null') updateContext({ gameId: parsedQueryString.gameId });
  }, [props.location.search, gameId, updateContext]);

  useEffect(function() {
    if (!gameId) return;
    watchGameStarted({ gameId, setGameStarted })
  }, [gameId]);

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  function handleClick() {
    updateContext({ playerName });
    createPlayer({ gameId, playerName });
    setPlayerReady(true);
  }

  return gameId ? (
    <>
      {gameStarted && playerReady
        ? (
          <ReactionSquares {...props} />
        ) : (
          <>
            <Title>Join Game</Title>
            <PlayerNameInput placeholder="What's your name?" value={playerName} onChange={handleChange} />
            <PlayerReadyButton onClick={handleClick}>Ready</PlayerReadyButton>
            {playerReady && (
              <div>Waiting for the host to start the game...</div>
            )}
          </>
        )
      }
    </>
  ) : <div>Contact your host for a shared link to join a game.</div>;
};
