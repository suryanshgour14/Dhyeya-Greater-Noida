import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'batches',
  title: 'Batches',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Batch Title', validation: (r) => r.required() }),
    defineField({ name: 'course', type: 'reference', title: 'Course', to: [{ type: 'course' }] }),
    defineField({ name: 'startDate', type: 'date', title: 'Start Date' }),
    defineField({ name: 'medium', type: 'string', title: 'Medium', options: { list: ['hindi', 'english', 'bilingual'] } }),
    defineField({ name: 'seats', type: 'number', title: 'Total Seats' }),
    defineField({ name: 'seatsLeft', type: 'number', title: 'Seats Left' }),
    defineField({ name: 'fee', type: 'number', title: 'Fee (₹)' }),
    defineField({ name: 'isActive', type: 'boolean', title: 'Is Active', initialValue: true }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'startDate' },
  },
});
