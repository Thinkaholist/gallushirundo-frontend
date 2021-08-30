import React from 'react';
import styled from 'styled-components';
import SubscribeForm from './SubscribeForm';
import { ContainerStyles } from '../styles/ContainerStyles';
import ThinkaholistFooter from './ThinkaholistFooter';

const FooterStyles = styled.footer`
  padding: ${54 / 16}rem 0;
  margin-top: auto;
  border-top: 1px solid;
  /* margin-left: 1rem;
  margin-right: 1rem; */
  background-color: var(--color-red);
  color: var(--color-white);
`;

export default function Footer() {
  return (
    <>
      <FooterStyles>
        <ContainerStyles>
          <SubscribeForm />
        </ContainerStyles>
      </FooterStyles>
      <ThinkaholistFooter />
    </>
  );
}
