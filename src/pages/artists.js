import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-plugin-sanity-image';
import { ContainerStyles } from '../styles/ContainerStyles';

const GridWrapper = styled.div`
  display: grid;
  gap: ${(p) => p.gap};
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
`;

export default function ArtistsPage({ data }) {
  const artists = data.allSanityArtist.nodes;
  const [radius, setRadius] = React.useState('');
  const [gap, setGap] = React.useState('');

  return (
    <>
      <ContainerStyles>
        <GridWrapper gap={gap}>
          {artists.map((artist) => (
            <ArtistCard key={artist._id} artist={artist} radius={radius} />
          ))}
        </GridWrapper>
        <div
          style={{
            margin: '1rem auto',
            padding: '1rem',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 10,
            }}
          >
            <label>
              <input
                type='radio'
                name='layout'
                value=''
                onClick={(e) => console.log(setRadius(e.target.value))}
                defaultChecked
              />
              négyzet
            </label>
            <label>
              <input
                type='radio'
                name='layout'
                value='28px'
                onClick={(e) => console.log(setRadius(e.target.value))}
              />
              28 px border-radius
            </label>
            <label>
              <input
                type='radio'
                name='layout'
                value='50%'
                onClick={(e) => console.log(setRadius(e.target.value))}
              />
              kör
            </label>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 10,
            }}
          >
            <label>
              <input
                type='radio'
                name='gap'
                value=''
                onClick={(e) => console.log(setGap(e.target.value))}
                defaultChecked
              />
              No gap
            </label>
            <label>
              <input
                type='radio'
                name='gap'
                value='1rem'
                onClick={(e) => console.log(setGap(e.target.value))}
              />
              16px gap
            </label>
          </div>
        </div>
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
            ...ImageWithPreview
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

  @media (hover: hover) {
    &:hover img {
      opacity: 1;
      transform: scale(1.2);
    }
    &:hover h2 {
      text-decoration: underline;
      text-decoration-color: var(--color-red, red);
    }
  }
`;

const ArtistCardStyles = styled.article`
  display: grid;
  place-content: center;
  line-height: 1;
  position: relative;
  overflow: hidden;
  transition: border-radius 0.25s;
  border-radius: ${(p) => p.radius};

  h2 {
    color: var(--color-white);
    padding: 0 1rem;
    font-size: ${40 / 16}rem;
    font-weight: 700;
    position: absolute;
    text-align: center;
    left: 0;
    right: 0;
    height: 100%;
    display: grid;
    place-content: center;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0) 100%
    );
  }
`;

const ImageStyles = styled(Img)`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: center center;
  transition: transform 0.35s ease-out;
  opacity: 0.9;

  @supports not (aspect-ratio: 1 / 1) {
    height: 300px;
  }
`;

function ArtistCard({ artist, radius }) {
  return (
    <>
      <ArtisLink to={`/artist/${artist.slug.current}`}>
        <ArtistCardStyles radius={radius}>
          <ImageStyles {...artist.featuredImage.image} alt={artist.name} />
          <h2>{artist.name}</h2>
        </ArtistCardStyles>
      </ArtisLink>
    </>
  );
}
