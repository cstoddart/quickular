import React, { useState, useRef, useContext } from 'react';
import styled from 'styled-components';

import { appContext } from '../../app';
import { Section } from '../../components/section';
import { Title } from '../../components/title';
import { Button } from '../../components/button';
import { CopiedMessage } from './copiedMessage';

const GameLinkContainer = styled.div`
  position: relative;
`;

const GameLink = styled.div`
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

const ButtonContainer = styled.div`
  margin-top: 50px;
  position: relative;
`;

const StepThree = ({
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
      <GameLinkContainer>
        <GameLink onClick={copyToClipboard}>{`${host}/play?gameId=${gameId}`}</GameLink>
        {hasCopiedText && <CopiedMessage />}
      </GameLinkContainer>
      <CopyText value={`${host}/play?gameId=${gameId}`} ref={copyTextRef} readOnly />
      <ButtonContainer>
        {hasCopiedText
          ? <Button onClick={nextStep}>Next</Button>
          : <Button onClick={copyToClipboard}>Copy To Clipboard</Button>
        }
      </ButtonContainer>
    </Section>
  );
};

export default StepThree;
