import React from 'react';
import styled from 'styled-components';
import { QUERIES } from '../constants';
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
  margin-bottom: 8rem;
  padding-top: var(--fixed-header-padding);

  @media ${QUERIES.mobileAndDown} {
    margin-bottom: 4rem;
  }
`;

export default function Layout({ location, children }) {
  return (
    <>
      <Wrapper>
        <Typography />
        <GlobalStyles />
        <Header location={location} />
        <MainContent>{children}</MainContent>
        <Footer />
      </Wrapper>
    </>
  );
}
