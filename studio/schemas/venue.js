export default {
  title: 'Venue',
  name: 'venue',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    },
    {
      title: 'Festival venue?',
      name: 'festivalVenue',
      type: 'boolean',
      description: 'Festival venues will not show up in the venue filter',
    },
  ],
}
