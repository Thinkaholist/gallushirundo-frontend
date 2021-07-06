import React from 'react';
import { graphql, Link } from 'gatsby';

export const query = graphql`
  query ($slug: String!) {
    post: sanityPost(slug: { current: { eq: $slug } }) {
      _id
      title
      slug {
        current
      }
      featuredImage {
        asset {
          url
        }
      }
      excerpt
    }
  }
`;

export default function SinglePost(props) {
  return (
    <>
      <h1>{props.data.post.title}</h1>
      <p>{props.data.post.excerpt}</p>
      {/* {props.data.post.featuredImage && (
        <div>
          <img
            src={props.data.post.featuredImage.asset.url}
            alt={props.data.post.featuredImage.asset.altText}
            style={{ width: '100%' }}
          />
        </div>
      )} */}
      <hr />
      <pre>{JSON.stringify(props.data.post, null, 4)}</pre>
    </>
  );
}
