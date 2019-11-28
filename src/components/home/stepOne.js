import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { createPlayer } from '../../services/firebase';
import { appContext } from '../../app';
import { Input } from '../input';
import { Section } from '../section';
import { Title } from '../title';
import { Button } from '../button';

const NextStepButton = styled(Button)`
  margin-top: 25px;
`;

export const StepOne = ({ setCurrentStep }) => {
  const { updateContext, ...context } = useContext(appContext);
  const { gameId } = context;
  const [playerName, setPlayerName] = useState();

  function handlePlayerNameChange(event) {
    setPlayerName(event.target.value);
  }

  function nextStep() {
    updateContext({ playerName });
    createPlayer({ gameId, playerName });
    setCurrentStep(2);
  }

  return (
    <Section>
      <Title>What's Your Name?</Title>
      <Input onChange={handlePlayerNameChange} />
      <NextStepButton onClick={nextStep}>Next</NextStepButton>
    </Section>
  );
};
