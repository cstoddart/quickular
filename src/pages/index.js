import React, {
  useState,
  useContext,
} from 'react';
import Chance from 'chance';
import styled from 'styled-components';

import { appContext } from '../app';
import { createGame } from '../services/firebase';
import {
  Button,
  Title,
  Column,
} from '../components';
import { StepOne } from '../components/home/stepOne';
import { StepTwo } from '../components/home/stepTwo';
import { StepThree } from '../components/home/stepThree';

const StyledHome = styled.div`
  padding-top: 100px;
`;

const chance = new Chance();

function Home(props) {
  const { updateContext } = useContext(appContext);
  const [currentStep, setCurrentStep] = useState(0);

  function handleStartGame() {
    const randomGuid = chance.guid();
    createGame({ gameId: randomGuid });
    updateContext({ gameId: randomGuid });
    setCurrentStep(1);
  };

  return (
    <StyledHome>
      {currentStep === 0 &&
        <>
          <Title>Welcome To Quickular</Title>
          <Button onClick={handleStartGame}>Start New Game</Button>
        </>
      }
      {currentStep === 1 && 
        <StepOne setCurrentStep={setCurrentStep} />
      }
      {currentStep === 2 && 
        <StepTwo
          setCurrentStep={setCurrentStep}
          host={props.location.host}
        />
      }
      {currentStep === 3 && 
        <StepThree
          host={props.location.host}
          navigate={props.navigate}
        />
      }
    </StyledHome>
  );
};

export default Home;
