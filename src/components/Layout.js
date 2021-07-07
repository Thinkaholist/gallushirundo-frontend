import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Nav = styled.div`
  background-color: rebeccapurple;
  padding: 10px;
  margin-bottom: 1rem;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default function Layout({ children }) {
  return (
    <>
      <Nav>
        <div style={{ color: '#fff' }}>
          <Link to='/'>HOME</Link>
        </div>
      </Nav>
      {children}
    </>
  );
}
