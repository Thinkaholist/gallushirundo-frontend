module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "gallushirundo-frontend",
  },
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "q7xlgfk0",
        dataset: "production",
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};
