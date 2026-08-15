import { cache } from "react";

import { getSanityImageUrl, type SanityImageSource } from "@/lib/image";
import { groq, sanityFetch } from "@/lib/sanity";
import { siteConfig } from "@/lib/site";
import type {
  AboutContent,
  HomepageContent,
  ImagePosition,
  PortfolioCategory,
  PortfolioItem,
  Product,
  ProductCategory,
  ProductImage,
  ProductStatus,
  SiteSettings,
  TailoringPageContent,
  Testimonial,
} from "@/types";

const portfolioCategories: PortfolioCategory[] = [
  "Abiti",
  "Gonne",
  "Cappotti",
  "Fiocchi nascita",
  "Accessori",
  "Sartoria su misura",
];

const productCategories: ProductCategory[] = [
  "Gonne",
  "Gonnoni",
  "Fiocchi nascita",
  "Accessori",
  "Idee regalo",
];

const portfolioItemFields = groq`
  _id,
  title,
  "slug": slug.current,
  category,
  description,
  image,
  "alt": coalesce(image.alt, title),
  "imagePosition": coalesce(imagePosition, "center"),
  featured,
  order
`;

const productFields = groq`
  _id,
  title,
  "slug": slug.current,
  category,
  description,
  images[]{
    ...,
    "alt": coalesce(alt, ^.title),
    "imagePosition": coalesce(imagePosition, "center")
  },
  price,
  size,
  materials,
  status,
  featured,
  order
`;

const portfolioItemsQuery = groq`
  *[_type == "portfolioItem"] | order(coalesce(order, 9999) asc, _createdAt desc) {
    ${portfolioItemFields}
  }
`;

const productsQuery = groq`
  *[_type == "product" && status != "archived"] | order(coalesce(order, 9999) asc, _createdAt desc) {
    ${productFields}
  }
`;

const testimonialsQuery = groq`
  *[_type == "testimonial" && coalesce(featured, true) == true] | order(_createdAt desc) {
    _id,
    name,
    text,
    productType,
    featured
  }
`;

const homepageQuery = groq`
  *[_type == "homepage"][0] {
    heroTitle,
    heroSubtitle,
    heroImage,
    "heroImageAlt": coalesce(heroImage.alt, heroTitle),
    "heroImagePosition": coalesce(heroImagePosition, "center"),
    ctaPrimary,
    ctaSecondary,
    featuredPortfolio[]->{
      ${portfolioItemFields}
    }
  }
`;

const aboutQuery = groq`
  *[_type == "about"][0] {
    title,
    subtitle,
    body,
    image,
    "imageAlt": coalesce(image.alt, title),
    "imagePosition": coalesce(imagePosition, "center"),
    storyImage,
    "storyImageAlt": coalesce(storyImage.alt, title),
    "storyImagePosition": coalesce(storyImagePosition, "center")
  }
`;

const tailoringPageQuery = groq`
  *[_type == "tailoringPage"][0] {
    introImage,
    "introImageAlt": introImage.alt,
    "introImagePosition": coalesce(introImagePosition, "center"),
    processImage,
    "processImageAlt": processImage.alt,
    "processImagePosition": coalesce(processImagePosition, "center")
  }
`;

const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    whatsappNumber,
    email,
    instagramUrl,
    address,
    seoTitle,
    seoDescription
  }
