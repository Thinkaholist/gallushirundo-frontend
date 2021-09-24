require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const siteUrl = 'https://gallushirundo.hu';

module.exports = {
  siteMetadata: {
    siteUrl,
    title: 'Gallus & Hirundo',
  },
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: 'q7xlgfk0',
        dataset: 'production',
        watchMode: process.env.NODE_ENV === 'development',
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-plugin-global-context',
      options: {
        context: {
          rightNow: new Date().toISOString(),
        },
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT,
      },
    },
    {
      resolve: 'gatsby-plugin-sanity-image',
      options: {
        // Sanity project info (required)
        projectId: 'q7xlgfk0',
        dataset: 'production',
      },
    },
    {
      resolve: `@slixites/gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `IBM Plex Sans\:300,400,400i,500,600,700`,
          `IBM Plex Mono\:300,400,400i,500,600,700`,
        ],
        display: 'swap',
        preconnect: true,
        attributes: {
          rel: 'stylesheet preload prefetch',
          as: 'style',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
          {
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ allSitePage: { nodes: allPages } }) => {
          return allPages;
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          };
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Gallus & Hirundo',
        short_name: 'G&H',
        start_url: '/',
        background_color: '#ededed',
        theme_color: '#EB0008',
        display: 'standalone',
        icon: 'src/images/icon.svg',
      },
    },
    `gatsby-plugin-offline`,
  ],
};
