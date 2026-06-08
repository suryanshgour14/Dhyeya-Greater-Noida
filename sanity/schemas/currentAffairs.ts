import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'currentAffairs',
  title: 'Current Affairs',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: (r) => r.required() }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'excerpt', type: 'text', title: 'Excerpt', rows: 3 }),
    defineField({ name: 'body', type: 'array', title: 'Body', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'category', type: 'string', title: 'Category', options: { list: ['Economy', 'Polity', 'Science', 'Environment', 'International', 'History', 'Geography'] } }),
    defineField({ name: 'mainImage', type: 'image', title: 'Main Image', options: { hotspot: true } }),
    defineField({ name: 'publishedAt', type: 'datetime', title: 'Published At', initialValue: () => new Date().toISOString() }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'mainImage' },
  },
});
