import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const playing = keyframes`
  0% {
      height: 10px;
    }
    
    50% {
        height: 30px;
    }
    
    100% {
        height: 40px;
    }
    `;

const Wrapper = styled.div`
  display: flex;
  gap: 4px;
  width: fit-content;
  height: 40px;
  transform: rotate(180deg);
`;

const Column = styled.div`
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 10px;
  background-color: var(--color-red);
  /* animation: ${(p) =>
    p.animated
      ? css`
          ${playing} 350ms infinite alternate ease-in-out
        `
      : ''}; */
  animation: ${playing} 350ms infinite alternate ease-in-out;
  animation-play-state: ${(p) => (p.animated ? 'running' : 'paused')};

  &:nth-of-type(1) {
    height: 20px;
  }

  &:nth-of-type(2) {
    animation-delay: 200ms;
    height: 40px;
  }

  &:nth-of-type(3) {
    animation-delay: 156ms;
    height: 30px;
  }
`;

export default function AnimatedEq(props) {
  return (
    <>
      <Wrapper {...props}>
        <Column animated={props.animated} />
        <Column animated={props.animated} />
        <Column animated={props.animated} />
      </Wrapper>
    </>
  );
}
