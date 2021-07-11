import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import GlobalStyles from '../styles/GlobalStyles';
import Footer from './Footer';
import { ContainerStyles } from '../styles/ContainerStyles';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Nav = styled.div`
  background-color: rebeccapurple;
  padding: 10px 0;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default function Layout({ children }) {
  return (
    <>
      <Wrapper>
        <GlobalStyles />
        <Nav>
          <ContainerStyles>
            <div style={{ color: '#fff' }}>
              <Link to='/'>HOME</Link>
            </div>
          </ContainerStyles>
        </Nav>
        <div>{children}</div>
        <Footer />
      </Wrapper>
    </>
  );
}