`;

type SanityPortfolioItem = {
  _id: string;
  slug?: string;
  title?: string;
  category?: string;
  description?: string;
  image?: SanityImageSource;
  alt?: string;
  imagePosition?: string;
  featured?: boolean;
  order?: number;
};

type SanityProduct = {
  _id: string;
  slug?: string;
  title?: string;
  category?: string;
  description?: string;
  images?: SanityProductImage[];
  price?: number;
  size?: string;
  materials?: string;
  status?: string;
  featured?: boolean;
  order?: number;
};

type SanityProductImage = SanityImageSource & {
  alt?: string;
  imagePosition?: string;
};

type SanityTestimonial = {
  _id: string;
  name?: string;
  text?: string;
  productType?: string;
  featured?: boolean;
};

type SanityHomepage = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: SanityImageSource;
  heroImageAlt?: string;
  heroImagePosition?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  featuredPortfolio?: SanityPortfolioItem[];
};

type SanityAbout = {
  title?: string;
  subtitle?: string;
  body?: string;
  image?: SanityImageSource;
  imageAlt?: string;
  imagePosition?: string;
  storyImage?: SanityImageSource;
  storyImageAlt?: string;
  storyImagePosition?: string;
};

type SanityTailoringPage = {
  introImage?: SanityImageSource;
  introImageAlt?: string;
  introImagePosition?: string;
  processImage?: SanityImageSource;
  processImageAlt?: string;
  processImagePosition?: string;
};

type SanitySiteSettings = {
  whatsappNumber?: string;
  email?: string;
  instagramUrl?: string;
  address?: string;
  seoTitle?: string;
  seoDescription?: string;
};

const fallbackHomepage: HomepageContent = {
  heroTitle: "Aggiungi contenuti da Sanity Studio",
  heroSubtitle:
    "Carica una hero reale dell'atelier e aggiorna testi e call to action dalla sezione Homepage.",
  heroImage: null,
  heroImageAlt: "",
  heroImagePosition: "center",
  ctaPrimary: "Richiedi una creazione su misura",
  ctaSecondary: "Le mie realizzazioni",
  featuredPortfolio: [],
};

const fallbackAbout: AboutContent = {
  title: "Serena Manna, modellista sartoriale",
  subtitle:
    "Disegno abiti da quando ero bambina. Oggi trasformo intuizioni e tessuti in cartamodelli e creazioni sartoriali.",
  body: `Già all'asilo riempivo i fogli di figurini, linee e forme, immaginando che un giorno avrei lavorato nel mondo della moda. Poi, come spesso accade, la vita ha preso altre strade. Ma quella passione non è mai davvero scomparsa.

Con il tempo ho deciso di tornarci, questa volta con consapevolezza: ho studiato, imparato il mestiere e approfondito la modellistica sartoriale, trasformando ciò che prima era soltanto un'intuizione in qualcosa di concreto.

Oggi, quando guardo un tessuto, spesso riesco già a immaginare il capo che potrebbe diventare. Da lì nasce il cartamodello, poi il taglio, la cucitura, le prove e infine una creazione che prima esisteva soltanto nella mia mente.

MyDreamySoul nasce proprio da questo percorso. Il nome racconta qualcosa di profondamente personale: un sogno che, poco alla volta, ha trovato la sua forma attraverso la sartoria.

Le mie creazioni si ispirano a un'eleganza senza tempo, con richiami rétro reinterpretati in modo personale. Amo le linee femminili, i dettagli sartoriali e soprattutto i tessuti particolari: quelli capaci di dare carattere a un capo e di renderlo diverso da qualsiasi altro.

Mi piace creare abiti e accessori che valorizzino chi li indossa senza uniformarlo, perché credo che un capo artigianale debba raccontare qualcosa della persona per cui è stato pensato.

