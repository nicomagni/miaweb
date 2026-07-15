import type { Metadata } from "next";
import Script from "next/script";
import { getPublishedCollectionsForPublic } from "@/lib/public-collections";
import { getPublicProviders } from "@/lib/public-providers";
import { loadLegacyHtml } from "@/lib/legacy-html";

const siteUrl = "https://www.miahilados.com";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Mía Hilados",
      legalName: "XAUMAX S.A.",
      url: `${siteUrl}/`,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/mia-logo.webp`,
        width: 200,
        height: 200,
      },
      description:
        "Fabricante argentino de hilados premium con ADN italiano. Más de 40 años elaborando lanas, ovillos y hebras de alta calidad para tejido, crochet y amigurumi.",
      foundingDate: "1985",
      email: "martin@miahilados.com",
      telephone: "+541166004450",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Zárate 989",
        postalCode: "B1650",
        addressLocality: "Villa Chacabuco",
        addressRegion: "Buenos Aires",
        addressCountry: "AR",
      },
      sameAs: ["https://www.instagram.com/mia_hilados"],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+541166004450",
        contactType: "customer service",
        areaServed: "AR",
        availableLanguage: "Spanish",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: "Mía Hilados",
      image: `${siteUrl}/images/dsc03573.webp`,
      url: `${siteUrl}/`,
      telephone: "+541166004450",
      email: "martin@miahilados.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Zárate 989",
        postalCode: "B1650",
        addressLocality: "Villa Chacabuco",
        addressRegion: "Buenos Aires",
        addressCountry: "AR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -34.4167,
        longitude: -58.6833,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      sameAs: ["https://www.instagram.com/mia_hilados"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: "Mía Hilados",
      inLanguage: "es-AR",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const metadata: Metadata = {
  title: "Mía Hilados — Hilados Premium para Tejido y Crochet | Argentina",
  description:
    "Mía Hilados — Hilados premium para tejido y crochet con ADN italiano. Más de 40 años fabricando lanas de alta calidad en Argentina. Encontrá tu distribuidor certificado.",
  keywords: [
    "hilados",
    "lana",
    "hilos",
    "tejido",
    "crochet",
    "ovillo",
    "lana argentina",
    "hilados premium",
    "Mía Hilados",
    "distribuidores de hilados",
    "mayoristas hilados",
  ],
  authors: [{ name: "Mía Hilados" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mía Hilados — Hilados Premium para Tejido y Crochet | Argentina",
    description:
      "Más de 40 años fabricando hilados de lana premium con ADN italiano. Distribuidores en todo el país. Tejido, crochet y amigurumi.",
    url: siteUrl,
    siteName: "Mía Hilados",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/dsc01944.webp`,
        width: 1200,
        height: 800,
        alt: "Exhibición de ovillos y hilados Mía Hilados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@mia_hilados",
    title: "Mía Hilados — Hilados Premium para Tejido y Crochet",
    description:
      "Más de 40 años fabricando lanas de alta calidad con ADN italiano. Encontrá tu distribuidor en todo el país.",
    images: [`${siteUrl}/images/dsc01944.webp`],
  },
};

export default async function HomePage() {
  const homeBody = loadLegacyHtml("home-body.html");
  const homeHtml = `<script id="mia-structured-data" type="application/ld+json">${serializeJsonLd(
    structuredData,
  )}</script>${homeBody}`;
  let publicCollections: Awaited<ReturnType<typeof getPublishedCollectionsForPublic>> = [];
  let publicProviders: Awaited<ReturnType<typeof getPublicProviders>> = [];

  try {
    publicCollections = await getPublishedCollectionsForPublic();
  } catch {
    publicCollections = [];
  }

  try {
    publicProviders = await getPublicProviders();
  } catch {
    publicProviders = [];
  }

  return (
    <>
      <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: homeHtml }} />
      <Script
        id="mia-collections-data"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.__MIA_COLLECTIONS__ = ${JSON.stringify(publicCollections)};`,
        }}
      />
      <Script
        id="mia-providers-data"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.__MIA_PROVIDERS__ = ${JSON.stringify(publicProviders)};`,
        }}
      />
      <Script src="/js/main.js" strategy="afterInteractive" />
      <Script src="/js/ui-enhancements.js" strategy="afterInteractive" />
    </>
  );
}
