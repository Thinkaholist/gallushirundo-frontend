import React from 'react';
import styled from 'styled-components';
import { FiDownload } from 'react-icons/fi';

const LinkButton = styled.a`
  --transition: all 0.25s cubic-bezier(0.31, -0.105, 0.43, 1.4);
  display: block;
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: ${24 / 16}rem;
  background-color: hsl(var(--color-red));
  background-color: var(--color-black);
  color: var(--color-white);
  padding: 6px 12px;
  border-radius: 28px;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
  overflow: hidden;
  transition: var(--transition), background-color 0.25s linear;
  position: relative;
  /* box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3); */

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: hsl(var(--color-red));
    }

    &:hover span {
      left: -72%;
      opacity: 0;
    }

    &:hover div {
      width: 100%;
      svg {
        width: 40px;
        height: 40px;
        opacity: 1;
      }
    }
  }
`;

const ButtonText = styled.span`
  display: block;
  height: 100%;
  text-align: center;
  position: absolute;
  top: 0;
  width: 72%;
  line-height: inherit;
  left: 0;
  transition: var(--transition);

  /* Horizontal line */
  &::after {
    content: '';
    background-color: rgba(255, 255, 255, 0.5);
    width: 2px;
    height: 70%;
    position: absolute;
    top: 15%;
    right: -1px;
  }
`;

const IconWrapper = styled.div`
  display: grid;
  place-content: center;
  height: 100%;
  text-align: center;
  position: absolute;
  top: 0;
  width: 28%;
  right: 0;
  transition: var(--transition);
`;

const Icon = styled(FiDownload)`
  width: 26px;
  height: 26px;
  opacity: 0.6;
  display: block;
  transition: var(--transition), height 0.25s ease;
`;

export default function PressKitLink(props) {
  return (
    <>
      <LinkButton {...props}>
        <ButtonText>{props.text}</ButtonText>
        <IconWrapper>
          <Icon />
        </IconWrapper>
      </LinkButton>
    </>
  );
}
