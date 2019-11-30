import React, { useState } from 'react';
import styled from 'styled-components';

import { StepOne } from '../components/home/stepOne';
import { StepTwo } from '../components/home/stepTwo';
import { StepThree } from '../components/home/stepThree';
import { StepFour } from '../components/home/stepFour';

const StyledHome = styled.div`
  padding-top: 100px;
`;

function Home(props) {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <StyledHome>
      {currentStep === 1 &&
        <StepOne setCurrentStep={setCurrentStep} />
      }
      {currentStep === 2 && 
        <StepTwo setCurrentStep={setCurrentStep} />
      }
      {currentStep === 3 && 
        <StepThree
          setCurrentStep={setCurrentStep}
          host={props.location.host}
        />
      }
      {currentStep === 4 && 
        <StepFour
          host={props.location.host}
          navigate={props.navigate}
        />
      }
    </StyledHome>
  );
};

export default Home;
