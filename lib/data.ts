import { sanityClient, sanityEnabled } from './sanity';
import { properties as mockProps, agents as mockAgents, posts as mockPosts } from './mock-data';
import type { Property, Agent, Post } from './types';

const PROP_PROJ = `{
  _id, "slug": slug.current, title, price, status, propertyType, beds, baths, sqft,
  lotSize, yearBuilt, address, city, state, zip, description, features,
  "mainImage": mainImage.asset->url,
  "gallery": gallery[].asset->url,
  "agentId": agent._ref, featured
}`;

export async function getProperties(): Promise<Property[]> {
  if (!sanityEnabled || !sanityClient) return mockProps;
  try {
    const res = await sanityClient.fetch(`*[_type == "property"] | order(_createdAt desc) ${PROP_PROJ}`);
    return res?.length ? res : mockProps;
  } catch { return mockProps; }
}

export async function getProperty(slug: string): Promise<Property | undefined> {
  if (!sanityEnabled || !sanityClient) return mockProps.find(p => p.slug === slug);
  try {
    const res = await sanityClient.fetch(`*[_type=="property" && slug.current==$slug][0] ${PROP_PROJ}`, { slug });
    return res || mockProps.find(p => p.slug === slug);
  } catch { return mockProps.find(p => p.slug === slug); }
}

export async function getAgents(): Promise<Agent[]> {
  if (!sanityEnabled || !sanityClient) return mockAgents;
  try {
    const res = await sanityClient.fetch(`*[_type=="agent"]{ _id, "slug":slug.current, name, title, phone, email, bio, "photo":photo.asset->url, license, specialties, yearsExperience }`);
    return res?.length ? res : mockAgents;
  } catch { return mockAgents; }
}

export async function getAgent(slug: string): Promise<Agent | undefined> {
  const all = await getAgents();
  return all.find(a => a.slug === slug);
}

export async function getPosts(): Promise<Post[]> {
  if (!sanityEnabled || !sanityClient) return mockPosts;
  try {
    const res = await sanityClient.fetch(`*[_type=="post"] | order(publishedAt desc){ _id, "slug":slug.current, title, excerpt, category, "coverImage":coverImage.asset->url, publishedAt, "authorName": author->name, body }`);
    return res?.length ? res : mockPosts;
  } catch { return mockPosts; }
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const all = await getPosts();
  return all.find(p => p.slug === slug);
}
