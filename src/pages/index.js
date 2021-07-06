import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export default function HomePage({ data }) {
  console.log(data);
  return (
    <>
      <Container>
        <h1>{data.siteSettings.title}</h1>
        <p>{data.siteSettings.description}</p>

        <hr />
        <h2>Artists</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {data.artists.edges.map((artist) => (
            <Link to={`/artist/${artist.node.slug.current}`}>
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
  }
`;
