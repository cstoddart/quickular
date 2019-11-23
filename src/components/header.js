import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { colors } from '../constants';

const StyledHeader = styled.div`
  padding: 25px;
  background: ${colors.orange};
`;

const Logo = styled(Link)`
  font-size: 35px;
  color: white;
`;


export const Header = ({ siteTitle }) => (
  <StyledHeader>
    <Logo to="/">
      {siteTitle}
    </Logo>
  </StyledHeader>
);
