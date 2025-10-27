export default {
  title: "Gig",
  name: "gig",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: (doc) => `${doc.title}-${doc.concertDate.slice(0, 10)}`,
      },
    },
    {
      title: "Concert date",
      name: "concertDate",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Concert image",
      name: "concertImage",
      type: "image",
      options: {
        hotspot: true,
      },
      // thefuck https://www.sanity.io/docs/studio/image-type#a0a42b42f37b
      // options: {
      //   hotspot: {
      //     previews: [
      //       { title: 'Mobile 9:16', aspectRatio: 9 / 16 }, 
      //       { title: 'Desktop 16:9', aspectRatio: 16 / 9 },
      //     ],
      //   },
      // },
    },
    {
      title: "Artist",
      name: "artist",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "artist" }],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Venue",
      name: "venue",
      type: "reference",
      to: [{ type: "venue" }],
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Event",
      name: "event",
      type: "reference",
      to: [{ type: "event" }],
    },
  ],
  orderings: [
    {
      title: "Concert date",
      name: "concertDateDesc",
      by: [{ field: "concertDate", direction: "desc" }],
    },
  ],
};
