import styled from 'styled-components';

import { siteWidth, navigationHeight } from '../constants';

export const MainContent = styled.div`
  margin: 150px auto 0;
  max-width: ${siteWidth}px;
  width: 90%;
  height: calc(100% - ${navigationHeight}px);
`;
