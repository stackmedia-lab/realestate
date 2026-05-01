import { defineField, defineType } from 'sanity';
export default defineType({
  name: 'agent', title: 'Agent', type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'bio', type: 'text' }),
    defineField({ name: 'photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'license', type: 'string' }),
    defineField({ name: 'specialties', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'yearsExperience', type: 'number' })
  ]
});
