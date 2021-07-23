import React from 'react';
import { graphql, Link } from 'gatsby';
import { DateTime } from 'luxon';
import { ContainerStyles } from '../styles/ContainerStyles';
import styled from 'styled-components';

const HeroImage = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url('https://static.euronews.com/articles/stories/05/42/38/88/1440x810_cmsv2_6e94f611-cc4a-59b4-a57e-d7b9fe7336c8-5423888.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  margin-top: -10rem;
`;

export default function HomePage({ data }) {
  return (
    <>
      <HeroImage>Hero Image</HeroImage>
      <ContainerStyles>
        <h2>Artists</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {data.artists.edges.map((artist) => (
            <Link
              key={artist.node._id}
              to={`/artist/${artist.node.slug.current}`}
            >
              {artist.node.name}
            </Link>
          ))}
        </div>
        <hr />
        <h2>Events</h2>
        <ul>
          {data.events.edges.map((ev) => (
            <li key={ev.node._id}>
              <Link to={`/event/${ev.node.slug.current}`}>{ev.node.title}</Link>
            </li>
          ))}
        </ul>
        <hr />
        <h2>Latest 4 News</h2>
        <ul>
          {data.posts.edges.map((post) => (
            <li key={post.node._id}>
              <Link to={`/post/${post.node.slug.current}`}>
                {post.node.title}
              </Link>
              <br />
              <br />
              <Link to={`/category/${post.node.category.slug.current}`}>
                {post.node.category.name}
              </Link>
              <p>
                {DateTime.fromISO(post.node.publishedDate).toFormat(
                  'kkkk.LL.dd - T'
                )}
              </p>
            </li>
          ))}
        </ul>
      </ContainerStyles>
    </>
  );
}

export const query = graphql`
  query ($rightNow: Date!) {
    siteSettings: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      _id
      title
      description
    }
    artists: allSanityArtist {
      edges {
        node {
          _id
          name
          slug {
            current
          }
        }
      }
    }
    events: allSanityEvent {
      edges {
        node {
          _id
          title
          slug {
            current
          }
        }
      }
    }
    posts: allSanityPost(
      sort: { fields: publishedDate, order: DESC }
      filter: { publishedDate: { lte: $rightNow } }
      limit: 4
    ) {
      edges {
        node {
          _id
          title
          publishedDate
          slug {
            current
          }
          category {
            _id
            name
            slug {
              current
            }
          }
        }
      }
    }
  }
`;
