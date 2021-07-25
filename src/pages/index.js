import React from 'react';
import { graphql, Link } from 'gatsby';
import { DateTime } from 'luxon';
import { ContainerStyles } from '../styles/ContainerStyles';
import styled from 'styled-components';

const HeroImage = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: ${(p) => `url(${p.bg})`};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  margin-top: -8rem;
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

const NewsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${23 / 16}rem;
  margin: ${40 / 16}rem 0;

  a {
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
`;

const NewsPreview = styled.article`
  background-color: darkgoldenrod;
  width: 320px;
  border-radius: 28px;
  padding: 34px 26px;
  color: var(--color-white);
  /* -webkit-text-stroke: 1px black; */
  background: ${(p) => `url(${p.background})`};
  background-position: center;
  background-size: cover;
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: all 200ms;
  .title {
    font-size: ${24 / 16}rem;
    text-transform: uppercase;
    max-width: 80%;
    line-height: 1.3;

    span {
      background-color: var(--color-red);
    }
  }

  .date {
    font-size: ${22 / 16}rem;
    -webkit-text-stroke: 1px black;
    font-family: var(--font-family);
    font-weight: 700;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    /* transform: scale(1.01); */
  }
`;

export default function HomePage({ data }) {
  const latestNews = data.posts.edges;
  const heroImage = data.homePage.heroImage.image.asset.url;

  console.log(data);

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
        <NewsWrapper>
          {latestNews.map(({ node }) => (
            <Link key={node._id} to={`/post/${node.slug.current}`}>
              <NewsPreview background={node.featuredImage.image.asset.url}>
                <p className='date'>
                  {DateTime.fromISO(node.publishedDate).toFormat('kkkk.LL.dd')}
                </p>
                <p className='title'>
                  <span>{node.title}</span>
                </p>
              </NewsPreview>
            </Link>
          ))}
        </NewsWrapper>
        <h2>Equliazer</h2>
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
    artists: allSanityArtist {
      edges {
        node {
          _id
          name
          slug {
            current
          }
        }
      }
    }
    events: allSanityEvent {
      edges {
        node {
          _id
          title
          slug {
            current
          }
        }
      }
    }
    posts: allSanityPost(
      sort: { fields: publishedDate, order: DESC }
      filter: { publishedDate: { lte: $rightNow } }
      limit: 4
    ) {
      edges {
        node {
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
              asset {
                url
              }
            }
          }
        }
      }
    }
  }
`;
