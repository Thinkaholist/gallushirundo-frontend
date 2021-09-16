import React from 'react';
import styled, { keyframes } from 'styled-components';
import { QUERIES } from '../constants';

const playing = keyframes`
  0% {
      height: 0.5em;
    }
    
    50% {
        height: 1.5em;
    }
    
    100% {
        height: 1em;
    }
    `;

const Wrapper = styled.div`
  font-size: 20px;
  display: flex;
  gap: 4px;
  width: fit-content;
  height: 2em;
  transform: rotate(180deg);

  @media ${QUERIES.mobileAndDown} {
    font-size: 14px;
    gap: 2px;
  }
`;

const Column = styled.div`
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 10px;
  background-color: hsl(var(--color-red));
  animation: ${playing} 500ms infinite alternate ease-in-out;
  animation-play-state: ${(p) => (p.animated ? 'running' : 'paused')};

  &:nth-of-type(1) {
    height: 1em;
  }

  &:nth-of-type(2) {
    animation-delay: 200ms;
    height: 2em;
  }

  &:nth-of-type(3) {
    animation-delay: 156ms;
    height: 1.5em;
  }

  @media ${QUERIES.mobileAndDown} {
    width: 5px;
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
