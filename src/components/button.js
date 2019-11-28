import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

import { colors } from '../constants';

const buttonStyles = css`
  background-color: ${colors.pink};
  padding: 10px 25px;
  border-radius: 10px;
  display: inline-block;
  color: white;
  cursor: pointer;
  white-space: nowrap;
  transition: 0.3s;

  &:hover {
    background-color: ${colors.darkPink};
  }
`;

const StyledButton = styled.div`${buttonStyles}`;

const StyledLink = styled(Link)`${buttonStyles}`;

export const Button = ({ to, children, ...rest}) => (
  to
    ? <StyledLink to={to} {...rest}>{children}</StyledLink>
    : <StyledButton {...rest}>{children}</StyledButton>
);
