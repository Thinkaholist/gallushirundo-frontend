import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Footer from './Footer';
import Header from './Header';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

export default function Layout({ children }) {
  return (
    <>
      <Wrapper>
        <GlobalStyles />
        <Header />
        <div style={{ marginBottom: 40, marginTop: '8rem' }}>{children}</div>
        <Footer />
      </Wrapper>
    </>
  );
}
