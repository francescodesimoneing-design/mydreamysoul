import groq from "groq";
import { createClient } from "next-sanity";

export { groq };

export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";
export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mydreamysoul";

export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET,
);

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
  perspective: "published",
});

type SanityFetchOptions = {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  revalidate?: number;
};

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: SanityFetchOptions): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    return await sanityClient.fetch<T>(query, params, {
      next: {
        revalidate,
        tags,
      },
    });
  } catch (error) {
    console.warn("Sanity fetch failed, using neutral fallback.", error);
    return null;
  }
}
