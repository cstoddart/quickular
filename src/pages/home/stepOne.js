import React, { useContext } from 'react';
import Chance from 'chance';

import { createGame } from '../../services/firebase';
import { appContext } from '../../app';
import { useShortcut } from '../../hooks/useShortcut';
import { Section } from '../../components/section';
import { Title } from '../../components/title';
import { Button } from '../../components/button';

const chance = new Chance();

export const StepOne = ({ setCurrentStep }) => {
  const { updateContext } = useContext(appContext);
  
  useShortcut({
    eventType: 'keydown',
    triggerKey: 'Enter',
    eventHandler: handleStartGame,
  });

  function handleStartGame() {
    const randomGuid = chance.guid();
    createGame({ gameId: randomGuid });
    updateContext({ gameId: randomGuid });
    setCurrentStep(2);
  };

  return (
    <Section>
      <Title>Welcome To Quickular</Title>
      <Button onClick={handleStartGame}>Start New Game</Button>
    </Section>
  );
};
