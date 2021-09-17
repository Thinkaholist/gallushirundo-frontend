import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import { DateTime } from 'luxon';
import { ContainerStyles } from '../styles/ContainerStyles';
import {
  GridWrapper,
  ArticleLink,
  ArticleCard,
  ImageWrapper,
  BlogImage,
  TextWrapper,
  PublishedDate,
  Title,
} from '../pages/news';

export const query = graphql`
  query ($slug: String!, $rightNow: Date!) {
    category: sanityCategory(slug: { current: { eq: $slug } }) {
      name
      description
    }
    posts: allSanityPost(
      filter: {
        category: { slug: { current: { eq: $slug } } }
        publishedDate: { lte: $rightNow }
      }
      sort: { fields: publishedDate, order: DESC }
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

const Wrapper = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
`;

const CategoryTitle = styled.h1`
  span {
    color: hsl(var(--color-red));
  }
`;

const Description = styled.p``;

export default function SingleCategory(props) {
  const categoryPosts = props.data.posts.nodes;

  return (
    <>
      <ContainerStyles>
        <Wrapper>
          <CategoryTitle>
            Category: <span>{props.data.category.name}</span>
          </CategoryTitle>
          <Description>{props.data.category.description}</Description>
        </Wrapper>
        <GridWrapper>
          {categoryPosts.length < 1 && (
            <h1>No news in this category was found.</h1>
          )}
          {categoryPosts.map((post) => (
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
