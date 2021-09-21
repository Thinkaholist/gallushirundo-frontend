import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-plugin-sanity-image';
import { FaPlay } from 'react-icons/fa';
import {
  HiOutlineArrowNarrowLeft as LeftArrow,
  HiOutlineArrowNarrowRight as RightArrow,
} from 'react-icons/hi';
import getYouTubeID from 'get-youtube-id';
import ReactPlayer from 'react-player/youtube';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import { ContainerStyles } from '../styles/ContainerStyles';
import AnimatedEq from '../components/AnimatedEq';
import Seo from '../components/Seo';
import SocialBox from '../components/SocialBox';
import { QUERIES } from '../constants';
import Fade from 'react-reveal/Fade';
import { arrowBounceLeft, arrowBounceRight } from '../styles/animations';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper/core';
// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

const MainImage = styled(Img)`
  width: 100%;
  display: block;
  height: 460px;
  object-fit: cover;
  border-radius: 28px;

  @media ${QUERIES.mobileAndDown} {
    height: 300px;
  }
`;

const ArtistName = styled.h1`
  font-size: ${40 / 16}rem;
  font-weight: 700;
  color: hsl(var(--color-red));
  margin: 1rem 0;
`;

const BodyGridWrapper = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;

  @media ${QUERIES.tabletAndDown} {
    grid-template-columns: 1fr 1fr;
  }
  @media ${QUERIES.mobileAndDown} {
    grid-template-columns: 1fr;
  }
`;

const BioWrapper = styled.div`
  /* max-width: 70ch; */

  p {
    margin-bottom: 1rem;
  }
`;

const SubHeadline = styled.h2`
  color: hsl(var(--color-red));
  font-style: italic;

  @media ${QUERIES.mobileAndDown} {
    text-align: center;
    font-size: ${24 / 16}rem;
  }
`;

const YoutubeWrapper = styled.div`
  margin: 2rem 0;
`;

const ThumbnailGrid = styled.div`
  --spacing: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--spacing);
  margin-top: var(--spacing);

  @media ${QUERIES.mobileAndDown} {
    --spacing: 0.5rem;
  }
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  cursor: pointer;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  display: block;
  object-fit: cover;
  height: 150px;
  filter: ${(p) =>
    p.videoUrl === p.selectedVideoUrl ? 'grayscale(100%)' : 'grayscale(0%)'};

  @media ${QUERIES.mobileAndDown} {
    height: 60px;
  }
`;

const SelectedThumbnailOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  display: grid;
  place-content: center;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px;
  text-align: center;
`;

const ThumbnailTitle = styled.p`
  color: var(--color-white);
  font-weight: 500;

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;

  @media ${QUERIES.mobileAndDown} {
    font-weight: 400;
    font-size: ${14 / 16}rem;
    -webkit-line-clamp: 1;
  }
`;

const PlayIcon = styled(FaPlay)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 35px;
  height: 35px;
  margin: auto;
  color: var(--color-white);

  @media ${QUERIES.mobileAndDown} {
    width: 20px;
    height: 20px;
  }
`;

const SpotifyPlayerWrapper = styled.div`
  margin: 2rem 0;
`;

const PaginationWrapper = styled.div`
  margin: 4rem 0;
  font-size: ${24 / 16}rem;
  display: grid;
  gap: 2rem;
  grid-template-columns: 2fr 3fr 2fr;
  align-items: center;
  grid-template-areas: 'left-arrow cta right-arrow';
  svg {
    width: 40px;
    height: 40px;
  }

  @media ${QUERIES.mobileAndDown} {
    margin: 2rem 0 0;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'left-arrow right-arrow'
      'cta cta';
  }
`;

const PreviousWrapper = styled.div`
  grid-area: left-arrow;
  align-self: stretch;
  a {
    color: hsl(var(--color-red));
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover svg {
      animation: ${arrowBounceLeft} 0.35s;
    }
  }
`;

const PreviousLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media ${QUERIES.mobileAndDown} {
    font-size: 18px;
  }
`;

const Cta = styled(Link)`
  display: block;
  text-align: center;
  grid-area: cta;
  background-color: hsl(var(--color-red));
  color: var(--color-white);
  padding: 8px 16px;
  border-radius: 28px;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: var(--color-red-hover);
    }
  }

  @media ${QUERIES.mobileAndDown} {
    font-size: ${20 / 16}rem;
  }
`;

const NextWrapper = styled.div`
  grid-area: right-arrow;
  align-self: stretch;
  a {
    color: hsl(var(--color-red));
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover svg {
      animation: ${arrowBounceRight} 0.35s;
    }
  }
`;

const NextLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;

  @media ${QUERIES.mobileAndDown} {
    font-size: 18px;
  }
