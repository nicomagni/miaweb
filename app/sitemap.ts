import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-05-09");

  return [
    {
      url: "https://www.miahilados.com.ar/",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.miahilados.com.ar/terminos",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.miahilados.com.ar/privacidad",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
