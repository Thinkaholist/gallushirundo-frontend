import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import SubscribeForm from './SubscribeForm';

const Nav = styled.div`
  background-color: rebeccapurple;
  padding: 10px;
  margin-bottom: 1rem;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export default function Layout({ children }) {
  return (
    <>
      <Nav>
        <div style={{ color: '#fff' }}>
          <Link to='/'>HOME</Link>
        </div>
      </Nav>
      <Container>{children}</Container>
      <footer>
        <SubscribeForm />
      </footer>
    </>
  );
}
