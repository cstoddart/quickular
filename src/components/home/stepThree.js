import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';

import { appContext } from '../../app';
import { Section } from '../section';
import { Title } from '../title';
import { Button } from '../button';

const GameLink = styled.div`
  margin-bottom: 25px;
  color: white;
  text-decoration: underline;
`;

const CopyText = styled.textarea`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  padding: 0;
`;

const NextStepButton = styled(Button)`
  margin-top: 25px;
`;

export const StepThree = ({
  setCurrentStep,
  host,
}) => {
  const { updateContext, ...context } = useContext(appContext);
  const { gameId } = context;
  const [hasCopiedText, setHasCopiedText] = useState(false);
  const copyTextRef = useRef();

  function copyToClipboard() {
    copyTextRef.current.select();
    document.execCommand('copy');
    setHasCopiedText(true);
  };

  function nextStep() {
    setCurrentStep(4);
  }

  return (
    <Section>
      <Title>Share This Link</Title>
      <GameLink onClick={copyToClipboard}>{`${host}/play?gameId=${gameId}`}</GameLink>
      <CopyText value={`${host}/play?gameId=${gameId}`} ref={copyTextRef} readOnly />
      {hasCopiedText
        ? <NextStepButton onClick={nextStep}>Next</NextStepButton>
        : <NextStepButton onClick={copyToClipboard}>Copy To Clipboard</NextStepButton>
      }
    </Section>
  );
};
