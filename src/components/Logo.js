import React from 'react';
import { Link } from 'gatsby';
import { useWindowSize } from 'react-use';
import styled from 'styled-components';
import { QUERIES } from '../constants';
// import MobileLogo from '../assets/images/H&G_logo-01.svg';
// import DesktopLogo from '../assets/images/H&G_logo-02.svg';

const LogoStyles = styled.h1`
  font-weight: 700;

  @media ${QUERIES.mobileAndDown} {
    display: none;
  }
`;

const MobileLogoStyles = styled.h1`
  display: none;

  @media ${QUERIES.mobileAndDown} {
    display: block;
    font-weight: 700;
  }
`;

export default function Logo() {
  return (
    <>
      <LogoStyles>
        <Link to='/'>Gallus &amp; Hirundo</Link>
      </LogoStyles>
      <MobileLogoStyles>
        <Link to='/'>G &amp; H</Link>
      </MobileLogoStyles>
    </>
  );
}
