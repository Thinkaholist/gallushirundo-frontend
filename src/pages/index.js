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

export default function HomePage({ data }) {
  return (
    <>
      <Container>
        <h1>{data.siteSettings.title}</h1>
        <p>{data.siteSettings.description}</p>

        <hr />
        <h2>Artist</h2>
        <div style={{ border: '1px solid', padding: '1rem' }}>
          <Editorial>
            <code>Name</code>
          </Editorial>
          <h2>{data.sanityArtist.name}</h2>
          <Editorial>
            <code>Featured image</code>
          </Editorial>
          <div>
            <img
              src={data.sanityArtist.featuredImage.asset.url}
              alt={data.sanityArtist.name}
              style={{ width: '100%' }}
            />
          </div>
          <Editorial>
            <code>Image Gallery</code>
          </Editorial>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {data.sanityArtist.imageGallery.map((image) => (
              <div>
                <img
                  src={image.asset.url}
                  alt='pic'
                  style={{ width: '100%' }}
                />
              </div>
            ))}
          </div>
          <Editorial>
            <code>Featured video</code>
          </Editorial>
          <YouTube
            videoId={getYouTubeID(data.sanityArtist.featuredVideo.url)}
            opts={{
              height: '480',
              width: '100%',
              playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 0,
              },
            }}
          />
          <Editorial>
            <code>Video Gallery</code>
          </Editorial>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {data.sanityArtist.videoGallery.map((video) => (
              <div>
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
          <Editorial>
            <code>Social Links</code>
          </Editorial>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <a
              href={data.sanityArtist.socialLinks.facebook}
              target='_blank'
              rel='noopener noreferrer'
            >
              Facebook
            </a>
            <a
              href={data.sanityArtist.socialLinks.instagram}
              target='_blank'
              rel='noopener noreferrer'
            >
              Instagram
            </a>
            <a
              href={data.sanityArtist.socialLinks.youtube}
              target='_blank'
              rel='noopener noreferrer'
            >
              YouTube
            </a>
            <a
              href={data.sanityArtist.socialLinks.spotify}
              target='_blank'
              rel='noopener noreferrer'
            >
              Spotify
            </a>
            <a
              href={data.sanityArtist.socialLinks.website}
              target='_blank'
              rel='noopener noreferrer'
            >
              Website
            </a>
          </div>
          <Editorial>
            <code>Press Kit (.zip)</code>
          </Editorial>
          <a
            href={`${data.sanityArtist?.pressKit?.asset?.url}?dl=${data.sanityArtist.slug.current}-pressKit.zip`}
          >
            Download Press kit
          </a>
        </div>
      </Container>
    </>
  );
}

export const query = graphql`
  query {
    siteSettings: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      _id
      title
      description
    }
    sanityArtist(slug: { current: { eq: "bohemian-betyars" } }) {
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
