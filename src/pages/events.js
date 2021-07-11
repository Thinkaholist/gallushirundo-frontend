import React from 'react';
import { graphql, Link } from 'gatsby';

export default function EventsPage({ data }) {
  return (
    <>
      <h1>Events</h1>
      <hr />
      <ul>
        {data.allSanityEvent.edges.map(({ node }) => (
          <li key={node._id}>
            <div>
              <Link to={`/event/${node.slug.current}`}>{node.title}</Link>
              <p>{node.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export const query = graphql`
  query {
    allSanityEvent(sort: { fields: date, order: ASC }) {
      edges {
        node {
          _id
          title
          date
          slug {
            current
          }
        }
      }
    }
  }
`;
