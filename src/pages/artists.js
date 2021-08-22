import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { ContainerStyles } from '../styles/ContainerStyles';
import ArtistCard from '../components/ArtistCard';

const GridWrapper = styled.div`
  display: grid;
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
            ...ImageWithPreview
          }
        }
      }
    }
  }
`;
