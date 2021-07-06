import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import getYouTubeID from 'get-youtube-id';
import YouTube from 'react-youtube';

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Editorial = styled.div`
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
      pressKit {
        asset {
          originalFilename
          url
        }
      }
    }
  }
`;

export default function SingleArtist(props) {
  return (
    <>
      <Container>
        <div style={{ border: '1px solid', padding: '1rem' }}>
          <Editorial>
            <code>Name</code>
          </Editorial>
          <h2>{props.data.artist.name}</h2>
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
            <YouTube
              videoId={getYouTubeID(props.data.artist.featuredVideo.url)}
              opts={{
                height: '480',
                width: '100%',
                playerVars: {
                  // https://developers.google.com/youtube/player_parameters
                  autoplay: 0,
                },
              }}
            />
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
    </>
  );
}
