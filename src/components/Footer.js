import React from 'react';
import styled from 'styled-components';
import SubscribeForm from './SubscribeForm';
import { ContainerStyles } from '../styles/ContainerStyles';

const FooterStyles = styled.footer`
  padding: 20px 0;
  margin-top: auto;
  border-top: 1px solid;
  /* margin-left: 1rem;
  margin-right: 1rem; */
  background-color: #7eaac2;
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
    </>
  );
}
