import React from 'react';
import styled from 'styled-components';
import SubscribeForm from './SubscribeForm';

const FooterStyles = styled.footer`
  padding: 20px 0;
  margin-top: auto;
  border-top: 1px solid;
  margin-left: 1rem;
  margin-right: 1rem;
`;

export default function Footer() {
  return (
    <>
      <FooterStyles>
        <SubscribeForm />
      </FooterStyles>
    </>
  );
}
