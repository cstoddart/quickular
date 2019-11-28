import React, {
  useState,
  useContext,
} from 'react';
import Chance from 'chance';

import { appContext } from '../app';
import { createGame } from '../services/firebase';
import {
  Button,
  Title,
} from '../components';
import { StepOne } from '../components/home/stepOne';
import { StepTwo } from '../components/home/stepTwo';
import { StepThree } from '../components/home/stepThree';

const chance = new Chance();

function Home(props) {
  const { updateContext, ...context } = useContext(appContext);
  const [currentStep, setCurrentStep] = useState(0);

  function handleStartGame() {
    const randomGuid = chance.guid();
    createGame({ gameId: randomGuid });
    updateContext({ gameId: randomGuid });
    setCurrentStep(1);
  };
  console.log('CONTEXT @index', context);
  return (
    <>
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
    </>
  );
};

export default Home;
