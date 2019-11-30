import React, { useState } from 'react';
import styled from 'styled-components';

import { StepOne } from './stepOne';
import { StepTwo } from './stepTwo';
import { StepThree } from './stepThree';
import { StepFour } from './stepFour';

const StyledHome = styled.div`
  padding-top: 100px;
`;

export const Home = (props) => {
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
