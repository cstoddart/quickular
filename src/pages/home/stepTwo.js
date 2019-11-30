import React, {
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import styled from 'styled-components';

import { createPlayer } from '../../services/firebase';
import { appContext } from '../../app';
import { Input } from '../../components/input';
import { Section } from '../../components/section';
import { Title } from '../../components/title';
import { Button } from '../../components/button';
import { useShortcut } from '../../hooks/useShortcut';

const NextStepButton = styled(Button)`
  margin-top: 25px;
`;

export const StepTwo = ({ setCurrentStep }) => {
  const { updateContext, ...context } = useContext(appContext);
  const { gameId } = context;
  const [playerName, setPlayerName] = useState(context.playerName);
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
    setCurrentStep(3);
  }

  return (
    <Section>
      <Title>What's Your Name?</Title>
      <Input onChange={handlePlayerNameChange} value={playerName} ref={inputRef} />
      <NextStepButton onClick={nextStep}>Next</NextStepButton>
    </Section>
  );
};
