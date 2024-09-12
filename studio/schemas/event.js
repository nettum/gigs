export default {
  title: "Event",
  name: "event",
  type: "document",
  fields: [
    {
      title: "Name",
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Start date",
      name: "startDate",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "End date",
      name: "endDate",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
  ],
  orderings: [
    {
      title: "Start date",
      name: "startDateDesc",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
};
