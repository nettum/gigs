export default {
  title: 'Gig',
  name: 'gig',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: doc => `${doc.title}-${doc.concertDate.slice(0, 10)}`,
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
      title: 'Artist',
      name: 'artist',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{type: 'artist'}]
      }],
    },
    {
      title: 'Venue',
      name: 'venue',
      type: 'reference',
      to: [{type: 'venue'}],
    },
    {
      title: 'Event',
      name: 'event',
      type: 'reference',
      to: [{type: 'event'}],
    },
  ],
  orderings: [
    {
      title: 'Concert date',
      name: 'concertDateDesc',
      by: [{field: 'concertDate', direction: 'desc'}],
    },
  ]
}
