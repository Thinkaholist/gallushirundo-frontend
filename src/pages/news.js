import React from 'react';
import { graphql, Link } from 'gatsby';
import { DateTime } from 'luxon';
import { ContainerStyles } from '../styles/ContainerStyles';

export default function NewsPage({ data }) {
  const news = data.news.nodes;

  return (
    <>
      <ContainerStyles>
        <div style={{ columnCount: 3, columnGap: 18 }}>
          {news.map((post) => (
            <article
              style={{
                breakInside: 'avoid',
                marginBottom: '1rem',
                borderRadius: '28px',
              }}
            >
              <div>
                <img
                  src={post.featuredImage?.image?.asset?.url}
                  style={{
                    width: '100%',
                    display: 'block',
                    marginBottom: '1rem',
                  }}
                />
              </div>
              <p>
                {DateTime.fromISO(post.publishedDate).toFormat(
                  'kkkk.LL.dd - T'
                )}
              </p>
              <h3>{post.title}</h3>
              <Link to={`/post/${post.slug.current}`}>Read more</Link>
            </article>
          ))}
        </div>
        {/* <ul>
          {data.allSanityPost.edges.map(({ node }) => (
            <li key={node._id}>
              <div>
                <Link to={`/post/${node.slug.current}`}>{node.title}</Link>
                <br />
                <br />
                <Link to={`/category/${node.category.slug.current}`}>
                  {node.category.name}
                </Link>
                <p>
                  {DateTime.fromISO(node.publishedDate).toFormat(
                    'kkkk.LL.dd - T'
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul> */}
      </ContainerStyles>
    </>
  );
}

export const query = graphql`
  query ($rightNow: Date!) {
    news: allSanityPost(
      sort: { fields: publishedDate, order: DESC }
      filter: { publishedDate: { lte: $rightNow } }
    ) {
      nodes {
        _id
        title
        publishedDate
        slug {
          current
        }
        category {
          _id
          name
          slug {
            current
          }
        }
        featuredImage {
          image {
            asset {
              url
            }
          }
        }
      }
    }
  }
`;
