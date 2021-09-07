import React, { Fragment } from 'react';
import { graphql, Link } from 'gatsby';
import { DateTime } from 'luxon';
import { ContainerStyles } from '../styles/ContainerStyles';
import styled from 'styled-components';
import Img from 'gatsby-plugin-sanity-image';
import Seo from '../components/Seo';
import { QUERIES } from '../constants';

const GridWrapper = styled.div`
  display: grid;
  gap: 2rem 1rem;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
`;

const ArticleLink = styled(Link)`
  color: inherit;

  &:hover {
    text-decoration: none;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover h3 span {
      border-color: hsl(var(--color-red));
    }

    &:hover img {
      transform: scale(1.2);
    }
  }
`;

const ArticleCard = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  /* Image zoom on hover */
  overflow: hidden;
  border-radius: 28px;
  line-height: 0;
`;

const BlogImage = styled(Img)`
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 28px;
  transition: transform 0.35s ease-out;

  @media ${QUERIES.mobileAndDown} {
    aspect-ratio: 1 / 1;
  }

  @supports not (aspect-ratio: 4 / 3) {
    height: 280px;
  }
`;

const TextWrapper = styled.div`
  @media ${QUERIES.mobileAndDown} {
    color: var(--color-white);
    position: absolute;
    top: 0;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    border-radius: 28px;

    background: rgb(0, 0, 0);
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0.7) 80%
    );
  }
`;

const PublishedDate = styled.p`
  font-size: ${16 / 16}rem;
  color: var(--color-light-black);
  margin: 1rem 0;

  @media ${QUERIES.mobileAndDown} {
    color: var(--color-white);
    margin: 0;
  }
`;

const Title = styled.h3`
  font-size: ${24 / 16}rem;
  font-weight: 500;
  line-height: 1.3;

  span {
    border-bottom: 3px solid transparent;
  }

  /* @media ${QUERIES.mobileAndDown} {
    font-size: ${20 / 16}rem;
  } */
`;

export default function NewsPage({ data }) {
  const news = data.news.nodes;

  return (
    <>
      <Seo title={'News'} />
      <ContainerStyles>
        <GridWrapper>
          {news.length < 1 && <h1>No news was found.</h1>}
          {news.map((post) => (
            <ArticleLink key={post._id} to={`/post/${post.slug.current}`}>
              <ArticleCard>
                <ImageWrapper>
                  <BlogImage {...post.featuredImage.image} alt={post.title} />
                </ImageWrapper>
                <TextWrapper>
                  <PublishedDate>
                    {DateTime.fromISO(post.publishedDate).toFormat(
                      'kkkk.LL.dd'
                    )}
                  </PublishedDate>
                  <Title>
                    <span>{post.title}</span>
                  </Title>
                </TextWrapper>
              </ArticleCard>
            </ArticleLink>
          ))}
        </GridWrapper>
      </ContainerStyles>
    </>
  );
}

export const query = graphql`
  query ($rightNow: Date!) {
    news: allSanityPost(
      sort: { fields: publishedDate, order: DESC }
      filter: { publishedDate: { lte: $rightNow } }
    ) {
      nodes {
        _id
        title
        publishedDate
        slug {
          current
        }
        category {
          _id
          name
          slug {
            current
          }
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
