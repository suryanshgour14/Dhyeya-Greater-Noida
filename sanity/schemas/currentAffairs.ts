import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'currentAffairs',
  title: 'Current Affairs',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title (English)',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'titleHi', type: 'string', title: 'Title (Hindi) — optional' }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      title: 'Cover Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Category',
      validation: (r) => r.required(),
      options: {
        list: [
          { title: 'Economy', value: 'Economy' },
          { title: 'Polity & Governance', value: 'Polity' },
          { title: 'Science & Technology', value: 'Science' },
          { title: 'Environment', value: 'Environment' },
          { title: 'International Relations', value: 'International' },
          { title: 'History & Culture', value: 'History' },
          { title: 'Geography', value: 'Geography' },
          { title: 'Social Issues', value: 'Social' },
          { title: 'Security & Defence', value: 'Security' },
        ],
      },
    }),
    defineField({
      name: 'gsRelevance',
      type: 'array',
      title: 'GS Paper Relevance',
      description: 'Which GS papers is this relevant for?',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'GS Paper 1', value: 'GS1' },
          { title: 'GS Paper 2', value: 'GS2' },
          { title: 'GS Paper 3', value: 'GS3' },
          { title: 'GS Paper 4', value: 'GS4' },
          { title: 'Prelims', value: 'Prelims' },
          { title: 'Essay', value: 'Essay' },
        ],
        layout: 'tags',
      },
    }),
    defineField({
      name: 'isImportant',
      type: 'boolean',
      title: 'Mark as Important',
      description: 'Highlights this article with a special badge',
      initialValue: false,
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      title: 'Excerpt / Summary (English)',
      rows: 3,
      validation: (r) => r.required().max(300),
    }),
    defineField({
      name: 'excerptHi',
      type: 'text',
      title: 'Excerpt / Summary (Hindi) — optional',
      rows: 3,
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Full Article (English)',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Caption' },
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'bodyHi',
      type: 'array',
      title: 'Full Article (Hindi) — optional',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      initialValue: () => new Date().toISOString(),
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'mainImage' },
  },
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});
