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
  font-size: 35px;
  color: white;
`;

const NavigationItems = styled.div`
  display: flex;
`;

const NavigationItem = styled(Link)`
  color: white; 

  &:not(:last-of-type) {
    margin-right: 25px;
  }
`;

export const Header = (props) => (
  <StyledHeader>
    <HeaderContainer>
      <Logo to={`/${props.location.search}`}>Quickular</Logo>
      <NavigationItems>
        <NavigationItem to={`/${props.location.search}`}>Host</NavigationItem>
        <NavigationItem to={`/play${props.location.search}`}>Join</NavigationItem>
      </NavigationItems>
    </HeaderContainer>
  </StyledHeader>
);
