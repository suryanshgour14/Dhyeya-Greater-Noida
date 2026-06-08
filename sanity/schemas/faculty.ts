import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'faculty',
  title: 'Faculty',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name', validation: (r) => r.required() }),
    defineField({ name: 'designation', type: 'string', title: 'Designation' }),
    defineField({ name: 'specialization', type: 'string', title: 'Specialization' }),
    defineField({ name: 'experience', type: 'string', title: 'Experience' }),
    defineField({ name: 'bio', type: 'text', title: 'Bio', rows: 3 }),
    defineField({ name: 'image', type: 'image', title: 'Photo', options: { hotspot: true } }),
    defineField({ name: 'category', type: 'string', title: 'Category', options: { list: ['gs', 'optional', 'csat'] } }),
    defineField({ name: 'order', type: 'number', title: 'Display Order' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'designation', media: 'image' },
  },
});
