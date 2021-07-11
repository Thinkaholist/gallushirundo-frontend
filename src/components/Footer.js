import React from 'react';
import styled from 'styled-components';
import SubscribeForm from './SubscribeForm';

const FooterStyles = styled.footer`
  padding: 20px 0;
  background-color: peachpuff;
  margin-top: auto;
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
