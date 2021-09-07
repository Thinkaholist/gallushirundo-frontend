import React from 'react';
import styled from 'styled-components';
import { FaHeart } from 'react-icons/fa';

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  padding: 4px 0;
  font-size: 1rem;

  a {
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
  }
`;

export default function ThinkaholistFooter() {
  return (
    <>
      <Wrapper>
        <p>
          Made with <FaHeart color='hsl(var(--color-red))' /> by the{' '}
          <a
            href='https://thinkaholist.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            Thinkaholist Team
          </a>
        </p>
      </Wrapper>
    </>
  );
}
