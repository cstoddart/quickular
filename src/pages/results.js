import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { watchPlayers } from '../services/firebase';
import { Section, Title } from '../components';
import { appContext } from '../app';

const Player = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

const Results = ({
  host,
  navigate,
}) => {
  const { updateContext, ...context } = useContext(appContext);
  const { gameId, playerName } = context;
  const [players, setPlayers] = useState([]);

  useEffect(function() {
    if (!gameId ) return;
    function handlePlayerChange(allPlayers) {
      const renamedPlayers = allPlayers.map((player) => (
        player.name === playerName
          ? {
            ...player,
            name: 'You',
          } : player
      ));

      const filteredPlayers = renamedPlayers.filter((player) => !!player.reactionTime);

      setPlayers(filteredPlayers);
    }

    return watchPlayers({ gameId, setPlayers: handlePlayerChange });
  }, [gameId, playerName]);

  return (
    <Section>
      <Title>Players</Title>
      {players
        .sort((player1, player2) => player1.reactionTime - player2.reactionTime)
        .map((player, index) => (
          <Player key={player.name}>
            #{index + 1} {player.name}: {player.reactionTime}ms
          </Player>
        ))
      }
    </Section>
  );
};

export default Results;
