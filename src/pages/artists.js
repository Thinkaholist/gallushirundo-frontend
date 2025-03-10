import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import { Fade } from "react-swift-reveal";
import { ContainerStyles } from "../styles/ContainerStyles";
import ArtistCard from "../components/ArtistCard";
import Seo from "../components/Seo";

const GridWrapper = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
`;

export default function ArtistsPage({ data }) {
  const artists = data.allSanityArtist.nodes;

  return (
    <>
      <Seo title={"Artists"} />
      <ContainerStyles>
        <GridWrapper>
          {artists.map((artist) => (
            <Fade key={artist._id} bottom delay={150} distance="10px">
              <ArtistCard artist={artist} />
            </Fade>
          ))}
        </GridWrapper>
      </ContainerStyles>
    </>
  );
}

export const query = graphql`
  query {
    allSanityArtist(sort: { fields: name, order: ASC }) {
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
