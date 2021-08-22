import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Img from 'gatsby-plugin-sanity-image';
import {
  FaFacebookSquare,
  FaInstagram,
  FaSpotify,
  FaYoutube,
  FaGlobe,
} from 'react-icons/fa';
import { ContainerStyles } from '../styles/ContainerStyles';

const MainImage = styled(Img)`
  width: 100%;
  display: block;
  /* aspect-ratio: 3 / 1; */
  /* Seems better! */
  height: 320px;
  object-fit: cover;
  border-radius: 28px;

  /* @supports not (aspect-ratio: 3 / 1) {
    height: 320px;
  } */
`;

const ArtistName = styled.h1`
  font-size: ${40 / 16}rem;
  font-weight: 700;
  color: var(--color-red);
  margin: 2rem 0;
`;

const BioWrapper = styled.div`
  max-width: 70ch;
  margin: 2rem 0;

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

  a:hover svg {
    fill: var(--color-red-hover);
    transform: scale(1.1);
  }

  svg {
    fill: var(--color-red);
    width: 40px;
    height: 40px;
    transition: transform 0.2s ease-out;
  }
`;

const PressKitWrapper = styled.div`
  margin: 2rem 0;
  display: grid;
  place-content: center;
`;

const PressKitLink = styled.a`
  font-size: ${30 / 16}rem;
  color: var(--color-red);
  text-decoration: underline;
  text-transform: uppercase;
  font-weight: 700;

  &:hover {
    color: var(--color-red-hover);
  }
`;

const SpotifyPlayerWrapper = styled.div``;

export default function SingleArtistPage({ data }) {
  const singleArtist = data.artist;
  const bio = singleArtist.bio?.split('\n').map((p, i) => <p key={i}>{p}</p>);
  const spotifyArtistId = singleArtist.socialLinks?.spotify
    ?.split('/')[4]
    .split('?')[0];
  const embedUrl = `https://open.spotify.com/embed/artist/${spotifyArtistId}`;

  console.log(singleArtist);

  return (
    <>
      <ContainerStyles>
        <MainImage
          {...singleArtist.featuredImage.image}
          alt={singleArtist.featuredImage.altText}
        />
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
        {singleArtist?.pressKit && (
          <PressKitWrapper>
            <PressKitLink
              href={`${singleArtist.pressKit.asset.url}?dl=${singleArtist.slug.current}-pressKit.zip`}
              download
            >
              Press kit
            </PressKitLink>
          </PressKitWrapper>
        )}
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
        altText
        image {
          ...ImageWithPreview
        }
      }
      featuredVideo {
        title
        url
      }
      videoGallery {
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
