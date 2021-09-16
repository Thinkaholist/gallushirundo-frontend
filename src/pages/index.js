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
import FolkDivider from '../components/FolkDivider';

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
    rgba(0, 0, 0, 0.7) 80%
  );

  p {
    font-size: ${30 / 16}rem;
    color: var(--color-white);
    line-height: 1.2;
    position: absolute;
    bottom: 5rem;
    max-width: min(790px, 80%);

    @media ${QUERIES.mobileAndDown} {
      bottom: 8rem;
      font-size: ${24 / 16}rem;
      max-width: 100%;
      text-align: center;
      left: 1rem;
      right: 1rem;
      line-height: 1.4;
    }
  }
`;

const InnerContainer = styled(ContainerStyles)`
  padding-bottom: ${300 / 16}rem;

  @media ${QUERIES.mobileAndDown} {
    padding-bottom: ${80 / 16}rem;
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
  background-color: hsl(var(--color-red));
  color: var(--color-white);
  margin-top: 2rem;
  margin-bottom: -40px;
  border-bottom: 1px solid var(--color-white);
  padding: 3rem 0;
  position: relative;
`;

const Divider = styled.div`
  transform: translateY(calc(-100% + 1.3px));
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  /* border: 2px solid blue; */
  z-index: 1;
`;

const Svg = styled.svg`
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
`;

const Path = styled.path`
  fill: hsl(var(--color-red));
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
            <Fade bottom distance='20px' delay={350}>
              <p>{data.homePage.headerText}</p>
            </Fade>
          </ContainerStyles>
        </HeroTextWrapper>
      </HeroSection>
      <InnerContainer>
        <GridWrapper>
          {latestNews.map((post, i) => (
            <Fade
              distance='50px'
              delay={350}
              left={i % 2 === 0}
              right={i % 2 !== 0}
              key={post._id}
            >
              <NewsCardLink to={`/post/${post.slug.current}`}>
                <NewsCard>
                  <Img {...post.featuredImage.image} alt={post.title} />
                  <NewsCardText>
                    <Fade delay={100}>
                      <p>
                        {DateTime.fromISO(post.publishedDate).toFormat(
                          'kkkk.LL.dd'
                        )}
                      </p>
                    </Fade>
                    <Fade bottom delay={250}>
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
      <StyleBubblesSection>
        <FolkDivider />
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
            asset {
              url
            }
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
