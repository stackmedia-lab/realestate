import { defineField, defineType } from 'sanity';
export default defineType({
  name: 'property', title: 'Property', type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'price', type: 'number', validation: r => r.required() }),
    defineField({ name: 'status', type: 'string', options: { list: ['for-sale', 'for-rent', 'sold', 'pending'] }, initialValue: 'for-sale' }),
    defineField({ name: 'propertyType', type: 'string', options: { list: ['house', 'condo', 'townhouse', 'apartment', 'land'] } }),
    defineField({ name: 'beds', type: 'number' }),
    defineField({ name: 'baths', type: 'number' }),
    defineField({ name: 'sqft', type: 'number' }),
    defineField({ name: 'lotSize', type: 'string' }),
    defineField({ name: 'yearBuilt', type: 'number' }),
    defineField({ name: 'address', type: 'string' }),
    defineField({ name: 'city', type: 'string' }),
    defineField({ name: 'state', type: 'string' }),
    defineField({ name: 'zip', type: 'string' }),
    defineField({ name: 'lat', type: 'number' }),
    defineField({ name: 'lng', type: 'number' }),
    defineField({ name: 'description', type: 'text', rows: 6 }),
    defineField({ name: 'features', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'mainImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'agent', type: 'reference', to: [{ type: 'agent' }] }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false })
  ]
});
