import { defineField, defineType } from 'sanity';
export default defineType({
  name: 'city', title: 'City', type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'state', type: 'string' }),
    defineField({ name: 'image', type: 'image' }),
    defineField({ name: 'medianPrice', type: 'number' }),
    defineField({ name: 'listingsCount', type: 'number' })
  ]
});
