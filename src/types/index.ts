export type ServiceIcon =
  | "scissors"
  | "sparkles"
  | "ruler"
  | "gift"
  | "flower"
  | "heart";

export type Service = {
  title: string;
  description: string;
  icon: ServiceIcon;
  href: string;
};

export type ImagePosition = "center" | "top" | "bottom" | "left" | "right";

export type PortfolioCategory =
  | "Abiti"
  | "Gonne"
  | "Cappotti"
  | "Fiocchi nascita"
  | "Accessori"
  | "Sartoria su misura";

export type PortfolioItem = {
  id: string;
  title: string;
  category: PortfolioCategory;
  description: string;
  image: string;
  alt: string;
  imagePosition: ImagePosition;
  featured?: boolean;
  order?: number;
};

export type ProductCategory =
  | "Gonne"
  | "Gonnoni"
  | "Fiocchi nascita"
  | "Accessori"
  | "Idee regalo";

export type ProductStatus = "available" | "sold" | "madeToOrder" | "archived";

export type ProductImage = {
  image: string;
  alt: string;
  imagePosition: ImagePosition;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  images: ProductImage[];
  price?: number;
  priceLabel: string;
  size?: string;
  materials?: string;
  status: ProductStatus;
  featured?: boolean;
  order?: number;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export type TimelineStep = {
  title: string;
  description: string;
};

export type HomepageContent = {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string | null;
  heroImageAlt: string;
  heroImagePosition: ImagePosition;
  ctaPrimary: string;
  ctaSecondary: string;
  featuredPortfolio: PortfolioItem[];
};

export type AboutContent = {
  title: string;
  subtitle: string;
  body: string;
  image: string | null;
  imageAlt: string;
  imagePosition: ImagePosition;
  storyImage: string | null;
  storyImageAlt: string;
  storyImagePosition: ImagePosition;
};

export type TailoringPageContent = {
  introImage: string | null;
  introImageAlt: string;
  introImagePosition: ImagePosition;
  processImage: string | null;
  processImageAlt: string;
  processImagePosition: ImagePosition;
};

export type SiteSettings = {
  name: string;
  title: string;
  description: string;
  url: string;
  founder: string;
  email: string;
  address?: string;
  links: {
    whatsapp: string;
    instagram: string;
    email: string;
  };
};
