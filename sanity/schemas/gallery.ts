import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'images', type: 'array', title: 'Images', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'category', type: 'string', title: 'Category', options: { list: ['Events', 'Classroom', 'Results', 'Campus'] } }),
    defineField({ name: 'date', type: 'date', title: 'Date' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category' },
  },
});
