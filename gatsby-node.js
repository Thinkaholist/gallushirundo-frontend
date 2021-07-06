const path = require('path');

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const artistTemplate = path.resolve(`./src/templates/artist.js`);
  const eventTemplate = path.resolve(`./src/templates/event.js`);
  const postTemplate = path.resolve(`./src/templates/post.js`);
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
      allSanityEvent {
        edges {
          node {
            slug {
              current
            }
          }
        }
      }
      allSanityPost {
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

  console.log('--gatsby-node RES--', res);

  res.data.allSanityArtist.edges.forEach((edge) => {
    createPage({
      component: artistTemplate,
      path: `/artist/${edge.node.slug.current}`,
      context: {
        slug: edge.node.slug.current,
      },
    });
  });

  res.data.allSanityEvent.edges.forEach((edge) => {
    createPage({
      component: eventTemplate,
      path: `/event/${edge.node.slug.current}`,
      context: {
        slug: edge.node.slug.current,
      },
    });
  });

  res.data.allSanityPost.edges.forEach((edge) => {
    createPage({
      component: postTemplate,
      path: `/post/${edge.node.slug.current}`,
      context: {
        slug: edge.node.slug.current,
      },
    });
  });
};
