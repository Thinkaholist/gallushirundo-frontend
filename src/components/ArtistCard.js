import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Img from 'gatsby-plugin-sanity-image';

const ArtisLink = styled(Link)`
  @media (hover: hover) and (pointer: fine) {
    &:hover img {
      transform: scale(1.2);
    }
    &:hover h2 span {
      border-bottom: 3px solid hsl(var(--color-red));
    }
  }
`;

const ArtistCardStyles = styled.article`
  line-height: 0;
  position: relative;
  /* overflow: hidden; */
  border-radius: 28px;
`;

const Image = styled(Img)`
  border-radius: 28px;
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  transition: transform 0.35s ease-out;

  @supports not (aspect-ratio: 1/1) {
    height: 300px;
  }
`;

const ArtistNameWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  padding: 10px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0) 100%
  );

  h2 {
    color: var(--color-white);
    text-align: center;
    line-height: 1.2;
    /* text-transform: uppercase; */
    font-weight: 700;
    font-size: ${40 / 16}rem;
  }
`;

export default function ArtistCard({ artist }) {
  return (
    <>
      <ArtisLink to={`/artist/${artist.slug.current}`}>
        <ArtistCardStyles>
          <Image {...artist.featuredImage.image} alt={artist.name} />
          <ArtistNameWrapper>
            <h2>
              <span>{artist.name}</span>
            </h2>
          </ArtistNameWrapper>
        </ArtistCardStyles>
      </ArtisLink>
    </>
  );
}
