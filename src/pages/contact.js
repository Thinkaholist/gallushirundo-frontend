import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Img from 'gatsby-plugin-sanity-image';
import { ContainerStyles } from '../styles/ContainerStyles';
import Seo from '../components/Seo';
import Pulse from 'react-reveal/Pulse';

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr));
  gap: 28px;
`;

const AboutUsWrapper = styled.div`
  p {
    margin-bottom: 1rem;
  }
`;

const Image = styled(Img)`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 28px;
`;

export default function ContactPage({ data }) {
  const { pageDetails } = data;

  const text = pageDetails.contactText?.split('\n').map((p, i) => {
    if (p === '') {
      return <br key={i} />;
    }
    return <p key={i}>{p}</p>;
  });

  return (
    <>
      <Seo title={'Contact'} />
      <ContainerStyles>
        <GridWrapper>
          <AboutUsWrapper>{text}</AboutUsWrapper>
          <div>
            <Image
              {...pageDetails.contactImage.image}
              alt={pageDetails.contactImage.altText}
            />
            <Pulse>
              <div
                style={{
                  margin: '4rem 0',
                  display: 'grid',
                  placeContent: 'center',
                }}
              >
                <a
                  href={`mailto:${pageDetails.contactEmail}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {pageDetails.contactEmail}
                </a>
              </div>
            </Pulse>
          </div>
        </GridWrapper>
      </ContainerStyles>
    </>
  );
}

export const query = graphql`
  query {
    pageDetails: sanityContactPage(_id: { eq: "contactPage" }) {
      contactEmail
      contactText
      contactImage {
        altText
        image {
          ...ImageWithPreview
        }
      }
    }
  }
`;
