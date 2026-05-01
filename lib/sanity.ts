import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const sanityEnabled = Boolean(projectId);

export const sanityClient = sanityEnabled
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

const builder = sanityEnabled ? imageUrlBuilder({ projectId, dataset }) : null;
export const urlFor = (src: any) => (builder ? builder.image(src) : { url: () => '' });
