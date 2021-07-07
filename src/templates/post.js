import React from 'react';
import { graphql, Link } from 'gatsby';
import usePromise from 'react-use-promise';
import { client } from '../client';
import PortableText from '@sanity/block-content-to-react';
import Layout from '../components/Layout';
import { Editorial } from './artist';

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
  const slug = props.data.post.slug.current;

  const query = `*[slug.current == $slug][0]{
    ...,
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          ...,
          "doc": {
            "slug": @.reference->slug,
            "type": @.reference->_type,
          },
        }
      }
    }
  }`;

  const serializers = {
    marks: {
      internalLink: ({ children, mark }) => (
        <Link to={`/${mark?.doc?.type}/${mark?.doc?.slug?.current}`}>
          {children}
        </Link>
      ),
    },
  };

  const [result, error, state] = usePromise(
    () => client.fetch(query, { slug }),
    []
  );

  if (error) {
    return console.error(state);
  }

  if (state !== 'resolved') {
    return (
      <>
        <Layout>
          <h3>Loading...</h3>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Layout>
        <Editorial>
          <code>Title</code>
        </Editorial>
        <h1>{props.data.post.title}</h1>
        <Editorial>
          <code>Excerpt</code>
        </Editorial>
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
        <Editorial>
          <code>Body</code>
        </Editorial>
        <PortableText blocks={result.body} serializers={serializers} />
      </Layout>
    </>
  );
}
