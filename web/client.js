import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'n4t6nimq',
  dataset: 'production',
  token: '',
  useCdn: true,
  apiVersion: '2021-08-31'
});

module.exports = client;
