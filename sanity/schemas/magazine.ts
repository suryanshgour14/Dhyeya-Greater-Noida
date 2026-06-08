import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'magazine',
  title: 'Magazine',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'month', type: 'string', title: 'Month' }),
    defineField({ name: 'year', type: 'number', title: 'Year' }),
    defineField({ name: 'coverImage', type: 'image', title: 'Cover Image', options: { hotspot: true } }),
    defineField({ name: 'pdfFile', type: 'file', title: 'PDF File' }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At', initialValue: () => new Date().toISOString() }),
  ],
  preview: {
    select: { title: 'title', media: 'coverImage' },
  },
});
