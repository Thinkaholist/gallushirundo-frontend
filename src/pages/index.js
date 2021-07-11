import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';
import { DateTime } from 'luxon';

export default function HomePage({ data }) {
  return (
    <>
      <h1>{data.siteSettings.title}</h1>
      <ul>
        <li>
          <Link to='/artists'>Artists</Link>
        </li>
        <li>
          <Link to='/news'>News</Link>
        </li>
        <li>
          <Link to='/events'>Events</Link>
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
        </li>
      </ul>
      <p>{data.siteSettings.description}</p>

      <hr />
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
