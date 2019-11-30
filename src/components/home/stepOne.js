import React, {
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import styled from 'styled-components';

import { createPlayer } from '../../services/firebase';
import { useShortcut } from '../../hooks/useShortcut';
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
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useShortcut({
    eventType: 'keydown',
    triggerKey: 'Enter',
    eventHandler: nextStep,
  });

  function handlePlayerNameChange(event) {
    setPlayerName(event.target.value);
  }

  function nextStep() {
    if (!playerName) return;
    updateContext({ playerName });
    createPlayer({ gameId, playerName });
    setCurrentStep(2);
  }

  return (
    <Section>
      <Title>What's Your Name?</Title>
      <Input onChange={handlePlayerNameChange} ref={inputRef} onKeyDown={console.log} />
      <NextStepButton onClick={nextStep}>Next</NextStepButton>
    </Section>
  );
};
