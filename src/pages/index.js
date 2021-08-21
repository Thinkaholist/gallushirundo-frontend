import React from 'react';
import { graphql, Link } from 'gatsby';
import { DateTime } from 'luxon';
import { ContainerStyles } from '../styles/ContainerStyles';
import styled from 'styled-components';
import Img from 'gatsby-plugin-sanity-image';

const HeroImage = styled.div`
  width: 100%;
  height: 100vh;
  background-image: ${(p) => `url(${p.bg})`};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  margin-top: calc(var(--fixed-header-padding) * -1);
`;

const HeroText = styled.div`
  color: var(--color-white);
  font-size: ${30 / 16}rem;
  line-height: 1.5;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: ${160 / 16}rem;
  max-width: 790px;

  p {
    margin-bottom: ${148 / 16}rem;
  }
`;

const GridWrapper = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(450px, 100%), 1fr));
  gap: ${23 / 16}rem;
`;

const NewsCardLink = styled(Link)`
  color: var(--color-white);
  /* color: var(--color-red); */

  @media (hover: hover) {
    &:hover article {
      transform: translateY(-5px);
    }
  }
`;

const NewsCard = styled.article`
  border-radius: 28px;
  position: relative;
  transition: transform 0.2s;

  img {
    display: block;
    width: 100%;
    border-radius: 28px;
    aspect-ratio: 4 / 3;
    object-fit: cover;

    @supports not (aspect-ratio: 4 / 3) {
      height: 300px;
    }
  }
`;

const NewsCardText = styled.div`
  padding: 20px;
  position: absolute;
  top: 0px;
  left: 0px;
  /* -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: var(--color-black); */

  p {
    margin-bottom: 2rem;
  }
  h3 {
    font-size: ${28 / 16}rem;
    span {
      background-color: rgba(255, 16, 29, 0.4);
      /* background-color: rgba(255, 255, 255, 0.9); */
      padding: 4px 0;
    }
  }
`;

export default function HomePage({ data }) {
  const latestNews = data.posts.nodes;
  const heroImage = data.homePage.heroImage.image.asset.url;

  return (
    <>
      <HeroImage bg={heroImage}>
        <ContainerStyles>
          <HeroText>
            <p>{data.homePage.headerText}</p>
          </HeroText>
        </ContainerStyles>
      </HeroImage>
      <ContainerStyles>
        <GridWrapper>
          {latestNews.map((post) => (
            <NewsCardLink key={post._id} to={`/post/${post.slug.current}`}>
              <NewsCard>
                <Img {...post.featuredImage.image} alt={post.title} />
                <NewsCardText>
                  <p>
                    {DateTime.fromISO(post.publishedDate).toFormat(
                      'kkkk.LL.dd'
                    )}
                  </p>
                  <h3>
                    <span>{post.title}</span>
                  </h3>
                </NewsCardText>
              </NewsCard>
            </NewsCardLink>
          ))}
        </GridWrapper>
      </ContainerStyles>
    </>
  );
}

export const query = graphql`
  query ($rightNow: Date!) {
    siteSettings: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      _id
      title
      description
    }
    homePage: sanityHomePage(_id: { eq: "homePage" }) {
      headerText
      heroImage {
        altText
        image {
          asset {
            url
          }
        }
      }
    }
    posts: allSanityPost(
      sort: { fields: publishedDate, order: DESC }
      filter: { publishedDate: { lte: $rightNow } }
      limit: 4
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
