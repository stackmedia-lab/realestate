import { defineField, defineType } from 'sanity';
export default defineType({
  name: 'post', title: 'Blog Post', type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'category', type: 'string', options: { list: ['Buying', 'Selling', 'Renting', 'Market Trends', 'Investment'] } }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'agent' }] }),
    defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] })
  ]
});
