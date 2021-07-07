import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';

export default function ArtistsPage({ data }) {
  return (
    <>
      <Layout>
        <h1>Artists</h1>
        <hr />
        <ul>
          {data.allSanityArtist.edges.map(({ node }) => (
            <li>
              <Link to={`/artist/${node.slug.current}`}>{node.name}</Link>
            </li>
          ))}
        </ul>
      </Layout>
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
