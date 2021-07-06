import React from 'react';
import { graphql } from 'gatsby';

export default function HomePage({ data }) {
  return (
    <>
      <h1>{data.siteSettings.title}</h1>
      <p>{data.siteSettings.description}</p>
      <hr />
    </>
  );
}

export const query = graphql`
  query {
    siteSettings: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      _id
      title
      description
    }
  }
`;
