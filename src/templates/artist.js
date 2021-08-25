import React, { useState } from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-plugin-sanity-image';
import {
  FaFacebookSquare,
  FaInstagram,
  FaSpotify,
  FaYoutube,
  FaGlobe,
  FaPlay,
} from 'react-icons/fa';
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

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper/core';
// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

const MainImage = styled(Img)`
  width: 100%;
  display: block;
  height: 350px;
  object-fit: cover;
  border-radius: 28px;
`;

const ArtistName = styled.h1`
  font-size: ${40 / 16}rem;
  font-weight: 700;
  color: var(--color-red);
  margin: 1rem 0;
`;

const BioWrapper = styled.div`
  max-width: 70ch;
  margin: 1rem 0;

  p {
    margin-bottom: 1rem;
  }
`;

const SocialIconsWrapper = styled.div`
  margin: 3rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: center;
  align-items: center;

  a {
    line-height: 0;
  }

  svg {
    fill: var(--color-red);
    width: 40px;
    height: 40px;
    transition: transform 0.2s ease-out;
  }

  @media (hover: hover) and (pointer: fine) {
    a:hover svg {
      fill: var(--color-red-hover);
      transform: scale(1.2);
    }
  }
`;

const PressKitWrapper = styled.div`
  margin: 2rem 0;
  display: grid;
  place-content: center;
`;

const PressKitLink = styled.a`
  font-size: ${30 / 16}rem;
  color: ${(p) =>
    p.pressKit === undefined ? 'lightgrey' : 'var(--color-red)'};
  text-decoration: underline;
  text-transform: uppercase;
  font-weight: 700;

  &:hover {
    color: ${(p) =>
      p.pressKit === undefined ? 'lightgrey' : 'var(--color-red-hover)'};
  }
`;

const YoutubeWrapper = styled.div`
  margin: 4rem 0;
`;

const SpotifyPlayerWrapper = styled.div``;

const PaginationWrapper = styled.div`
  margin: 4rem 0;
  font-size: ${24 / 16}rem;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: space-between;

  svg {
    width: 30px;
    height: 30px;
  }
`;

const PreviousWrapper = styled.div`
  justify-self: flex-start;
  a {
    color: var(--color-red);
  }
`;

const PreviousLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CTA = styled(Link)`
  text-align: center;
  justify-self: center;
  background-color: var(--color-red);
  color: var(--color-white);
  padding: 8px 16px;
  border-radius: 28px;
  &:hover {
    background-color: var(--color-red-hover);
  }
`;

const NextWrapper = styled.div`
  justify-self: flex-end;
  a {
    color: var(--color-red);
  }
`;

const NextLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
`;

export default function SingleArtistPage({ data }) {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(
    data.artist.videoGallery[0].url
  );
  const [playing, setPlaying] = useState(false);
  const singleArtist = data.artist;
  const bio = singleArtist.bio?.split('\n').map((p, i) => <p key={i}>{p}</p>);
  const spotifyArtistId = singleArtist.socialLinks?.spotify
    ?.split('/')[4]
    .split('?')[0];
  const embedUrl = `https://open.spotify.com/embed/artist/${spotifyArtistId}`;
  const { previous, next } = data;

  console.log(singleArtist);

  function changeVideo(videoUrl) {
    setSelectedVideoUrl(videoUrl);
    setPlaying(false);
  }

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
        <ArtistName>{singleArtist.name}</ArtistName>
        <BioWrapper>{bio}</BioWrapper>
        {singleArtist?.socialLinks && (
          <SocialIconsWrapper>
            {singleArtist?.socialLinks?.facebook && (
              <a
                href={singleArtist.socialLinks.facebook}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaFacebookSquare />
              </a>
            )}
            {singleArtist?.socialLinks?.instagram && (
              <a
                href={singleArtist.socialLinks.instagram}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaInstagram />
              </a>
            )}
            {singleArtist?.socialLinks?.spotify && (
              <a
                href={singleArtist.socialLinks.spotify}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaSpotify />
              </a>
            )}
            {singleArtist?.socialLinks?.youtube && (
              <a
                href={singleArtist.socialLinks.youtube}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaYoutube />
              </a>
            )}
            {singleArtist?.socialLinks?.website && (
              <a
                href={singleArtist.socialLinks.website}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FaGlobe />
              </a>
            )}
          </SocialIconsWrapper>
        )}
        <PressKitWrapper>
          <PressKitLink
            href={
              !singleArtist?.pressKit
                ? '#0'
                : `${singleArtist?.pressKit?.asset.url}?dl=${singleArtist.slug.current}-pressKit.zip`
            }
            download={!singleArtist?.pressKit ? false : true}
            pressKit={singleArtist?.pressKit?.asset.url}
          >
            Press kit
          </PressKitLink>
        </PressKitWrapper>
        <YoutubeWrapper>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${getYouTubeID(
              selectedVideoUrl
            )}`}
            light={true}
            width='100%'
            // TODO: Make it responsive
            height='460px'
            pip={true}
            controls={true}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onBuffer={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />
          {singleArtist.videoGallery.length > 1 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '1rem',
                marginTop: '1rem',
              }}
            >
              {singleArtist.videoGallery.map((video) => (
                <div key={video._key} onClick={() => changeVideo(video.url)}>
                  <div
                    style={{
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      style={{
                        width: '100%',
                        display: 'block',
                        objectFit: 'cover',
                        height: 150,
                        filter:
                          video.url === selectedVideoUrl
                            ? 'grayscale(100%)'
                            : 'grayscale(0%)',
                      }}
                      src={`https://i.ytimg.com/vi/${getYouTubeID(
                        video.url
                      )}/hqdefault.jpg`}
                      alt={video.title}
                      title={video.title}
                    />
                    {video.url === selectedVideoUrl ? (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          margin: 'auto',
                          display: 'grid',
                          placeContent: 'center',
                          placeItems: 'center',
                          backgroundColor: 'rgba(0,0,0,0.4)',
                          padding: 10,
                          textAlign: 'center',
                        }}
                      >
                        <AnimatedEq animated={playing} />
                        <p
                          style={{
                            color: 'var(--color-white)',
                            fontWeight: 500,
                          }}
                        >
                          {video.title}
                        </p>
                      </div>
                    ) : (
                      <FaPlay
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          width: 35,
                          height: 35,
                          margin: 'auto',
                        }}
                        color='var(--color-white)'
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </YoutubeWrapper>
        {singleArtist.socialLinks?.spotify && (
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
          <CTA to={`/contact`}>Book this band</CTA>
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
      styles {
        acapella
        folk
        punk
        rock
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
  }
`;
