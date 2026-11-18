import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";

import {
  createRobotsTxt,
  createSitemapXml,
  createStructuredData,
  siteMetadata,
} from "./src/config/siteMetadata.ts";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderSiteMetadata() {
  const metadata = siteMetadata;
  const image = metadata.openGraph.image;
  const structuredData = JSON.stringify(createStructuredData()).replaceAll("<", "\\u003c");
  const tag = (name: string, content: string) =>
    `<meta name="${name}" content="${escapeHtml(content)}" />`;
  const property = (name: string, content: string | number) =>
    `<meta property="${name}" content="${escapeHtml(String(content))}" />`;

  return [
    `<title>${escapeHtml(metadata.title)}</title>`,
    tag("description", metadata.description),
    tag("author", metadata.author),
    `<link rel="canonical" href="${escapeHtml(metadata.canonicalUrl)}" />`,
    `<link rel="icon" type="image/png" sizes="48x48" href="${metadata.icons.favicon48}" />`,
    `<link rel="icon" type="image/png" sizes="96x96" href="${metadata.icons.favicon96}" />`,
    `<link rel="apple-touch-icon" sizes="180x180" href="${metadata.icons.appleTouchIcon}" />`,
    property("og:title", metadata.openGraph.title),
    property("og:description", metadata.openGraph.description),
    property("og:type", metadata.openGraph.type),
    property("og:site_name", metadata.name),
    property("og:locale", metadata.openGraphLocale),
    property("og:url", metadata.canonicalUrl),
    property("og:image", image.url),
    property("og:image:type", image.type),
    property("og:image:width", image.width),
    property("og:image:height", image.height),
    property("og:image:alt", image.alt),
    tag("twitter:card", metadata.twitter.card),
    tag("twitter:title", metadata.twitter.title),
    tag("twitter:description", metadata.twitter.description),
    tag("twitter:image", image.url),
    tag("twitter:image:alt", image.alt),
    `<script type="application/ld+json">${structuredData}</script>`,
  ].join("\n    ");
}

function siteMetadataPlugin(): Plugin {
  return {
    name: "od-swoich-site-metadata",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = request.url?.split("?", 1)[0];

        if (pathname === "/robots.txt") {
          response.statusCode = 200;
          response.setHeader("Content-Type", "text/plain; charset=utf-8");
          response.end(createRobotsTxt());
          return;
        }

        if (pathname === "/sitemap.xml") {
          response.statusCode = 200;
          response.setHeader("Content-Type", "application/xml; charset=utf-8");
          response.end(createSitemapXml());
          return;
        }

        next();
      });
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "robots.txt", source: createRobotsTxt() });
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: createSitemapXml() });
    },
    transformIndexHtml(html: string) {
      return html
        .replace("__SITE_LOCALE__", siteMetadata.locale)
        .replace("<!-- site-metadata -->", renderSiteMetadata());
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  build: {
    // Preserve the browser syntax targets used before Vite's default target changed.
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), siteMetadataPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
});
