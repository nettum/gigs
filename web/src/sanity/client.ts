import { createClient } from '@sanity/client';

export default createClient({
  projectId: 'n4t6nimq',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-10',
});
