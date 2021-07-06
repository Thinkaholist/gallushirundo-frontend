import sanityClient from '@sanity/client';
export const client = sanityClient({
  projectId: 'q7xlgfk0',
  dataset: 'production',
  apiVersion: '2021-03-25',
  // useCdn: true,
});
