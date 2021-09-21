import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Img from 'gatsby-plugin-sanity-image';
import { ContainerStyles } from '../styles/ContainerStyles';
import Seo from '../components/Seo';
import Pulse from 'react-reveal/Pulse';
import { QUERIES } from '../constants';

const GridWrapper = styled.div`
  display: grid;
  /* grid-template-columns: repeat(auto-fill, minmax(min(400px, 100%), 1fr)); */
  grid-template-areas:
    'title photo'
    'text photo'
    'references references'
    'cta cta';
  gap: 28px;
  grid-template-columns: 1fr 1fr;

  @media ${QUERIES.mobileAndDown} {
    grid-template-columns: 1fr;
    grid-template-areas:
      'title'
      'photo'
      'text'
      'references'
      'cta';
  }
`;

const Title = styled.h1`
  grid-area: title;
  font-size: ${30 / 16}rem;
  text-transform: uppercase;
  font-weight: 700;
`;

const Image = styled(Img)`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 28px;
  grid-area: photo;
`;

const TextWrapper = styled.div`
  grid-area: text;
`;

const ReferencesWrapper = styled.div`
  grid-area: references;
`;

const ReferencesHeadline = styled.h2`
  font-size: ${24 / 16}rem;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;

  span {
    border-bottom: 2px solid;
  }

  @media ${QUERIES.mobileAndDown} {
    text-align: revert;
  } ;
`;

const RefernceList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  li:not(:last-of-type)::after {
    /* border-right: 2px solid;
    padding: 2px 1rem 2px 0; */
    color: hsl(var(--color-red));
    font-family: 'Font Awesome 5 Free';
    font-weight: 400;
    content: '\f35b';
    margin-left: 0.5rem;
  }

  @media ${QUERIES.mobileAndDown} {
    flex-direction: column;

    li:not(:last-of-type)::after {
      content: '';
    }
  } ;
`;

const CtaWrapper = styled.div`
  grid-area: cta;
  text-align: center;

  @media ${QUERIES.mobileAndDown} {
    text-align: revert;
  } ;
`;

const CtaText = styled.h2`
  font-size: ${28 / 16}rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CtaEmail = styled.a`
  font-size: ${24 / 16}rem;
  color: inherit;
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
          <Title>{pageDetails.title}</Title>
          <Image
            {...pageDetails.contactImage.image}
            alt={pageDetails.contactImage.altText}
          />
          <TextWrapper>{text}</TextWrapper>
          <ReferencesWrapper>
            <ReferencesHeadline>
              <span>{pageDetails.referencesHeadline}</span>
            </ReferencesHeadline>
            <RefernceList>
              {pageDetails.references.map((reference) => (
                <li>{reference}</li>
              ))}
            </RefernceList>
          </ReferencesWrapper>
          <CtaWrapper>
            <CtaText>{pageDetails.ctaText}</CtaText>
            <CtaEmail
              href={`mailto:${pageDetails.contactEmail}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {pageDetails.contactEmail}
            </CtaEmail>
          </CtaWrapper>
        </GridWrapper>
      </ContainerStyles>
    </>
  );
}

export const query = graphql`
  query {
    pageDetails: sanityContactPage(_id: { eq: "contactPage" }) {
      title
      contactImage {
        altText

        image {
          ...ImageWithPreview
        }
      }
      contactText
      referencesHeadline
      references
      ctaText
      contactEmail
    }
  }
`;
