import React from 'react';
import { graphql, Link } from 'gatsby';
import { DateTime } from 'luxon';
import { ContainerStyles } from '../styles/ContainerStyles';
import styled from 'styled-components';
import Masonry from 'react-masonry-component';

const Wrapper = styled.div`
  --gap: 18px;
  column-count: 3;
  column-gap: var(--gap);
`;

const TestArticle = styled.article`
  border: 1px solid;
  margin-bottom: var(--gap);
  padding: var(--gap);
`;

export default function NewsPage({ data }) {
  const news = data.news.nodes;

  const articles = [
    <TestArticle>6clscdlmcédlsmcdlsécmldésmclédsmc</TestArticle>,
    <TestArticle>5</TestArticle>,
    <TestArticle>4cdscdscds</TestArticle>,
    <TestArticle>3cdsc</TestArticle>,
    <TestArticle>2scdscdscdscdscdscds</TestArticle>,
    <TestArticle>1</TestArticle>,
  ];

  return (
    <>
      <ContainerStyles>
        <h2>Normal Column Layout</h2>
        <Wrapper>{articles.map((article) => article)}</Wrapper>
        <hr />
        <h2>React Masonry Component Layout</h2>
        <Masonry>{articles}</Masonry>
        <hr />
        <div style={{ columnCount: 3, columnGap: 18 }}>
          {news.map((post) => (
            <article
              key={post._id}
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
        <hr />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18 }}>
          {news.map((post) => (
            <article
              key={post._id}
              style={{
                flex: 1,
                minWidth: 250,
              }}
            >
              <div
                style={{
                  height: 200,
                  borderRadius: 28,
                  background: `url(${post?.featuredImage?.image?.asset?.url})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              <p style={{ marginTop: '0.5rem' }}>
                <span>
                  {DateTime.fromISO(post.publishedDate).toFormat('kkkk.LL.dd')}
                </span>
                {' // '}
                <span
                  style={{
                    backgroundColor: 'var(--color-red)',
                    padding: '3px 5px ',
                    borderRadius: 12,
                    color: 'var(--color-white)',
                  }}
                >
                  <Link to={`/category/${post.category.slug.current}`}>
                    #{post.category.name}
                  </Link>
                </span>
              </p>
              <h3 style={{ marginTop: '1rem' }}>
                <Link to={`/post/${post.slug.current}`}>{post.title}</Link>
              </h3>
            </article>
          ))}
        </div>
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
