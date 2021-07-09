import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';

export const query = graphql`
  query ($slug: String!, $rightNow: Date!) {
    category: sanityCategory(slug: { current: { eq: $slug } }) {
      name
      description
    }
    posts: allSanityPost(
      filter: {
        category: { slug: { current: { eq: $slug } } }
        publishedDate: { lte: $rightNow }
      }
      sort: { fields: publishedDate, order: DESC }
    ) {
      edges {
        node {
          _id
          title
          slug {
            current
          }
          publishedDate
        }
      }
    }
  }
`;

export default function SingleCategory(props) {
  return (
    <>
      <Layout>
        <h1>{props.data.category.name}</h1>
        <p>{props.data.category.description}</p>
        <hr />
        {props.data.posts.edges.map((post) => (
          <article key={post.node._id}>
            <Link to={`/post/${post.node.slug.current}`}>
              <h3>{post.node.title}</h3>
            </Link>
            <p>{post.node.publishedDate}</p>
          </article>
        ))}
      </Layout>
    </>
  );
}
