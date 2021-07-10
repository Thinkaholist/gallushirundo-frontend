import React, { useState } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import getYouTubeID from 'get-youtube-id';
import YouTube from 'react-youtube';
import Layout from '../components/Layout';
import { FaPlay } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const Editorial = styled.div`
  margin: 1rem 0;

  code {
    font-size: 20px;
    background-color: yellow;
  }
`;

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
        asset {
          url
        }
      }
      featuredImage {
        asset {
          url
        }
      }
      imageGallery {
        asset {
          url
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
      <Layout>
        <Container>
          <div style={{ border: '1px solid', padding: '1rem' }}>
            <Editorial>
              <code>Name</code>
            </Editorial>
            <h2>{props.data.artist.name}</h2>
            <Editorial>
              <code>Logo</code>
            </Editorial>
            <div>
              <img
                src={props.data.artist.logo.asset.url}
                alt={props.data.artist.name}
                style={{ maxWidth: '30%' }}
              />
            </div>
            <Editorial>
              <code>Featured image</code>
            </Editorial>
            {props.data.artist.featuredImage && (
              <div>
                <img
                  src={props.data.artist.featuredImage.asset.url}
                  alt={props.data.artist.name}
                  style={{ width: '100%' }}
                />
              </div>
            )}
            <Editorial>
              <code>Bio</code>
            </Editorial>
            {props.data.artist.bio && (
              <>
                <div>{bio}</div>
              </>
            )}
            <Editorial>
              <code>Image Gallery</code>
            </Editorial>
            {props.data.artist.imageGallery && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {props.data.artist.imageGallery.map((image, i) => (
                  <div key={i}>
                    <img
                      src={image.asset.url}
                      alt='pic'
                      style={{ width: '100%' }}
                    />
                  </div>
                ))}
              </div>
            )}
            <Editorial>
              <code>Featured video</code>
            </Editorial>
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
            <Editorial>
              <code>Video Gallery</code>
            </Editorial>
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
            <Editorial>
              <code>Social Links</code>
            </Editorial>
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
            <Editorial>
              <code>
                Ha van Spotify link, akkor a Spotify Artist beágyazva:
              </code>
            </Editorial>
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
            <Editorial>
              <code>Agencies</code>
            </Editorial>
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
            <Editorial>
              <code>Press Kit (.zip)</code>
            </Editorial>
            {props.data.artist.pressKit && (
              <a
                href={`${props.data.artist?.pressKit?.asset?.url}?dl=${props.data.artist.slug.current}-pressKit.zip`}
              >
                Download Press kit
              </a>
            )}
          </div>
        </Container>
      </Layout>
    </>
  );
}
