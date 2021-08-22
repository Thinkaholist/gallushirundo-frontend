import React from 'react';
import { graphql, Link } from 'gatsby';
import { DateTime } from 'luxon';
import { ContainerStyles } from '../styles/ContainerStyles';
import styled from 'styled-components';
import Img from 'gatsby-plugin-sanity-image';
import Seo from '../components/Seo';

const HeroSection = styled.div`
  margin-top: calc(var(--fixed-header-padding) * -1);
  line-height: 0;
  height: 100vh;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeroTextWrapper = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  width: 100%;
  /* margin: auto; */
  /* padding: 0 1rem; */
  /* bottom: 6rem; */
  /* max-width: 790px; */
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0.7) 80%
  );

  p {
    font-size: ${30 / 16}rem;
    color: var(--color-white);
    line-height: 1.5;
    position: absolute;
    bottom: 8rem;
    max-width: 790px;
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
      height: 350px;
    }
  }
`;

const NewsCardText = styled.div`
  font-weight: 500;
  padding: 20px;
  position: absolute;
  top: 0px;
  left: 0px;
  -webkit-text-fill-color: var(--color-white);
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: var(--color-black);
  /* text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000; */
  letter-spacing: 2px;

  p {
    margin-bottom: 2rem;
  }
  h3 {
    font-size: ${28 / 16}rem;
    span {
      /* background-color: rgba(255, 16, 29, 0.4); */
      /* background-color: rgba(255, 255, 255, 0.9); */
      padding: 4px 0;
    }
  }
`;

export default function HomePage({ data }) {
  const latestNews = data.posts.nodes;
  const artists = data.artists.nodes;
  const heroImage = data.homePage.heroImage.image.asset.url;

  return (
    <>
      <Seo title={'Home'} image={heroImage} />
      <HeroSection>
        <Img {...data.homePage.heroImage.image} alt='hero' />
        <HeroTextWrapper>
          <ContainerStyles>
            <p>{data.homePage.headerText}</p>
          </ContainerStyles>
        </HeroTextWrapper>
      </HeroSection>
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
          ...ImageWithPreview
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
            asset {
              url
            }
          }
        }
      }
    }
    artists: allSanityArtist {
      nodes {
        name
        slug {
          current
        }
        featuredImage {
          image {
            asset {
              url
            }
          }
        }
        styles {
          acapella
          folk
          punk
          rock
        }
      }
    }
  }
`;
