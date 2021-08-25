import React, { Fragment } from 'react';
import { graphql, Link } from 'gatsby';
import { DateTime } from 'luxon';
import { ContainerStyles } from '../styles/ContainerStyles';
import styled from 'styled-components';
import Img from 'gatsby-plugin-sanity-image';
import Seo from '../components/Seo';

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
      border-color: var(--color-red);
    }

    &:hover img {
      transform: scale(1.2);
    }
  }
`;

const ArticleCard = styled.article`
  h3 {
    font-size: ${24 / 16}rem;
    line-height: 1.2;

    span {
      border-bottom: 3px solid transparent;
    }
  }

  p {
    font-size: ${16 / 16}rem;
    color: var(--color-light-black);
    margin-bottom: 1rem;
  }
`;

const BlogImage = styled(Img)`
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: 28px;
  transition: transform 0.35s ease-out;

  @supports not (aspect-ratio: 4 / 3) {
    height: 300px;
  }
`;

export default function NewsPage({ data }) {
  const news = data.news.nodes;

  return (
    <>
      <Seo title={'News'} />
      <ContainerStyles>
        <GridWrapper>
          {news.map((post) => (
            <ArticleLink key={post._id} to={`/post/${post.slug.current}`}>
              <ArticleCard>
                <div style={{ overflow: 'hidden', borderRadius: 28 }}>
                  <BlogImage {...post.featuredImage.image} alt={post.title} />
                </div>
                <p>
                  {DateTime.fromISO(post.publishedDate).toFormat('kkkk.LL.dd')}
                </p>
                <h3>
                  <span>{post.title}</span>
                </h3>
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
