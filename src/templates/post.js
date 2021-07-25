import React from 'react';
import styled from 'styled-components';
import { graphql, Link } from 'gatsby';
import PortableText from '@sanity/block-content-to-react';
import YouTube from 'react-youtube';
import getYoutubeId from 'get-youtube-id';
import urlBuilder from '@sanity/image-url';
import {
  FaFacebookSquare as FacebookIcon,
  FaInstagram,
  FaSpotify,
  FaYoutube,
  FaGlobe,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import Img from 'gatsby-plugin-sanity-image';
import { ContainerStyles } from '../styles/ContainerStyles';
import { ContentStyles } from '../styles/ContentStyles';

function urlFor(source) {
  return urlBuilder({
    projectId: 'q7xlgfk0',
    dataset: 'production',
  }).image(source);
}

const Headline = styled.h1`
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: ${40 / 16}rem;
  overflow-wrap: break-word;
  hyphens: auto;
  /* Prefix for Safari */
  -webkit-hyphens: auto;
`;

const SubHeadline = styled.h2`
  font-size: ${30 / 16}rem;
  margin-bottom: ${40 / 16}rem;
  line-height: 1.4;
`;

const InternalLink = styled(Link)`
  background-color: var(--color-red);
  color: var(--color-white);
  padding: 1px 2px;
`;

const CategoryLink = styled(Link)`
  color: var(--color-red);

  span a {
    color: inherit;
    text-decoration: none;
  }

  span:hover {
    background-color: var(--color-red);
    color: var(--color-white);
  }
`;

const PortableTextStyles = styled.div`
  line-height: 1.625;
  p:not(:last-child) {
    margin-bottom: 1rem;
  }
  /* a[href^='http'] {
    color: rebeccapurple;
  } */
`;

export default function SinglePost(props) {
  const serializers = {
    marks: {
      internalLink: ({ mark, children }) => (
        <InternalLink
          to={`/${mark.reference._type}/${mark.reference.slug.current}`}
        >
          {children}
        </InternalLink>
      ),
      externalLink: ({ children, mark }) => {
        return (
          <>
            <a href={mark.url} target='_blank' rel='noopener noreferrer'>
              {children}{' '}
              <span>
                <FaExternalLinkAlt size={12} />
              </span>
            </a>
          </>
        );
      },
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
              <Img
                {...imageEmbed}
                alt={imageEmbed.altText}
                width={500}
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
      eventEmbed: (props) => {
        return (
          <>
            <article style={{ border: '1px solid', padding: 15 }}>
              <Link to={`/event/${props.node.event.slug.current}`}>
                <h3>{props.node.event.title}</h3>
              </Link>
              <p>{props.node.event.location}</p>
              <p>{props.node.event.date}</p>
              <a
                href={props.node.event.mainEvent.website}
                target='_blank'
                rel='noopener noreferrer'
              >
                {props.node.event.mainEvent.name}
              </a>
            </article>
          </>
        );
      },
      postEmbed: (props) => {
        return (
          <>
            <article
              style={{
                backgroundColor: '#F0F2F5',
                padding: 15,
                borderRadius: 4,
              }}
            >
              <Link to={`/post/${props.node.post.slug.current}`}>
                <h3>{props.node.post.title}</h3>
              </Link>
              <p>{props.node.post.excerpt}</p>
            </article>
          </>
        );
      },
      artistEmbed: ({ node: { artist } }) => {
        return (
          <>
            <article
              style={{
                display: 'flex',
                gap: '2rem',
                border: '1px solid',
                padding: 15,
              }}
            >
              <div style={{ width: 140 }}>
                <img
                  src={urlFor(artist.logo.asset)}
                  alt={`Logo of ${artist.name}`}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <Link to={`/artist/${artist.slug.current}`}>
                  <h3 style={{ margin: 0 }}>{artist.name}</h3>
                </Link>
                {artist.socialLinks.facebook && (
                  <a
                    href={artist.socialLinks.facebook}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FacebookIcon color='var(--color-red)' size={30} />
                  </a>
                )}
                {artist.socialLinks.instagram && (
                  <a
                    href={artist.socialLinks.instagram}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaInstagram color='var(--color-red)' size={30} />
                  </a>
                )}
                {artist.socialLinks.spotify && (
                  <a
                    href={artist.socialLinks.spotify}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaSpotify color='var(--color-red)' size={30} />
                  </a>
                )}
                {artist.socialLinks.youtube && (
                  <a
                    href={artist.socialLinks.youtube}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaYoutube color='var(--color-red)' size={30} />
                  </a>
                )}
                {artist.socialLinks.website && (
                  <a
                    href={artist.socialLinks.website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaGlobe color='var(--color-red)' size={30} />
                  </a>
                )}
              </div>
            </article>
          </>
        );
      },
    },
  };

  return (
    <>
      <ContainerStyles>
        <ContentStyles>
          {props.data.post.featuredImage && (
            <div>
              <img
                src={props.data.post?.featuredImage?.asset?.url}
                alt={props.data.post?.featuredImage?.asset?.altText}
                style={{ width: '100%' }}
              />
            </div>
          )}
          <Headline>
            {props.data.post.title}{' '}
            <CategoryLink
              to={`/category/${props.data.post.category.slug.current}`}
            >
              <span
                style={{
                  fontSize: 15,
                  borderRadius: 4,
                  padding: 4,
                }}
              >
                #{props.data.post.category.name}
              </span>
            </CategoryLink>
          </Headline>

          <SubHeadline>{props.data.post.excerpt}</SubHeadline>

          <PortableTextStyles>
            <PortableText
              blocks={props.data.post._rawBody}
              serializers={serializers}
            />
          </PortableTextStyles>
        </ContentStyles>
      </ContainerStyles>
    </>
  );
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
        image {
          asset {
            url
          }
        }
      }
      excerpt
      _rawBody(resolveReferences: { maxDepth: 4 })
      category {
        _id
        name
        slug {
          current
        }
      }
    }
  }
`;
