import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

const StyledCopiedMessage = styled.div`
  position: absolute;
  top: 100%;
  right: ${({ width }) => `calc(50% - ${width / 2}px)`};
  margin-top: 5px;
  background-color: gray;
  color: white;
  padding: 5px 10px;
  white-space: nowrap;
  font-size: 14px;
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  transition: 0.5s ease-in;

  &:before {
    content: '';
    position: absolute;
    bottom: calc(100% - 5px);
    right: calc(50% - 5px);
    width: 10px;
    height: 10px;
    background-color: gray;
    transform: rotate(45deg);
  }
`;

export const CopiedMessage = ({ setHasCopiedText }) => {
  const [copiedMessageWidth, setCopiedMessageWidth] = useState();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let innerTimeout;
    const timeout = setTimeout(() => {
      setIsVisible(false);
      innerTimeout = setTimeout(() => {
        setHasCopiedText && setHasCopiedText(false);
      }, 500);
    }, 1500);

    return () => {
      clearTimeout(timeout);
      clearTimeout(innerTimeout);
    };
  }, [setHasCopiedText]);

  const copiedMessageRef = useCallback((node) => {
    if (!node) return;
    const nodeWidth = node.getBoundingClientRect().width;
    setCopiedMessageWidth(nodeWidth);
  }, []);

  return <StyledCopiedMessage ref={copiedMessageRef} width={copiedMessageWidth} isVisible={isVisible}>Text Copied</StyledCopiedMessage>;
};

export default CopiedMessage;
