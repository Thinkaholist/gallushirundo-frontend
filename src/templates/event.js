import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';

export const query = graphql`
  query ($slug: String!) {
    event: sanityEvent(slug: { current: { eq: $slug } }) {
      _id
      title
      slug {
        current
      }
      date
      location
      cover {
        asset {
          url
        }
      }
      mainEvent {
        name
        website
      }
      artists {
        _id
        name
        slug {
          current
        }
        logo {
          asset {
            url
          }
        }
      }
    }
  }
`;

export default function SingleEvent(props) {
  return (
    <>
      <Layout>
        {props.data.event.cover && (
          <div>
            <img
              src={props.data.event.cover.asset.url}
              alt={props.data.event.cover.asset.altText}
              style={{ width: '100%' }}
            />
          </div>
        )}
        <h1>{props.data.event.title}</h1>
        <h3>Related artist(s):</h3>
        <ul>
          {props.data.event.artists.map((artist) => (
            <li key={artist._id}>
              <Link to={`/artist/${artist.slug.current}`}>{artist.name}</Link>
            </li>
          ))}
        </ul>
        <h3>{props.data.event.date}</h3>
        <h3>{props.data.event.location}</h3>
        <h3>
          <a
            href={props.data.event.mainEvent.website}
            target='_blank'
            rel='noopener noreferrer'
          >
            {props.data.event.mainEvent.name}
          </a>
        </h3>
      </Layout>
    </>
  );
}
