import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'toppers',
  title: 'Toppers',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', title: 'Name', validation: (r) => r.required() }),
    defineField({ name: 'rank', type: 'string', title: 'Rank (e.g. AIR 12)' }),
    defineField({ name: 'year', type: 'number', title: 'Year' }),
    defineField({ name: 'exam', type: 'string', title: 'Exam', options: { list: ['UPSC CSE', 'UPPCS', 'Other'] } }),
    defineField({ name: 'service', type: 'string', title: 'Service (IAS/IPS/IFS)' }),
    defineField({ name: 'optional', type: 'string', title: 'Optional Subject' }),
    defineField({ name: 'image', type: 'image', title: 'Photo', options: { hotspot: true } }),
    defineField({ name: 'message', type: 'text', title: 'Success Message', rows: 2 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'rank', media: 'image' },
  },
});