Il mondo MyDreamySoul è così: delicato ma mai anonimo, femminile ma con carattere, elegante e allo stesso tempo capace di sorprendere. Ogni creazione nasce dalle mie mani, da un cartamodello e da una storia ancora da raccontare.`,
  image: null,
  imageAlt: "",
  imagePosition: "center",
  storyImage: null,
  storyImageAlt: "",
  storyImagePosition: "center",
};

const fallbackTailoringPage: TailoringPageContent = {
  introImage: null,
  introImageAlt: "",
  introImagePosition: "center",
  processImage: null,
  processImageAlt: "",
  processImagePosition: "center",
};

const fallbackSiteSettings: SiteSettings = {
  name: siteConfig.name,
  title: siteConfig.title,
  description: siteConfig.description,
  url: process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url,
  founder: siteConfig.founder,
  email: siteConfig.email,
  links: siteConfig.links,
};

function isPortfolioCategory(category: string | undefined): category is PortfolioCategory {
  return Boolean(category && portfolioCategories.includes(category as PortfolioCategory));
}

function isProductCategory(category: string | undefined): category is ProductCategory {
  return Boolean(category && productCategories.includes(category as ProductCategory));
}

function isProductStatus(status: string | undefined): status is ProductStatus {
  return (
    status === "available" ||
    status === "sold" ||
    status === "madeToOrder" ||
    status === "archived"
  );
}

function isImagePosition(position: string | undefined): position is ImagePosition {
  return (
    position === "center" ||
    position === "top" ||
    position === "bottom" ||
    position === "left" ||
    position === "right"
  );
}

function getImagePosition(position: string | undefined): ImagePosition {
  return isImagePosition(position) ? position : "center";
}

function formatPrice(price: number | undefined) {
  if (typeof price !== "number" || !Number.isFinite(price)) {
    return null;
  }

  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function mapProductImage(
  image: SanityImageSource | null | undefined,
  alt: string | undefined,
  imagePosition: string | undefined,
): ProductImage | null {
  const imageUrl = getSanityImageUrl(image, { width: 1400 });

  if (!imageUrl) {
    return null;
  }

  return {
    image: imageUrl,
    alt: alt || "Creazione sartoriale MyDreamySoul",
    imagePosition: getImagePosition(imagePosition),
  };
}

function isDefined<T>(value: T | null | undefined): value is T {
  return value != null;
}

function getWhatsAppUrl(number: string | undefined) {
  const cleanNumber = number?.replace(/\D/g, "");

  if (!cleanNumber) {
    return siteConfig.links.whatsapp;
  }

  return `https://wa.me/${cleanNumber}?text=Ciao%20Serena%2C%20vorrei%20richiedere%20una%20creazione%20sartoriale%20su%20misura.`;
}

function mapPortfolioItem(item: SanityPortfolioItem): PortfolioItem | null {
  const image = getSanityImageUrl(item.image, { width: 1400 });

  if (!item.title || !item.description || !image || !isPortfolioCategory(item.category)) {
    return null;
  }

  return {
    id: item.slug || item._id,
    title: item.title,
    category: item.category,
    description: item.description,
    image,
    alt: item.alt || item.title,
    imagePosition: getImagePosition(item.imagePosition),
    featured: item.featured,
    order: item.order,
  };
}

function mapProduct(item: SanityProduct): Product | null {
  const cmsImages =
    item.images
      ?.map((image) =>
        mapProductImage(
          image,
          image.alt || item.title,
          image.imagePosition,
        ),
      )
      .filter(isDefined) ?? [];
  const images = cmsImages;
  const primaryImage = images[0];

  if (
    !item.title ||
    !item.description ||
    !primaryImage ||
    !isProductCategory(item.category) ||
    !isProductStatus(item.status) ||
    item.status === "archived"
  ) {
    return null;
  }

  return {
    id: item.slug || item._id,
    name: item.title,
    category: item.category,
    description: item.description,
    images,
    price: item.price,
    priceLabel: formatPrice(item.price) || "Prezzo su richiesta",
    size: item.size,
    materials: item.materials,
    status: item.status,
    featured: item.featured,
    order: item.order,
  };
}

function mapTestimonial(item: SanityTestimonial): Testimonial | null {
  if (!item.name || !item.text) {
    return null;
  }

  return {
    name: item.name,
    role: item.productType || "Creazione sartoriale",
    quote: item.text,
  };
}

export const getPortfolioItems = cache(async (): Promise<PortfolioItem[]> => {
  const items = await sanityFetch<SanityPortfolioItem[]>({
    query: portfolioItemsQuery,
    tags: ["portfolioItem"],
  });

  const mappedItems = items?.map(mapPortfolioItem).filter(isDefined) ?? [];
  return mappedItems;
});

