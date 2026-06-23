import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'magazine',
  title: 'Monthly Magazine',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Issue Title',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'month',
      type: 'string',
      title: 'Month',
      options: {
        list: [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December',
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'year',
      type: 'number',
      title: 'Year',
      validation: (r) => r.required().min(2020).max(2035),
    }),
    defineField({
      name: 'issueNumber',
      type: 'number',
      title: 'Issue Number',
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      title: 'Cover Image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 3,
    }),
    defineField({
      name: 'topics',
      type: 'array',
      title: 'Key Topics Covered',
      description: 'Add major themes covered in this issue',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'pageCount',
      type: 'number',
      title: 'Number of Pages',
    }),
    defineField({
      name: 'pdfFile',
      type: 'file',
      title: 'PDF File',
      options: { accept: '.pdf' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'isFree',
      type: 'boolean',
      title: 'Free Download',
      description: 'Allow anyone to download without login',
      initialValue: true,
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: 'title', month: 'month', year: 'year', media: 'coverImage' },
    prepare({ title, month, year, media }) {
      return { title, subtitle: month && year ? `${month} ${year}` : 'No date', media };
    },
  },
  orderings: [
    {
      title: 'Newest First',
      name: 'newestFirst',
      by: [{ field: 'year', direction: 'desc' }, { field: 'publishedAt', direction: 'desc' }],
    },
  ],
});
