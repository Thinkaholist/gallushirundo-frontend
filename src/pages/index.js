import React, { useState, useEffect } from 'react';
import { graphql, Link } from 'gatsby';
import { DateTime } from 'luxon';
import { ContainerStyles } from '../styles/ContainerStyles';
import {
  HiOutlineArrowNarrowLeft as LeftArrow,
  HiOutlineArrowNarrowRight as RightArrow,
} from 'react-icons/hi';
import styled from 'styled-components';
import Img from 'gatsby-plugin-sanity-image';
import Seo from '../components/Seo';
import { QUERIES } from '../constants';
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';
import Pulse from 'react-reveal/Pulse';
import Fade from 'react-reveal/Fade';

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
  padding: 70px;
`;

const InnerContainer = styled(ContainerStyles)``;

const ArrowWrapper = styled.button`
  background-color: inherit;
  border: none;
  cursor: pointer;
  display: grid;
  place-content: center;
  border-radius: 12px;

  svg {
    width: 70px;
    height: 70px;
    color: var(--color-white);
  }

  &:hover {
    background-color: #ff6670;
  }
`;

const Swiper = styled.div`
  display: grid;
  grid-template-columns: 150px auto 150px;

  @media ${QUERIES.mobileAndDown} {
    grid-template-columns: 1fr 4fr 1fr;
  }
`;

const ArtistImageWrapper = styled.div`
  width: min(${380 / 16}rem, 100%);
  margin: 0 auto 1rem;
`;

const ArtistImage = styled(Img)`
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;

  @media ${QUERIES.mobileAndDown} {
    width: 100%;
    height: auto;
  }
`;

const InfoBox = styled.div`
  text-align: center;
`;

const Tagline = styled.h2`
  font-size: ${24 / 16}rem;
  max-width: 600px;
  min-height: 100px;
  margin: 0.5rem auto;
`;

const CtaButton = styled(Link)`
  color: inherit;
  display: inline-block;
  border: 1px solid;
  border-radius: 28px;
  padding: 6px 18px;
  letter-spacing: 1px;
  background-color: var(--color-white);
  color: hsl(var(--color-red));
  transition: background-color 0.2s, color 0.2s;
  min-width: min(100%, 450px);

  &:hover {
    background-color: hsl(var(--color-red));
    color: var(--color-white);
  }
`;

export default function HomePage({ data }) {
  const latestNews = data.posts.nodes;
  const artists = data.artists.nodes;
  const heroImage = data.homePage.heroImage.image.asset.url;
  const [selectedArtist, setSelectedArtist] = useState(artists[0]);
  const indexOfSelected = artists.indexOf(selectedArtist);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'ArrowRight') {
        goRight();
      }
      if (e.key === 'ArrowLeft') {
        goLeft();
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goLeft, goRight]);

  function goRight() {
    if (indexOfSelected === artists.length - 1) {
      setSelectedArtist(artists[0]);
    } else {
      setSelectedArtist(artists[indexOfSelected + 1]);
    }
  }

  function goLeft() {
    if (indexOfSelected === 0) {
      setSelectedArtist(artists[artists.length - 1]);
    } else {
      setSelectedArtist(artists[indexOfSelected - 1]);
    }
  }

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
      <ContainerStyles>
        <GridWrapper>
          {latestNews.map((post, i) => (
            <Fade
              distance='50px'
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
      </ContainerStyles>
      <StyleBubblesSection>
        <InnerContainer>
          <Swiper>
            <ArrowWrapper onClick={goLeft} aria-label='go left'>
              <LeftArrow />
            </ArrowWrapper>
            <Zoom delay={150}>
              <ArtistImageWrapper>
                <ArtistImage
                  {...selectedArtist.featuredImage.image}
                  alt={selectedArtist.featuredImage.altText}
                />
              </ArtistImageWrapper>
            </Zoom>
            <ArrowWrapper onClick={goRight} aria-label='go right'>
              <RightArrow />
            </ArrowWrapper>
          </Swiper>
          <InfoBox>
            <Tagline>{selectedArtist.tagline}</Tagline>
            <Pulse delay={200}>
              <CtaButton to={`/artist/${selectedArtist.slug.current}`}>
                Listen{' '}
                <span style={{ fontWeight: 700, textTransform: 'uppercase' }}>
                  {selectedArtist.name}
                </span>
              </CtaButton>
            </Pulse>
          </InfoBox>
        </InnerContainer>
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
        }
      }
    }
  }
`;
