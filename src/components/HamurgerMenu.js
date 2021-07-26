import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  margin-left: auto;
`;

const Bar = styled.div`
  width: 40px;
  height: 5px;
  background-color: var(--color-white);

  &:nth-of-type(1) {
    transform: ${(p) => (p.isOpen ? 'translateY(10px) rotate(-45deg)' : '')};
    transform-origin: center;
    transition: transform 250ms;
  }
  &:nth-of-type(2) {
    opacity: ${(p) => (p.isOpen ? 0 : 1)};
    transition: opacity 250ms;
  }
  &:nth-of-type(3) {
    transform: ${(p) => (p.isOpen ? 'translateY(-10px) rotate(45deg)' : '')};
    transform-origin: center;
    transition: transform 250ms;
  }
`;

export default function HamburgerMenu({ isOpen, setIsOpen }) {
  return (
    <>
      <Wrapper onClick={() => setIsOpen(!isOpen)}>
        <Bar isOpen={isOpen} />
        <Bar isOpen={isOpen} />
        <Bar isOpen={isOpen} />
      </Wrapper>
    </>
  );
}
