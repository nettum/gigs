export default {
  title: 'Gig',
  name: 'gig',
  type: 'document',
  fields: [
    {
      title: 'Artist / Band',
      name: 'artist',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: doc => `${doc.artist}-${doc.concertDate.slice(0, 10)}`,
      },
    },
    {
      title: 'Concert date',
      name: 'concertDate',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      title: 'Concert image',
      name: 'concertImage',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      title: 'Venue',
      name: 'venue',
      type: 'reference',
      to: [{type: 'venue'}],
    },
  ],
}
