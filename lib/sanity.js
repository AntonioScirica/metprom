import { createClient } from 'next-sanity';
import { defineLive } from 'next-sanity/live';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_TOKEN,
  browserToken: false,
});

export function urlFor(source) {
  if (!source?.asset?._ref) return null;
  const ref = source.asset._ref;
  const [, id, dims, format] = ref.match(/^image-([a-f0-9]+)-(\d+x\d+)-(\w+)$/) || [];
  if (!id) return null;
  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}/${id}-${dims}.${format}`;
}

export function fileUrlFor(source) {
  if (!source?.asset?._ref) return null;
  const ref = source.asset._ref;
  const [, id, format] = ref.match(/^file-([a-f0-9]+)-(\w+)$/) || [];
  if (!id) return null;
  return `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}/${id}.${format}`;
}
