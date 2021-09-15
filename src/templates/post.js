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
import Seo from '../components/Seo';
import { QUERIES } from '../constants';
import Flip from 'react-reveal/Flip';

function urlFor(source) {
  return urlBuilder({
    projectId: 'q7xlgfk0',
    dataset: 'production',
  }).image(source);
}

const Headline = styled.h1`
  font-weight: 400;
  line-height: 1.2;
  /* overflow-wrap: break-word; */
  /* hyphens: auto; */
  /* Prefix for Safari */
  /* -webkit-hyphens: auto; */
  margin-bottom: 0.5rem;

  @media ${QUERIES.mobileAndDown} {
    font-weight: 500;
    font-size: ${30 / 16}rem;
    margin-bottom: ${32 / 16}rem;
  }
`;

const SubHeadline = styled.h2`
  font-size: ${30 / 16}rem;
  margin-bottom: ${40 / 16}rem;
  line-height: 1.4;

  @media ${QUERIES.mobileAndDown} {
    font-size: ${24 / 16}rem;
    margin-bottom: ${32 / 16}rem;
  }
`;

const InternalLink = styled(Link)`
  color: var(--color-black);
  padding: 0 2px;
  border-bottom: 2px solid;
  border-color: hsl(var(--color-red) / 80%);
  background-color: hsl(var(--color-red) / 10%);
  transition: background-color 0.1s ease-in-out;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: hsl(var(--color-red) / 70%);
      border-color: hsl(var(--color-red));
      color: var(--color-white);
    }
  }
`;

const ExternalLink = styled.a`
  color: hsl(var(--color-red));

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CategoryLink = styled(Link)`
  color: hsl(var(--color-red));
  margin-top: -4px;

  span a {
    color: inherit;
    text-decoration: none;
  }

  @media (hover: hover) and (pointer: fine) {
    span:hover {
      background-color: hsl(var(--color-red));
      color: var(--color-white);
    }
  }

  @media ${QUERIES.mobileAndDown} {
    span {
      font-weight: 500;
      text-decoration: underline;
      background-color: hsl(var(--color-red));
      color: var(--color-white);
    }
  }
`;

const PortableTextStyles = styled.div`
  line-height: 1.5;
  margin: 2rem 0;

  h3,
  h4 {
    font-weight: 700;
  }

  h3 {
    font-size: ${26 / 16}rem;
  }

  h4 {
    font-size: ${22 / 16}rem;
  }

  p:not(:last-of-type) {
    margin-bottom: 1rem;
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }

  code {
    font-family: 'Courier New', Courier, monospace;
  }

  ul,
  ol {
    list-style-type: revert;
    padding-left: revert;

    & li::marker {
      color: hsl(var(--color-red));
    }
  }

  blockquote {
    background: linear-gradient(to right, #fff, var(--color-background) 99%);
    border-left: 10px solid hsl(var(--color-red));
    margin: 1.5em 0;
    padding: 0.5em 10px;
    font-style: italic;
    border-radius: 6px;

    p {
      display: inline;
    }
  }
`;

const EmbedImageWrapper = styled.div`
  margin: 1rem 0;
`;

const EmbedImage = styled(Img)`
  display: block;
  width: 100%;
  border-radius: 28px;
`;

const CaptionWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 4px;
`;

const Caption = styled.small`
  color: darkgray;
  font-size: 16px;
`;

const RelatedArtistsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const RelatedArtistLink = styled(Link)`
  --inner-radius: 12px;
  --padding: 8px;
  color: inherit;
  font-weight: 500;
  border: 2px solid hsl(var(--color-red));
  display: flex;
  width: fit-content;
  align-items: center;
  gap: 8px;
  padding: var(--padding);
  border-radius: calc(var(--inner-radius) + var(--padding));
  background-color: var(--color-white);
  min-width: 220px;
`;

const ArtistThumbail = styled(Img)`
  display: block;
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: var(--inner-radius);
`;

const RelatedArtistName = styled.h3``;

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
            <ExternalLink
              href={mark.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              {children}{' '}
              <span>
                <FaExternalLinkAlt size={12} />
              </span>
            </ExternalLink>
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
        console.log({ imageEmbed });
        return (
          <>
            <EmbedImageWrapper>
              <EmbedImage {...imageEmbed.image} alt={imageEmbed.altText} />
              {imageEmbed.caption && (
                <CaptionWrapper>
                  <Caption>{imageEmbed.caption}</Caption>
                </CaptionWrapper>
              )}
            </EmbedImageWrapper>
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
                    <FacebookIcon color='hsl(var(--color-red))' size={30} />
                  </a>
                )}
                {artist.socialLinks.instagram && (
                  <a
                    href={artist.socialLinks.instagram}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaInstagram color='hsl(var(--color-red))' size={30} />
                  </a>
                )}
                {artist.socialLinks.spotify && (
                  <a
                    href={artist.socialLinks.spotify}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaSpotify color='hsl(var(--color-red))' size={30} />
                  </a>
                )}
                {artist.socialLinks.youtube && (
                  <a
                    href={artist.socialLinks.youtube}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaYoutube color='hsl(var(--color-red))' size={30} />
                  </a>
                )}
                {artist.socialLinks.website && (
                  <a
                    href={artist.socialLinks.website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FaGlobe color='hsl(var(--color-red))' size={30} />
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
      <Seo
        title={props.data.post.title}
        image={props.data.post.featuredImage.image.asset.url}
      />
      <ContainerStyles>
        <ContentStyles>
          {props.data.post?.featuredImage && (
            <div>
              <img
                src={props.data.post?.featuredImage?.asset?.url}
                alt={props.data.post?.featuredImage?.asset?.altText}
                style={{ width: '100%' }}
              />
            </div>
          )}
          <Headline>{props.data.post.title} </Headline>
          <div
            style={{
              // border: '1px solid rebeccapurple',
              marginBottom: '2.5rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center',
            }}
          >
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

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                borderLeft: '1px groove',
                paddingLeft: '1rem',
              }}
            >
              {props.data.post?.artists.map((artist) => (
                <Flip left delay={250} key={artist._id}>
                  <Link
                    to={`/artist/${artist.slug.current}`}
                    title={artist.name}
                  >
                    <Img
                      {...artist.featuredImage.image}
                      alt={artist.featuredImage.altText}
                      style={{
                        display: 'block',
                        width: 35,
                        height: 35,
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  </Link>
                </Flip>
              ))}
            </div>
          </div>

          <SubHeadline>{props.data.post.excerpt}</SubHeadline>

          <PortableTextStyles>
            <PortableText
              blocks={props.data.post._rawBody}
              serializers={serializers}
            />
          </PortableTextStyles>
          {/* <RelatedArtistsWrapper>
            {props.data.post?.artists.map((artist) => (
              <RelatedArtistLink
                to={`/artist/${artist.slug.current}`}
                key={artist._id}
              >
                <ArtistThumbail
                  {...artist.featuredImage.image}
                  alt={artist.featuredImage.altText}
                />
                <RelatedArtistName key={artist._id}>
                  {artist.name}
                </RelatedArtistName>
              </RelatedArtistLink>
            ))}
          </RelatedArtistsWrapper> */}
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
      artists {
        _id
        name
        slug {
          current
        }
        logo {
          ...ImageWithPreview
        }
        featuredImage {
          image {
            ...ImageWithPreview
          }
        }
      }
    }
  }
`;
