import React from 'react';
import { graphql, Link } from 'gatsby';

export default function ArtistsPage({ data }) {
  return (
    <>
      <h1>Artists</h1>
      <hr />
      <ul>
        {data.allSanityArtist.edges.map(({ node }) => (
          <li key={node._id}>
            <Link to={`/artist/${node.slug.current}`}>{node.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export const query = graphql`
  query {
    allSanityArtist {
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
  }
`;
