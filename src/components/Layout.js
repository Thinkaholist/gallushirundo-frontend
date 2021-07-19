import React from 'react';
import styled from 'styled-components';
import { Link, useStaticQuery, graphql } from 'gatsby';
import GlobalStyles from '../styles/GlobalStyles';
import Footer from './Footer';
import { ContainerStyles } from '../styles/ContainerStyles';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Nav = styled.div`
  background-color: transparent;
  padding: 10px 0;

  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: revert;
    }
  }
`;

const MenuItems = styled.ul`
  font-family: FormaDJRTextRegular;
  a:hover {
    text-decoration: none;
  }
  a[aria-current='page'] {
    font-family: FormaDJRTextBold;
    border-bottom: 2px solid;
  }
`;

export default function Layout({ children }) {
  const { siteSettings } = useStaticQuery(graphql`
    query {
      siteSettings: sanitySiteSettings(_id: { eq: "siteSettings" }) {
        title
      }
    }
  `);

  return (
    <>
      <Wrapper>
        <GlobalStyles />
        <Nav>
          <ContainerStyles>
            <div
              style={{
                color: '#fff',
                textTransform: 'uppercase',
                fontFamily: 'FormaDJRTextBold',
                color: '#ff101e',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <h1>
                <Link to='/'>{siteSettings.title}</Link>
              </h1>
              <MenuItems
                style={{ marginLeft: 'auto', display: 'flex', gap: 132 }}
              >
                <li>
                  <Link to={`/news`}>News</Link>
                </li>
                <li>
                  <Link to={`/events`}>Events</Link>
                </li>
                <li>
                  <Link to={`/artists`}>Artists</Link>
                </li>
                <li>
                  <Link to={`/contact`}>Contact</Link>
                </li>
              </MenuItems>
            </div>
          </ContainerStyles>
        </Nav>
        <div style={{ marginBottom: '1rem' }}>{children}</div>
        <Footer />
      </Wrapper>
    </>
  );
}
