import { createImageUrlBuilder } from "@sanity/image-url";

import { sanityClient } from "@/lib/sanity";

const builder = createImageUrlBuilder(sanityClient);

export type SanityImageSource = Parameters<typeof builder.image>[0];

type SanityImageOptions = {
  width?: number;
  height?: number;
  quality?: number;
};

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function getSanityImageUrl(
  source: SanityImageSource | null | undefined,
  options: SanityImageOptions = {},
) {
  if (!source) {
    return null;
  }

  const { width, height, quality = 82 } = options;
  let image = urlFor(source).auto("format").quality(quality);

  if (width) {
    image = image.width(width);
  }

  if (height) {
    image = image.height(height).fit("crop");
  }

  return image.url();
}
