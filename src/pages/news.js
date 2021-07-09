import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import { DateTime } from 'luxon';

export default function NewsPage({ data }) {
  return (
    <>
      <Layout>
        <h1>News</h1>
        <hr />
        <ul>
          {data.allSanityPost.edges.map(({ node }) => (
            <li key={node._id}>
              <div>
                <Link to={`/post/${node.slug.current}`}>{node.title}</Link>
                <br />
                <br />
                <Link to={`/category/${node.category.slug.current}`}>
                  {node.category.name}
                </Link>
                <p>
                  {DateTime.fromISO(node.publishedDate).toFormat(
                    'kkkk.LL.dd - T'
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Layout>
    </>
  );
}

export const query = graphql`
  query ($rightNow: Date!) {
    allSanityPost(
      sort: { fields: publishedDate, order: DESC }
      filter: { publishedDate: { lte: $rightNow } }
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