`;

export default function SingleArtistPage({ data }) {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(
    data.artist.videoGallery[0].url
  );
  const [playing, setPlaying] = useState(false);
  const singleArtist = data.artist;
  const bio = singleArtist.bio?.split('\n').map((p, i) => <p key={i}>{p}</p>);
  const pressKitText = data.sanitySingleArtistPage.pressKitText;
  const spotifyArtistId = singleArtist.socialLinks?.spotify
    ?.split('/')[4]
    .split('?')[0];
  const embedUrl = `https://open.spotify.com/embed/artist/${spotifyArtistId}`;
  const { previous, next } = data;

  function changeVideo(videoUrl) {
    setSelectedVideoUrl(videoUrl);
    setPlaying(false);
  }

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 's') {
        changeVideo(e.target.dataset.videourl);
      }
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <Seo title={singleArtist.name} />
      <ContainerStyles>
        {/* If no Image Gallery just show the featured image */}
        {singleArtist?.imageGallery.length === 0 && (
          <MainImage
            {...singleArtist.featuredImage.image}
            alt={singleArtist.featuredImage.altText}
          />
        )}
        {/* If there is an Image Gallery make a Swiper */}
        {singleArtist?.imageGallery.length > 0 && (
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            loop={true}
          >
            <SwiperSlide>
              <MainImage
                {...singleArtist.featuredImage.image}
                alt={singleArtist.featuredImage.altText}
              />
            </SwiperSlide>
            {singleArtist?.imageGallery &&
              singleArtist.imageGallery.map((image) => (
                <SwiperSlide key={image._key}>
                  <MainImage {...image.image} alt={image.altText} />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
        <Fade delay={100} bottom distance='10px'>
          <ArtistName>{singleArtist.name}</ArtistName>
        </Fade>
        <BodyGridWrapper>
          <Fade bottom distance='5px'>
            <BioWrapper>{bio}</BioWrapper>
          </Fade>
          <Fade delay={100} right distance='10px'>
            <SocialBox
              singleArtist={singleArtist}
              pressKitText={pressKitText}
            />
          </Fade>
        </BodyGridWrapper>
        <SubHeadline>{data.sanitySingleArtistPage.youtubeHeadline}</SubHeadline>
        <YoutubeWrapper>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${getYouTubeID(
              selectedVideoUrl
            )}`}
            light={true}
            width='100%'
            height='460px'
            // TODO: Make it responsive
            pip={true}
            controls={true}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onBuffer={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />
          {singleArtist.videoGallery.length > 1 && (
            <ThumbnailGrid>
              {singleArtist.videoGallery.map((video) => (
                <div
                  key={video._key}
                  onClick={() => changeVideo(video.url)}
                  role='button'
                  tabIndex={0}
                  data-videourl={video.url}
                >
                  <ThumbnailWrapper>
                    <ThumbnailImage
                      videoUrl={video.url}
                      selectedVideoUrl={selectedVideoUrl}
                      src={`https://i.ytimg.com/vi/${getYouTubeID(
                        video.url
                      )}/hqdefault.jpg`}
                      alt={video.title}
                      title={video.title}
                    />
                    {video.url === selectedVideoUrl ? (
                      <SelectedThumbnailOverlay>
                        <AnimatedEq animated={playing} />
                        <ThumbnailTitle>{video.title}</ThumbnailTitle>
                      </SelectedThumbnailOverlay>
                    ) : (
                      <PlayIcon />
                    )}
                  </ThumbnailWrapper>
                </div>
              ))}
            </ThumbnailGrid>
          )}
        </YoutubeWrapper>
        {singleArtist.socialLinks?.spotify && (
          <>
            <SubHeadline>
              {data.sanitySingleArtistPage.spotifyHeadline}
            </SubHeadline>
            <SpotifyPlayerWrapper>
              <iframe
                title='Spotify Album Embed'
                src={embedUrl}
                width='100%'
                height='380'
                frameBorder='0'
                allowtransparency='true'
                allow='encrypted-media'
              ></iframe>
            </SpotifyPlayerWrapper>
          </>
        )}
        <PaginationWrapper>
          <PreviousWrapper>
            {previous && (
              <PreviousLink to={`/artist/${previous.slug.current}`}>
                <LeftArrow />
                <p>{previous.name}</p>
              </PreviousLink>
            )}
          </PreviousWrapper>
          <Cta to={`/contact#contact-cta`}>
            {data.sanitySingleArtistPage.ctaButtonText}
          </Cta>
          <NextWrapper>
            {next && (
              <NextLink to={`/artist/${next.slug.current}`}>
                <RightArrow />
                <p>{next.name}</p>
              </NextLink>
            )}
          </NextWrapper>
        </PaginationWrapper>
      </ContainerStyles>
    </>
  );
}

export const query = graphql`
  query details($slug: String!, $previousSlug: String, $nextSlug: String) {
    artist: sanityArtist(slug: { current: { eq: $slug } }) {
      _id
      name
      slug {
        current
      }
      bio
      logo {
        ...ImageWithPreview
      }
      featuredImage {
        altText
        image {
          ...ImageWithPreview
        }
      }
      imageGallery {
        _key
        altText
        image {
          ...ImageWithPreview
        }
      }
      videoGallery {
        _key
        title
        url
      }
      socialLinks {
        facebook
        instagram
        youtube
        spotify
        website
      }
      agencies {
        _id
        name
        website
        logo {
          asset {
            url
          }
        }
      }
      pressKit {
        asset {
          originalFilename
          url
        }
      }
    }
    previous: sanityArtist(slug: { current: { eq: $previousSlug } }) {
      slug {
        current
      }
      name
    }
    next: sanityArtist(slug: { current: { eq: $nextSlug } }) {
      slug {
        current
      }
      name
    }
    events: allSanityEvent(sort: { fields: date, order: ASC }) {
      edges {
        node {
          _id
          title
          slug {
            current
          }
          artists {
            _id
            name
          }
        }
      }
    }
    sanitySingleArtistPage(_id: { eq: "singleArtistPage" }) {
      pressKitText
      youtubeHeadline
      spotifyHeadline
      ctaButtonText
    }
  }
`;
