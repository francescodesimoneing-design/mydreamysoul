/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getSiteSettings } from "@/lib/cms";

import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    metadataBase: new URL(settings.url),
    title: {
      default: settings.title,
      template: "%s | MyDreamySoul Handmade",
    },
    description: settings.description,
    applicationName: settings.name,
    authors: [{ name: settings.founder }],
    creator: settings.founder,
    openGraph: {
      title: settings.title,
      description: settings.description,
      url: settings.url,
      siteName: settings.name,
      locale: "it_IT",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: settings.title,
      description: settings.description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAF7F2",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar whatsappUrl={settings.links.whatsapp} />
        <main>{children}</main>
        <Footer settings={settings} />
        <WhatsAppButton href={settings.links.whatsapp} />
      </body>
    </html>
  );
}
