import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { siteWidth, navigationHeight } from '../constants';

const StyledHeader = styled.div`
  height: ${navigationHeight}px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const HeaderContainer = styled.div`
  max-width: ${siteWidth}px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 28px;
  color: white;
`;

const NavigationItems = styled.div`
  display: flex;
`;

const NavigationItem = styled(Link)`
  color: white; 

  &:not(:last-of-type) {
    margin-right: 15px;
  }
`;

export const Header = (props) => (
  <StyledHeader>
    <HeaderContainer>
      <Logo to="/">Quickular</Logo>
      <NavigationItems>
        <NavigationItem to="/">Host</NavigationItem>
        <NavigationItem to="/play">Join</NavigationItem>
        <NavigationItem to="/practice">Practice</NavigationItem>
      </NavigationItems>
    </HeaderContainer>
  </StyledHeader>
);
