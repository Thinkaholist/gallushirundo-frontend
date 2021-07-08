import React from 'react';
import { graphql, Link } from 'gatsby';
import usePromise from 'react-use-promise';
import { client } from '../client';
import PortableText from '@sanity/block-content-to-react';
import Layout from '../components/Layout';
import { Editorial } from './artist';
import YouTube from 'react-youtube';
import getYoutubeId from 'get-youtube-id';
import urlBuilder from '@sanity/image-url';

function urlFor(source) {
  return urlBuilder({
    projectId: 'q7xlgfk0',
    dataset: 'production',
  }).image(source);
}

export const query = graphql`
  query ($slug: String!) {
    post: sanityPost(slug: { current: { eq: $slug } }) {
      _id
      title
      slug {
        current
      }
      featuredImage {
        asset {
          url
        }
      }
      excerpt
      _rawBody(resolveReferences: { maxDepth: 4 })
    }
  }
`;

export default function SinglePost(props) {
  const serializers = {
    marks: {
      internalLink: ({ mark, children }) => (
        <Link to={`/${mark.reference._type}/${mark.reference.slug.current}`}>
          {children}
        </Link>
      ),
    },
    types: {
      spotifyAlbum: (props) => {
        const albumLink = props.node.albumLink;
        const albumId = albumLink.split('/')[4].split('?')[0];
        if (!albumId || albumId.length !== 22) return null;
        const embedUrl = `https://open.spotify.com/embed/album/${albumId}`;
        return (
          <>
            <iframe
              title='Spotify Album Embed'
              src={embedUrl}
              width='100%'
              height={props.node.compactView ? '80' : '380'}
              frameBorder='0'
              allowtransparency='true'
              allow='encrypted-media'
            ></iframe>
          </>
        );
      },
      spotifyTrack: (props) => {
        const trackLink = props.node.trackLink;
        const trackId = trackLink.split('/')[4].split('?')[0];
        if (!trackId || trackId.length !== 22) return null;
        const embedUrl = `https://open.spotify.com/embed/track/${trackId}`;

        return (
          <>
            <iframe
              title='Spotify Track Preview'
              src={embedUrl}
              width='100%'
              height={props.node.compactView ? '80' : '380'}
              frameBorder='0'
              allowtransparency='true'
              allow='encrypted-media'
            ></iframe>
          </>
        );
      },
      youtubeVideo: (props) => {
        const id = getYoutubeId(props.node.url);
        if (!id) return '';

        const opts = {
          // height: '450',
          width: '100%',
        };

        return (
          <>
            <YouTube videoId={id} opts={opts} />
          </>
        );
      },
      imageEmbed: ({ node: { imageEmbed } }) => {
        return (
          <>
            <div>
              <img
                src={urlFor(imageEmbed.asset)}
                alt={imageEmbed.altText}
                style={{ width: '100%' }}
              />
            </div>
            {imageEmbed.caption && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <small style={{ color: 'darkgray' }}>
                  {imageEmbed.caption}
                </small>
              </div>
            )}
          </>
        );
      },
    },
  };

  return (
    <>
      <Layout>
        <Editorial>
          <code>Title</code>
        </Editorial>
        <h1>{props.data.post.title}</h1>
        <Editorial>
          <code>Excerpt</code>
        </Editorial>
        <p>{props.data.post.excerpt}</p>
        <hr />
        <Editorial>
          <code>Body</code>
        </Editorial>
        <PortableText
          blocks={props.data.post._rawBody}
          serializers={serializers}
        />
      </Layout>
    </>
  );
}
