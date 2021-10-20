import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'n4t6nimq',
  dataset: 'production',
  token: '',
  useCdn: true
});

module.exports = client;
