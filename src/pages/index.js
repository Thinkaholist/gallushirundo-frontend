import React from 'react';
import { graphql, Link } from 'gatsby';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Img from 'gatsby-plugin-sanity-image';
import { ContainerStyles } from '../styles/ContainerStyles';
import { QUERIES } from '../constants';
import Seo from '../components/Seo';
import StlyesAnimation from '../components/StylesAnimation';
import CurveDivider from '../components/CurveDivider';

const HeroSection = styled.div`
  margin-top: calc(var(--fixed-header-padding) * -1);
  line-height: 0;
  height: 100vh;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    will-change: transform;
  }
`;

const HeroTextWrapper = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  width: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0.8) 80%
  );

  p {
    font-size: ${60 / 16}rem;
    font-weight: 500;
    color: var(--color-white);
    line-height: 1.2;
    position: absolute;
    bottom: 5vw;
    max-width: min(790px, 80%);

    @media ${QUERIES.mobileAndDown} {
      /* bottom: 8rem; */
      bottom: 40vw;
      font-size: ${24 / 16}rem;
      /* max-width: 100%; */
      max-width: 90%;
      /* text-align: center; */
      left: 1rem;
      right: 1rem;
      line-height: 1.4;
    }
  }
`;

const LatestNewsSection = styled.section`
  background-color: var(--color-white);
`;

const InnerContainer = styled(ContainerStyles)`
  /* padding-bottom: 1rem; */

  /* @media ${QUERIES.mobileAndDown} {
    padding-bottom: 1rem;
  } */
`;

const GridWrapper = styled.div`
  padding: 2rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(450px, 100%), 1fr));
  gap: ${23 / 16}rem;
`;

const NewsCardLink = styled(Link)`
  color: var(--color-white);
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    &:hover article img {
      transform: scale(1.1);
    }
  }
`;

const NewsCard = styled.article`
  border-radius: 28px;
  position: relative;
  /* Image does not load if that's outside of the viewable area. Image position should be in the viewable area */
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    border-radius: 28px;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    transition: transform 0.35s ease-out;

    @supports not (aspect-ratio: 4 / 3) {
      height: 350px;
    }
  }
`;

const NewsCardText = styled.div`
  font-weight: 500;
  padding: 2rem;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  border-radius: 28px;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 30%,
    rgba(0, 0, 0, 0.7) 80%
  );
  line-height: 1.2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  p {
    margin-bottom: 2rem;
  }
  h2 {
    font-size: ${24 / 16}rem;
    max-width: 20ch;
    /* span {
      padding: 4px 0;
    } */
  }
`;

const StyleBubblesSection = styled.section`
  background-color: var(--color-background);
  margin-bottom: 0px;
  padding: 4.5rem 0;
  position: relative;

  @media ${QUERIES.mobileAndDown} {
    padding: 2rem 0;
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
            <Fade bottom distance='20px' delay={300} duration={2000}>
              <p>{data.homePage.headerText}</p>
            </Fade>
          </ContainerStyles>
        </HeroTextWrapper>
      </HeroSection>
      <LatestNewsSection>
        <InnerContainer>
          <GridWrapper>
            {latestNews.map((post, i) => (
              <Fade
                delay={350}
                left={i % 2 === 0}
                right={i % 2 !== 0}
                key={post._id}
                duration={700}
                distance='30px'
              >
                <NewsCardLink to={`/post/${post.slug.current}`}>
                  <NewsCard>
                    <Img
                      {...post.featuredImage.image}
                      alt={post.title}
                      style={{ position: 'static' }}
                    />
                    <NewsCardText>
                      <Fade delay={100}>
                        <p>
                          {DateTime.fromISO(post.publishedDate).toFormat(
                            'kkkk.LL.dd'
                          )}
                        </p>
                      </Fade>
                      <Fade bottom delay={200}>
                        <h2>
                          <span>{post.title}</span>
                        </h2>
                      </Fade>
                    </NewsCardText>
                  </NewsCard>
                </NewsCardLink>
              </Fade>
            ))}
          </GridWrapper>
        </InnerContainer>
      </LatestNewsSection>
      <StyleBubblesSection>
        <CurveDivider />
        <StlyesAnimation artists={artists} />
      </StyleBubblesSection>
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
    artists: allSanityArtist(sort: { fields: name, order: ASC }) {
      nodes {
        name
        slug {
          current
        }
        featuredImage {
          altText
          image {
            ...ImageWithPreview
          }
        }
        tagline
        styles {
          folk
          punk
          rock
          roots
          gipsy
          blues
          pop
          disco
        }
      }
    }
  }
`;
