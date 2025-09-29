import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NewsHub - Your Trusted News Source",
    short_name: "NewsHub",
    description:
      "Stay informed with breaking news and in-depth analysis from around the world",
    start_url: "/en",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/placeholder-logo.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/placeholder-logo.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
