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
import { FiDownload } from 'react-icons/fi';
import getYouTubeID from 'get-youtube-id';
import ReactPlayer from 'react-player/youtube';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import { ContainerStyles } from '../styles/ContainerStyles';
import AnimatedEq from '../components/AnimatedEq';
import Seo from '../components/Seo';
import { QUERIES } from '../constants';

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
    /* fill: hsl(var(--color-red));
    fill: var(--color-black); */
    width: 40px;
    height: 40px;
    transition: transform 0.35s ease-in-out;
  }

  @media (hover: hover) and (pointer: fine) {
    /* a:hover svg {
      fill: hsl(var(--color-red));
    } */

    a:nth-of-type(odd):hover svg {
      transform: scale(1.4) rotate(10deg);
    }

    a:nth-of-type(even):hover svg {
      transform: scale(1.4) rotate(-10deg);
    }
  }

  @media ${QUERIES.mobileAndDown} {
    gap: 2rem;

    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

const FacebookIcon = styled(FaFacebookSquare)`
  color: var(--color-matyo-orange);
`;

const InstaIcon = styled(FaInstagram)`
  color: var(--color-matyo-blue);
`;

const SpotifyIcon = styled(FaSpotify)`
  color: hsl(var(--color-red));
`;

const YoutubeIcon = styled(FaYoutube)`
  color: var(--color-matyo-purple);
`;

const WebIcon = styled(FaGlobe)`
  color: var(--color-black);
`;

const PressKitWrapper = styled.div`
  margin: 2rem 0;
  display: grid;
  place-content: center;

  @media ${QUERIES.mobileAndDown} {
    display: none;
  }
`;

const PressKitLink = styled.a`
  font-size: ${24 / 16}rem;
  background-color: hsl(var(--color-red));
  background-color: var(--color-black);
  color: var(--color-white);
  padding: 6px 12px;
  border-radius: 28px;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 700;
  transition: transform 0.35s, background-color 0.2s linear;

  svg {
    display: none;
    transition: all 0.3s;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: hsl(var(--color-red));
      transform: scale(1.1);

      svg {
        display: block;
      }
    }
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
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: space-between;

  svg {
    width: 30px;
    height: 30px;
  }

  @media ${QUERIES.mobileAndDown} {
    margin: 2rem 0 0;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }
`;

const PreviousWrapper = styled.div`
  justify-self: flex-start;
  a {
    color: hsl(var(--color-red));
  }
`;

const PreviousLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media ${QUERIES.mobileAndDown} {
    font-size: 14px;
  }
`;

const CTA = styled(Link)`
  text-align: center;
  justify-self: center;
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
    padding: 4px 8px;
    font-size: ${16 / 16}rem;
  }
`;

const NextWrapper = styled.div`
  justify-self: flex-end;
  a {
    color: hsl(var(--color-red));
  }
`;

const NextLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;

  @media ${QUERIES.mobileAndDown} {
    font-size: 14px;
  }
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
            {singleArtist?.socialLinks?.spotify && (
              <a
                href={singleArtist.socialLinks.spotify}
                title={singleArtist.socialLinks.spotify}
                target='_blank'
                rel='noopener noreferrer'
              >
                <SpotifyIcon />
              </a>
            )}
            {singleArtist?.socialLinks?.facebook && (
              <a
                href={singleArtist.socialLinks.facebook}
                title={singleArtist.socialLinks.facebook}
                target='_blank'
                rel='noopener noreferrer'
              >
                <FacebookIcon />
              </a>
            )}
            {singleArtist?.socialLinks?.youtube && (
              <a
                href={singleArtist.socialLinks.youtube}
                title={singleArtist.socialLinks.youtube}
                target='_blank'
                rel='noopener noreferrer'
              >
                <YoutubeIcon />
              </a>
            )}
            {singleArtist?.socialLinks?.instagram && (
              <a
                href={singleArtist.socialLinks.instagram}
                title={singleArtist.socialLinks.instagram}
                target='_blank'
                rel='noopener noreferrer'
              >
                <InstaIcon />
              </a>
            )}
            {singleArtist?.socialLinks?.website && (
              <a
                href={singleArtist.socialLinks.website}
                title={singleArtist.socialLinks.website}
                target='_blank'
                rel='noopener noreferrer'
              >
                <WebIcon />
              </a>
            )}
          </SocialIconsWrapper>
        )}
        {singleArtist?.pressKit && (
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
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {data.sanitySingleArtistPage.pressKitText}
                <FiDownload size={24} />
              </span>
            </PressKitLink>
          </PressKitWrapper>
        )}
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
                <div key={video._key} onClick={() => changeVideo(video.url)}>
                  <ThumbnailWrapper>
                    <ThumbnailImage
                      videoUrl={video.url}
                      selectedVideoUrl={selectedVideoUrl}
                      src={`https://i.ytimg.com/vi/${getYouTubeID(
                        video.url
                      )}/maxresdefault.jpg`}
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
          <CTA to={`/contact`}>{data.sanitySingleArtistPage.ctaButtonText}</CTA>
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
    sanitySingleArtistPage(_id: { eq: "singleArtistPage" }) {
      pressKitText
      youtubeHeadline
      spotifyHeadline
      ctaButtonText
    }
  }
`;
