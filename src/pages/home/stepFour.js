import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';

import { watchPlayers, startGame } from '../../services/firebase';
import check from '../../images/check.svg';
import { Section } from '../../components/section';
import { Title } from '../../components/title';
import { Button } from '../../components/button';
import { Row } from '../../components/row';
import { appContext } from '../../app';

const GameLink = styled.div`
  color: white;
  text-decoration: underline;
  margin-left: 15px;
`;

const CopyText = styled.textarea`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  padding: 0;
`;

const Player = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

const Check = styled.img`
  width: 20px;
  margin-left: 10px;
`;

const NextStepButton = styled(Button)`
  margin-top: 25px;
`;

const WaitingMessage = styled.div`
  margin-top: 25px;
`;

const StepFour = ({ host, navigate }) => {
  const { updateContext, ...context } = useContext(appContext);
  const { gameId, playerName } = context;
  const [players, setPlayers] = useState([]);
  const copyTextRef = useRef();

  useEffect(function() {
    function handlePlayerChange(allPlayers) {
      const renamedPlayers = allPlayers.map((player) => (
        player.name === playerName
          ? {
            ...player,
            name: 'You',
          } : player
      ));
      const filteredPlayers = renamedPlayers.filter((player) => !player.reactionTime);

      setPlayers(filteredPlayers);
    }
    return watchPlayers({ gameId, setPlayers: handlePlayerChange });
  }, [gameId, playerName]);

  function copyToClipboard() {
    copyTextRef.current.select();
    document.execCommand('copy');
  };

  function handleStartGame() {
    startGame({ gameId });
    navigate('/play');
  }

  return (
    <>
      <Section>
        <Title>Waiting For Players</Title>
        <Row align="center">
          <Button onClick={copyToClipboard}>Copy To Clipboard</Button>
          <GameLink onClick={copyToClipboard}>quickular.com/play?gameId={gameId}</GameLink>
          <CopyText value={`${host}/play?gameId=${gameId}`} ref={copyTextRef} readOnly />
        </Row>
      </Section>
      <Section>
        <Title>Players</Title>
        {players.map((player) => (
          <Player key={player.name}>
            {player.name} {player.name === 'You' ? 'are' : 'is'} {player.ready ? 'ready' : 'not ready'}
            <Check src={check} />
          </Player>
        ))}
        {players.length > 1
          ? <NextStepButton onClick={handleStartGame}>Start Game</NextStepButton>
          : <WaitingMessage>Waiting for more players...</WaitingMessage>
        }
      </Section>
    </>
  );
};

export default StepFour;
