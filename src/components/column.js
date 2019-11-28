import styled from 'styled-components';

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
`;
