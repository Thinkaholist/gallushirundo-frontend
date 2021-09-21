import React from 'react';
import styled from 'styled-components';
import SubscribeForm from './SubscribeForm';
import { ContainerStyles } from '../styles/ContainerStyles';
import ThinkaholistFooter from './ThinkaholistFooter';
import FolkDivider from './FolkDivider';
import FlowerDivider from './FlowerDivider';
import { QUERIES } from '../constants';
import Flower4 from '../images/virag_patternhez-04.svg';
import Flower2 from '../images/virag_patternhez-02.svg';
import Flower5 from '../images/virag_patternhez-05.svg';
import { rotateInfinite, bimbam } from '../styles/animations';

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

const Flower = styled.img`
  width: 60px;
  position: absolute;
  z-index: -1;
  opacity: 0.9;
`;

const FlowerFour = styled(Flower)`
  top: -160px;
  left: 150px;
  animation: ${rotateInfinite} 25s linear infinite alternate;
  transform-origin: 90% 100%;
`;

const FlowerTwo = styled(Flower)`
  top: -90px;
  right: 120px;
  animation: ${bimbam} 3s linear infinite alternate;
  transform-origin: 50% 100%;
`;

const FlowerFive = styled(Flower)`
  top: -95px;
  left: 47%;
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
        <FlowerFour src={Flower4} alt='flower4' />
        <FlowerTwo src={Flower2} alt='flower2' />
        <FlowerFive src={Flower5} alt='flower5' />
      </Wrapper>
    </>
  );
}
