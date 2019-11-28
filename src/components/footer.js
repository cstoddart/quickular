import React from 'react';
import styled from 'styled-components';

import texasIcon from '../images/texas.svg';
import gatsbyIcon from '../images/gatsby.svg';
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

const FooterMiddle = styled.a`
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  color:white;
`;

const FooterRight = styled.a`
  margin-left: 10px;
  display: flex;
  align-items: center;
  color:white;
`;

const TexasIcon = styled.img`
  height: 12px;
  margin-left: 5px;
`;

const GatsbyIcon = styled.img`
  height: 12px;
  margin-left: 5px;
`;

const GitHubIcon = styled.img`
  height: 13px;
  margin-left: 5px;
`;

export const Footer = () => (
  <StyledFooter>
    <FooterLeft>
      Made In <TexasIcon src={texasIcon} />
    </FooterLeft>
    | <FooterMiddle href="https://gatsbyjs.org" target="_blank">
      Built With <GatsbyIcon src={gatsbyIcon} />
    </FooterMiddle>
    | <FooterRight href="https://github.com/cstoddart/quickular" target="_blank">
      View Source <GitHubIcon src={gitHubIcon} />
    </FooterRight>
  </StyledFooter>
);
