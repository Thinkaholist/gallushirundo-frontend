import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  --position-right: 1rem;
  position: absolute;
  right: var(--position-right);
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  margin-left: auto;
  z-index: 9999;
`;

const Bar = styled.div`
  width: 40px;
  height: 5px;
  border-radius: 4px;
  background-color: ${(p) => p.color};
  transition: background-color 400ms ease;

  &:nth-of-type(1) {
    transform: ${(p) => (p.isOpen ? 'translateY(10px) rotate(-45deg)' : '')};
    transform-origin: center;
    transition: transform 250ms;
  }
  &:nth-of-type(2) {
    transform: ${(p) =>
      p.isOpen
        ? 'translateX(calc(100% + var(--position-right)))'
        : 'translateX(0%)'};
    opacity: ${(p) => (p.isOpen ? 0 : 1)};
    transition: transform 250ms, opacity 450ms;
  }
  &:nth-of-type(3) {
    transform: ${(p) => (p.isOpen ? 'translateY(-10px) rotate(45deg)' : '')};
    transform-origin: center;
    transition: transform 250ms;
  }
`;

export default function HamburgerMenu({ isOpen, setIsOpen, color }) {
  return (
    <>
      <Wrapper onClick={() => setIsOpen(!isOpen)}>
        <Bar isOpen={isOpen} color={color} />
        <Bar isOpen={isOpen} color={color} />
        <Bar isOpen={isOpen} color={color} />
      </Wrapper>
    </>
  );
}
