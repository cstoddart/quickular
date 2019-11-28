import { createGlobalStyle } from 'styled-components';

import { colors } from './constants';

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    height: 100%;
  }

  body {
    font-family: sans-serif;
    margin: 0;
    background-color: ${colors.darkBlue};
    color: white;
    text-align: center;
  }

  * {
    box-sizing: border-box;
    outline: none;
  }

  a {
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 25px;
  }

  ::placeholder {
    color: white;
    opacity: 1;
  }

  #___gatsby,
  #___gatsby > div {
    height: 100%;
  }
`;
