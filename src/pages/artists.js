import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import { ContainerStyles } from '../styles/ContainerStyles';

const GridWrapper = styled.div`
  display: grid;
  /* gap: 1rem; */
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
`;

export default function ArtistsPage({ data }) {
  const artists = data.allSanityArtist.nodes;

  return (
    <>
      <ContainerStyles>
        <GridWrapper>
          {artists.map((artist) => (
            <ArtistCard key={artist._id} artist={artist} />
          ))}
        </GridWrapper>
      </ContainerStyles>
    </>
  );
}

export const query = graphql`
  query {
    allSanityArtist {
      nodes {
        _id
        name
        slug {
          current
        }
        featuredImage {
          image {
            asset {
              url
            }
          }
        }
      }
    }
  }
`;

const ArtisLink = styled(Link)`
  color: inherit;
  &:hover {
    text-decoration: none;
  }
`;

const ArtistCardStyles = styled.article`
  display: grid;
  place-content: center;
  line-height: 1;
  position: relative;
  overflow: hidden;

  h2 {
    color: var(--color-white);
    font-size: ${36 / 16}rem;
    font-weight: 700;
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    display: grid;
    place-content: center;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.6) 50%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    object-position: center center;
    transition: transform 0.35s;
    opacity: 0.8;
  }

  @media (hover: hover) {
    &:hover img {
      opacity: 1;
      transform: scale(1.15);
    }
  }
`;

function ArtistCard({ artist }) {
  return (
    <>
      <ArtisLink to={`/artist/${artist.slug.current}`}>
        <ArtistCardStyles>
          <img src={artist.featuredImage.image.asset.url} alt={artist.name} />
          <h2>{artist.name}</h2>
        </ArtistCardStyles>
      </ArtisLink>
    </>
  );
}
