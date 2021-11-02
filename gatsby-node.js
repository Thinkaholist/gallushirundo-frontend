const path = require('path');

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  const artistTemplate = path.resolve(`./src/templates/artist.js`);
  const eventTemplate = path.resolve(`./src/templates/event.js`);
  const postTemplate = path.resolve(`./src/templates/post.js`);
  const categoryTemplate = path.resolve(`./src/templates/category.js`);
  const res = await graphql(`
    query {
      allSanityArtist(sort: { fields: name, order: ASC }) {
        nodes {
          slug {
            current
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
      allSanityCategory {
        nodes {
          name
          description
          slug {
            current
          }
        }
      }
      allSanityRedirect {
        nodes {
          name
          fromPath
          toPath
          permanent
        }
      }
    }
  `);

  const artists = res.data.allSanityArtist.nodes;
  const events = res.data.allSanityEvent.edges;
  const posts = res.data.allSanityPost.edges;
  const categories = res.data.allSanityCategory.nodes;
  const redirects = res.data.allSanityRedirect.nodes;

  artists.forEach((artist, index) => {
    const previousSlug = index === 0 ? null : artists[index - 1].slug.current;
    const nextSlug =
      index === artists.length - 1 ? null : artists[index + 1].slug.current;

    createPage({
      component: artistTemplate,
      path: `/artist/${artist.slug.current}`,
      context: {
        slug: artist.slug.current,
        previousSlug,
        nextSlug,
      },
    });
  });

  events.forEach((edge) => {
    createPage({
      component: eventTemplate,
      path: `/event/${edge.node.slug.current}`,
      context: {
        slug: edge.node.slug.current,
      },
    });
  });

  posts.forEach((edge) => {
    createPage({
      component: postTemplate,
      path: `/post/${edge.node.slug.current}`,
      context: {
        slug: edge.node.slug.current,
      },
    });
  });

  categories.forEach((cat) => {
    createPage({
      component: categoryTemplate,
      path: `/category/${cat.slug.current}`,
      context: {
        slug: cat.slug.current,
      },
    });
  });

  redirects.forEach(({ fromPath, toPath, isPermanent }) => {
    createRedirect({
      fromPath,
      toPath,
      isPermanent,
    });
  });
};
