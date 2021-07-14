import React from 'react';
import { graphql, Link } from 'gatsby';
import { DateTime } from 'luxon';
import { ContainerStyles } from '../styles/ContainerStyles';

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
      <ContainerStyles>
        <h1>Category: {props.data.category.name}</h1>
        <p>{props.data.category.description}</p>
        <hr />
        <h2>Articles in this category</h2>
        {props.data.posts.edges.map((post) => (
          <article key={post.node._id}>
            <Link to={`/post/${post.node.slug.current}`}>
              <h3>{post.node.title}</h3>
            </Link>
            <p>
              {DateTime.fromISO(post.node.publishedDate).toFormat(
                'kkkk.LL.dd - T'
              )}
            </p>
          </article>
        ))}
      </ContainerStyles>
    </>
  );
}