export const getProducts = cache(async (): Promise<Product[]> => {
  const items = await sanityFetch<SanityProduct[]>({
    query: productsQuery,
    tags: ["product"],
  });

  const mappedItems = items?.map(mapProduct).filter(isDefined) ?? [];
  return mappedItems;
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const items = await sanityFetch<SanityTestimonial[]>({
    query: testimonialsQuery,
    tags: ["testimonial"],
  });

  const mappedItems = items?.map(mapTestimonial).filter(isDefined) ?? [];
  return mappedItems;
});

export const getHomepageContent = cache(async (): Promise<HomepageContent> => {
  const homepage = await sanityFetch<SanityHomepage>({
    query: homepageQuery,
    tags: ["homepage", "portfolioItem"],
  });

  if (!homepage) {
    return fallbackHomepage;
  }

  const heroImage =
    getSanityImageUrl(homepage.heroImage, { width: 2200, quality: 84 }) ||
    null;
  const featuredPortfolio =
    homepage.featuredPortfolio?.map(mapPortfolioItem).filter(isDefined) ?? [];

  return {
    heroTitle: homepage.heroTitle || fallbackHomepage.heroTitle,
    heroSubtitle: homepage.heroSubtitle || fallbackHomepage.heroSubtitle,
    heroImage,
    heroImageAlt: homepage.heroImageAlt || fallbackHomepage.heroImageAlt,
    heroImagePosition: getImagePosition(homepage.heroImagePosition),
    ctaPrimary: homepage.ctaPrimary || fallbackHomepage.ctaPrimary,
    ctaSecondary: homepage.ctaSecondary || fallbackHomepage.ctaSecondary,
    featuredPortfolio,
  };
});

export const getAboutContent = cache(async (): Promise<AboutContent> => {
  const about = await sanityFetch<SanityAbout>({
    query: aboutQuery,
    tags: ["about"],
  });

  if (!about) {
    return fallbackAbout;
  }

  return {
    title: about.title || fallbackAbout.title,
    subtitle: about.subtitle || fallbackAbout.subtitle,
    body: about.body || fallbackAbout.body,
    image: getSanityImageUrl(about.image, { width: 1400 }),
    imageAlt: about.imageAlt || fallbackAbout.imageAlt,
    imagePosition: getImagePosition(about.imagePosition),
    storyImage: getSanityImageUrl(about.storyImage, { width: 1200 }),
    storyImageAlt: about.storyImageAlt || fallbackAbout.storyImageAlt,
    storyImagePosition: getImagePosition(about.storyImagePosition),
  };
});

export const getTailoringPageContent = cache(
  async (): Promise<TailoringPageContent> => {
    const page = await sanityFetch<SanityTailoringPage>({
      query: tailoringPageQuery,
      tags: ["tailoringPage"],
    });

    if (!page) {
      return fallbackTailoringPage;
    }

    return {
      introImage: getSanityImageUrl(page.introImage, { width: 1400 }),
      introImageAlt: page.introImageAlt || "",
      introImagePosition: getImagePosition(page.introImagePosition),
      processImage: getSanityImageUrl(page.processImage, { width: 2200 }),
      processImageAlt: page.processImageAlt || "",
      processImagePosition: getImagePosition(page.processImagePosition),
    };
  },
);

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const settings = await sanityFetch<SanitySiteSettings>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
  });

  if (!settings) {
    return fallbackSiteSettings;
  }

  const email = settings.email || fallbackSiteSettings.email;

  return {
    ...fallbackSiteSettings,
    title: settings.seoTitle || fallbackSiteSettings.title,
    description: settings.seoDescription || fallbackSiteSettings.description,
    email,
    address: settings.address,
    links: {
      whatsapp: getWhatsAppUrl(settings.whatsappNumber),
      instagram: settings.instagramUrl || fallbackSiteSettings.links.instagram,
      email: `mailto:${email}`,
    },
  };
});
