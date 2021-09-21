import React from 'react';
import styled from 'styled-components';
import SubscribeForm from './SubscribeForm';
import { ContainerStyles } from '../styles/ContainerStyles';
import ThinkaholistFooter from './ThinkaholistFooter';
import FolkDivider from './FolkDivider';
import FlowerDivider from './FlowerDivider';
import { QUERIES } from '../constants';

const Wrapper = styled.div`
  position: relative;
  margin-top: 6rem;

  @media ${QUERIES.mobileAndDown} {
    margin-top: 3rem;
  }
`;

const FooterStyles = styled.footer`
  padding: ${54 / 16}rem 0;
  margin-top: auto;
  /* margin-left: 1rem;
  margin-right: 1rem; */
  background-color: hsl(var(--color-red));
  color: var(--color-white);
`;

export default function Footer() {
  return (
    <>
      <Wrapper>
        <FlowerDivider
          fill='hsl(var(--color-red))'
          rotate='0deg'
          translate='translateY(calc(-40% + 1.3px ))'
        />
        <FooterStyles>
          <ContainerStyles>
            <SubscribeForm />
          </ContainerStyles>
        </FooterStyles>
        <ThinkaholistFooter />
      </Wrapper>
    </>
  );
}
