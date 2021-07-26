import React from 'react';
import { Link } from 'gatsby';
import { useWindowSize } from 'react-use';
import styled from 'styled-components';

const LogoStyles = styled.h1`
  font-weight: 700;
`;

export default function Logo() {
  const { width } = useWindowSize();

  return (
    <>
      <LogoStyles>
        {width < 917 ? (
          <Link to='/'>G &amp; H</Link>
        ) : (
          <Link to='/'>Gallus &amp; Hirando</Link>
        )}
      </LogoStyles>
    </>
  );
}
