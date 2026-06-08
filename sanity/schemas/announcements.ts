import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'announcements',
  title: 'Announcements',
  type: 'document',
  fields: [
    defineField({ name: 'text', type: 'string', title: 'Announcement Text', validation: (r) => r.required() }),
    defineField({ name: 'link', type: 'url', title: 'Link (optional)' }),
    defineField({ name: 'isActive', type: 'boolean', title: 'Is Active', initialValue: true }),
    defineField({ name: 'priority', type: 'number', title: 'Priority', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'text', subtitle: 'isActive' },
  },
});
