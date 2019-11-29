import styled from 'styled-components';

import { siteWidth, navigationHeight, footerHeight } from '../constants';

export const MainContent = styled.div`
  margin: 0 auto;
  padding-top: 50px;
  max-width: ${siteWidth}px;
  width: 90%;
  min-height: calc(100% - ${navigationHeight}px - ${footerHeight}px);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
