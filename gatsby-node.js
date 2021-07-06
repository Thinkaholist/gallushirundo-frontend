const path = require('path');

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const artistTemplate = path.resolve(`./src/templates/artist.js`);
  const res = await graphql(`
    query {
      allSanityArtist {
        edges {
          node {
            slug {
              current
            }
          }
        }
      }
    }
  `);

  console.log(res);

  res.data.allSanityArtist.edges.forEach((edge) => {
    createPage({
      component: artistTemplate,
      path: `/artist/${edge.node.slug.current}`,
      context: {
        slug: edge.node.slug.current,
      },
    });
  });
};
