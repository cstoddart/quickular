import styled from 'styled-components';

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:not(:last-of-type) {
    margin-bottom: 100px;
  }
`;
