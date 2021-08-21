import React from 'react';
import { Link } from 'gatsby';
import { useWindowSize } from 'react-use';
import styled from 'styled-components';

const LogoStyles = styled.h1`
  font-weight: 700;

  @media (max-width: 916px) {
    display: none;
  }
`;

const MobileLogoStyles = styled.h1`
  display: none;

  @media (max-width: 916px) {
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
