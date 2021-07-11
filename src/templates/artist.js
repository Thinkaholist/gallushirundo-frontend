import React, { useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import getYouTubeID from 'get-youtube-id';
import YouTube from 'react-youtube';
import { FaPlay } from 'react-icons/fa';
import Img from 'gatsby-plugin-sanity-image';

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export default function SingleArtist(props) {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const spotifyArtistId = props.data.artist.socialLinks?.spotify
    ?.split('/')[4]
    .split('?')[0];
  const embedUrl = `https://open.spotify.com/embed/artist/${spotifyArtistId}`;

  const bio = props.data.artist.bio
    ?.split('\n')
    .map((p, i) => <p key={i}>{p}</p>);

  // const eventsArtistIds = props.data.events.edges.map((ev) => {
  //   const ids = ev.artists.map((artist) => artist._id);
  //   return ids;
  // });

  // const artistEvents = props.data.events.edges.filter((ev) =>
  //   ev.node.slug.current.includes('bohemian')
  // );
  // console.log('--EVENTS--', artistEvents);
  // console.log('--eventsArtistIds--', eventsArtistIds);

  function showVideo() {
    setIsVideoVisible(!isVideoVisible);
  }

  return (
    <>
      <Container>
        <div style={{ border: '1px solid', padding: '1rem' }}>
          <h2>{props.data.artist.name}</h2>
          <div>
            <Img
              {...props.data.artist.logo}
              width={300}
              alt={`band logo`}
              style={{ width: '30%' }}
            />
          </div>
          {props.data.artist.featuredImage && (
            <div>
              <Img
                {...props.data.artist?.featuredImage?.image}
                width={800}
                alt={props.data.artist.featuredImage.altText}
                style={{ width: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
          {props.data.artist.bio && (
            <>
              <div>{bio}</div>
            </>
          )}
          {props.data.artist.imageGallery && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {props.data.artist.imageGallery.map(({ image, altText }, i) => (
                <div key={i}>
                  <Img
                    {...image}
                    alt={altText}
                    width={300}
                    style={{ width: '100%' }}
                  />
                </div>
              ))}
            </div>
          )}
          {props.data.artist.featuredVideo && (
            <div style={{ position: 'relative', lineHeight: 1 }}>
              {!isVideoVisible ? (
                <>
                  <img
                    src={`https://img.youtube.com/vi/${getYouTubeID(
                      props.data.artist.featuredVideo.url
                    )}/maxresdefault.jpg`}
                    alt='video thumbnail'
                    style={{ width: '100%' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: '#fff',
                      padding: 15,
                      borderRadius: '50%',
                      width: 30,
                      height: 30,
                      display: 'grid',
                      placeItems: 'center',
                    }}
                    onClick={showVideo}
                  >
                    <FaPlay size={20} />
                  </div>
                </>
              ) : (
                <YouTube
                  videoId={getYouTubeID(props.data.artist.featuredVideo.url)}
                  opts={{
                    height: 'auto',
                    width: '100%',
                    playerVars: {
                      // https://developers.google.com/youtube/player_parameters
                      autoplay: 0,
                    },
                  }}
                />
              )}
            </div>
          )}
          {props.data.artist.videoGallery && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {props.data.artist.videoGallery.map((video, i) => (
                <div key={i}>
                  <YouTube
                    videoId={getYouTubeID(video.url)}
                    opts={{
                      width: '100%',
                      height: '200',
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <a
              href={props.data.artist.socialLinks.facebook}
              target='_blank'
              rel='noopener noreferrer'
            >
              Facebook
            </a>
            <a
              href={props.data.artist.socialLinks.instagram}
              target='_blank'
              rel='noopener noreferrer'
            >
              Instagram
            </a>
            <a
              href={props.data.artist.socialLinks.youtube}
              target='_blank'
              rel='noopener noreferrer'
            >
              YouTube
            </a>
            <a
              href={props.data.artist.socialLinks.spotify}
              target='_blank'
              rel='noopener noreferrer'
            >
              Spotify
            </a>
            <a
              href={props.data.artist.socialLinks.website}
              target='_blank'
              rel='noopener noreferrer'
            >
              Website
            </a>
          </div>
          {props.data.artist.socialLinks.spotify && (
            <>
              <iframe
                title='Spotify Album Embed'
                src={embedUrl}
                width='100%'
                height='380'
                frameBorder='0'
                allowtransparency='true'
                allow='encrypted-media'
              ></iframe>
            </>
          )}
          {props.data.artist.agencies && (
            <ul style={{ listStyleType: 'none', display: 'flex' }}>
              {props.data.artist.agencies.map((agency) => (
                <a
                  key={agency._id}
                  href={agency.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <li
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid',
                      borderRadius: 5,
                      padding: 6,
                    }}
                  >
                    <img
                      style={{ display: 'block', width: 50 }}
                      src={agency.logo.asset.url}
                      alt={agency.name}
                    />
                    <p>{agency.name}</p>
                  </li>
                </a>
              ))}
            </ul>
          )}
          {props.data.artist.pressKit && (
            <a
              href={`${props.data.artist?.pressKit?.asset?.url}?dl=${props.data.artist.slug.current}-pressKit.zip`}
            >
              Download Press kit
            </a>
          )}
        </div>
      </Container>
    </>
  );
}

export const query = graphql`
  query details($slug: String!) {
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
