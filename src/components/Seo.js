import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';

export default function Seo({ children, location, description, title, image }) {
  const { metadata } = useStaticQuery(graphql`
    query {
      metadata: sanitySiteSettings(_id: { eq: "siteSettings" }) {
        title
        description
      }
    }
  `);

  return (
    <>
      <Helmet titleTemplate={`%s • ${metadata.title}`}>
        <html lang='en' />
        <title>{title}</title>
        {/* Fav Icons */}
        <link rel='icon' type='image/png' href='/favicon.png' />
        <link rel='alternate icon' href='/favicon.ico' />
        {/* Meta Tags */}
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta charSet='utf-8' />
        <meta name='description' content={metadata.description} />
        {/* <link rel='canonical' href={metadata.siteUrl} /> */}
        {/* Open Graph */}
        {location && <meta property='og:url' content={location.href} />}
        {/* <meta property='og:image' content={image || '/FMZ_logo.svg'} /> */}
        <meta property='og:title' content={title} key='ogtitle' />
        <meta
          propery='og:site_name'
          content={metadata.title}
          key='ogsitename'
        />
        <meta property='og:description' content={description} key='ogdesc' />
        {/* <meta
          name='google-site-verification'
          content=''
        /> */}
        {children}
      </Helmet>
    </>
  );
}
