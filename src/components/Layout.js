import React from 'react';
import styled from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Footer from './Footer';
import Header from './Header';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const MainContent = styled.main`
  margin-bottom: 40px;
  padding-top: var(--fixed-header-padding);

  /* @media (max-width: 900px) {
    padding-top: var(--fixed-header-padding-mobile);
  } */
`;

export default function Layout({ children }) {
  return (
    <>
      <Wrapper>
        <Typography />
        <GlobalStyles />
        <Header />
        <MainContent>{children}</MainContent>
        <Footer />
      </Wrapper>
    </>
  );
}
