import React from 'react';
import styled from 'styled-components';

import texasIcon from '../images/texas.svg';
import gitHubIcon from '../images/gitHub.svg';
import { siteWidth, footerHeight } from '../constants';

const StyledFooter = styled.div`
  margin: 0 auto;
  max-width: ${siteWidth}px;
  width: 90%;
  height: ${footerHeight}px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

const FooterLeft = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const FooterRight = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const TexasIcon = styled.img`
  height: 12px;
  margin-left: 5px;
`;

const GitHubIcon = styled.img`
  height: 12px;
  margin-left: 5px;
`;

export const Footer = () => (
  <StyledFooter>
    <FooterLeft>
      Made In <TexasIcon src={texasIcon} />
    </FooterLeft>
    | <FooterRight>
      View Source <GitHubIcon src={gitHubIcon} />
    </FooterRight>
  </StyledFooter>
);
