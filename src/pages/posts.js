import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';

export default function NewsPage({ data }) {
  return (
    <>
      <Layout>
        <h1>News</h1>
        <hr />
        <ul>
          {data.allSanityPost.edges.map(({ node }) => (
            <li>
              <div>
                <Link to={`/post/${node.slug.current}`}>{node.title}</Link>
              </div>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
}

export const query = graphql`
  query {
    allSanityPost {
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
