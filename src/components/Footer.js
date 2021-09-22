import React from 'react';
import styled from 'styled-components';
import SubscribeForm from './SubscribeForm';
import { ContainerStyles } from '../styles/ContainerStyles';
import ThinkaholistFooter from './ThinkaholistFooter';
import { QUERIES } from '../constants';
import FlowerDivider from './FlowerDivider';

const FooterStyles = styled.footer`
  margin-top: auto;
  padding: ${54 / 16}rem 0;
  /* margin-left: 1rem;
  margin-right: 1rem; */
  background-color: hsl(var(--color-red));
  color: var(--color-white);
  position: relative;
`;

export default function Footer() {
  return (
    <>
      <FooterStyles>
        <FlowerDivider />
        <ContainerStyles>
          <SubscribeForm />
        </ContainerStyles>
      </FooterStyles>
      <ThinkaholistFooter />
    </>
  );
}
