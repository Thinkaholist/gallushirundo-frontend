import React from 'react';
import Layout from './src/components/Layout';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export const onInitialClientRender = async () => {
  if (typeof IntersectionObserver === 'undefined') {
    await import('intersection-observer');
  }
};
