import React, { useState } from 'react';
import { graphql, Link } from 'gatsby';
import getYouTubeID from 'get-youtube-id';
import YouTube from 'react-youtube';
import { FaPlay } from 'react-icons/fa';
import Img from 'gatsby-plugin-sanity-image';
import { ContainerStyles } from '../styles/ContainerStyles';
import { ContentStyles } from '../styles/ContentStyles';

export default function SingleArtist(props) {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const spotifyArtistId = props.data.artist.socialLinks?.spotify
    ?.split('/')[4]
    .split('?')[0];
  const embedUrl = `https://open.spotify.com/embed/artist/${spotifyArtistId}`;

  const bio = props.data.artist.bio
    ?.split('\n')
    .map((p, i) => <p key={i}>{p}</p>);

  const filteredEvents = props.data.events.edges.filter(({ node }) => {
    // const artistsIds = node.artists.map((artist) => artist._id);
    // console.log('artistsIds', artistsIds);
    return props.data.artist._id === node.artists[0]._id;
  });

  console.log('--events--', props.data.events.edges);
  console.log('--filteredEvents--', filteredEvents);

  function showVideo() {
    setIsVideoVisible(!isVideoVisible);
  }

  return (
    <>
      <ContainerStyles>
        <div>
          {/* <h2>{props.data.artist.name}</h2> */}
          {props.data.artist.featuredImage && (
            <div style={{ marginTop: 40 }}>
              <Img
                {...props.data.artist?.featuredImage?.image}
                width={800}
                alt={props.data.artist.featuredImage.altText}
                style={{ width: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
          <div
            style={{ display: 'grid', placeItems: 'center', margin: '40px 0' }}
          >
            <Img
              {...props.data.artist.logo}
              width={300}
              alt={`band logo`}
              style={{ width: 200 }}
            />
          </div>
          <ContentStyles margin={`0 auto`}>
            {props.data.artist.bio && (
              <>
                <div style={{ marginBottom: 40 }}>{bio}</div>
              </>
            )}
          </ContentStyles>
          {props.data.artist.featuredVideo && (
            <div style={{ position: 'relative', lineHeight: 1 }}>
              {/* {!isVideoVisible ? (
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
                    role='button'
                    tabIndex={0}
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
              )} */}
              <YouTube
                videoId={getYouTubeID(props.data.artist.featuredVideo.url)}
                opts={{
                  height: '480px',
                  width: '100%',
                  playerVars: {
                    // https://developers.google.com/youtube/player_parameters
                    autoplay: 0,
                  },
                }}
              />
            </div>
          )}
          {props.data.artist.videoGallery && (
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
              }}
            >
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
          {filteredEvents.length > 0 && (
            <>
              <section style={{ marginBottom: '1rem' }}>
                <h2>Upcoming Events</h2>
                {filteredEvents.map(({ node }) => (
                  <div key={node._id}>
                    <h3>
                      <Link to={`/event/${node.slug.current}`}>
                        {node.title}
                      </Link>
                    </h3>
                  </div>
                ))}
              </section>
            </>
          )}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
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
      </ContainerStyles>
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
