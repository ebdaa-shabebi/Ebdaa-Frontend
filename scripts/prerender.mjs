import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const outDir = path.resolve(root, "dist");

const pages = {
  "/": {
    title: "إبداع ميديا | إنتاج الفيديو الإعلاني والدعاية والتسويق في عدن",
    description:
      "إبداع ميديا شركة دعاية وإعلان في عدن، اليمن. نقدم إنتاج الفيديو الإعلاني والموشن جرافيك والتصوير الاحترافي وإدارة الحملات والإعلانات الخارجية. اكتشف أعمالنا.",
  },

  "/motion-graphics": {
    title: "تصميم الموشن جرافيك في عدن | إبداع ميديا",
    description:
      "اكتشف خدمات تصميم الموشن جرافيك والرسوم المتحركة من إبداع ميديا في عدن، اليمن. نحول الأفكار التسويقية إلى محتوى بصري إبداعي.",
  },

  "/advertising-videos": {
    title: "إنتاج الفيديو الإعلاني في عدن | إبداع ميديا",
    description:
      "إبداع ميديا تقدم خدمات تصوير وإنتاج الفيديو الإعلاني في عدن، اليمن، من الفكرة والتصوير إلى المونتاج والإنتاج الاحترافي.",
  },

  "/advertising-campaigns": {
    title: "إدارة الحملات الإعلانية في عدن | إبداع ميديا",
    description:
      "إبداع ميديا تقدم خدمات تخطيط وإدارة الحملات الإعلانية في عدن، اليمن، عبر الوسائط المختلفة للوصول إلى الجمهور المستهدف وتعزيز حضور العلامات التجارية.",
  },

  "/websites": {
    title: "تصميم مواقع إلكترونية في عدن | إبداع ميديا",
    description:
      "إبداع ميديا تقدم خدمات تصميم وتطوير المواقع الإلكترونية في عدن، اليمن، لإنشاء تجارب رقمية احترافية تعزز حضور العلامات التجارية.",
  },

  "/services/content": {
    title: "صناعة المحتوى التسويقي في عدن | إبداع ميديا",
    description:
      "إبداع ميديا تقدم خدمات صناعة المحتوى التسويقي في عدن، اليمن، بما يشمل كتابة المحتوى والاستراتيجية ومحتوى الفيديو والمحتوى التفاعلي.",
  },

  "/services/campaigns": {
    title: "إدارة الحملات الإعلانية في عدن | إبداع ميديا",
    description:
      "اكتشف خدمات إبداع ميديا في تخطيط وإدارة الحملات الإعلانية في عدن، اليمن. نستهدف الجمهور المناسب ونتابع أداء الحملات لتحسين النتائج.",
  },

  "/services/identity": {
    title: "تصميم الهوية البصرية في عدن | إبداع ميديا",
    description:
      "إبداع ميديا تقدم خدمات تصميم الهوية البصرية في عدن، اليمن، بما يشمل تصميم الشعارات واختيار الألوان والخطوط وإعداد دليل الهوية وتطبيقها.",
  },

  "/services/digital-ads": {
    title: "تصميم الإعلانات الرقمية والمطبوعة في عدن | إبداع ميديا",
    description:
      "إبداع ميديا تقدم خدمات تصميم الإعلانات الرقمية والمطبوعة في عدن، اليمن، بما يشمل إعلانات السوشيال ميديا والمواد الإعلانية الجاهزة للطباعة.",
  },

  "/services/social-media": {
    title: "إدارة حسابات التواصل الاجتماعي في عدن | إبداع ميديا",
    description:
      "إبداع ميديا تقدم خدمات إدارة حسابات التواصل الاجتماعي في عدن، اليمن، من تخطيط المحتوى وصناعته ونشره إلى متابعة التفاعل وتحليل الأداء والتقارير الشهرية.",
  },

  "/services/video": {
    title: "إنتاج إعلانات الفيديو في عدن | إبداع ميديا",
    description:
      "إبداع ميديا تقدم خدمات إنتاج إعلانات الفيديو في عدن، اليمن، بما يشمل الموشن جرافيك وإعلانات المنتجات والفيديوهات الترويجية والتعليق الصوتي.",
  },
};

// encodeURI leaves "," "(" ")" untouched, but they are not safe inside srcset.
function encodeAssetUrl(url) {
  return encodeURI(decodeSafe(url))
    .replaceAll(",", "%2C")
    .replaceAll("(", "%28")
    .replaceAll(")", "%29");
}

function decodeSafe(value) {
  try {
    return decodeURI(value);
  } catch {
    return value;
  }
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function setTagAttribute(tag, attribute, value) {
  const regex = new RegExp(`\\b${attribute}=(["']).*?\\1`, "i");

  if (regex.test(tag)) {
    return tag.replace(regex, `${attribute}="${escapeHtml(value)}"`);
  }

  return tag.replace(/\/?>$/, ` ${attribute}="${escapeHtml(value)}"$&`);
}

function setMeta(html, attribute, key, content) {
  const regex = new RegExp(
    `<meta\\b(?=[^>]*\\b${attribute}=["']${key}["'])[^>]*>`,
    "i",
  );

  const match = html.match(regex);

  if (match) {
    return html.replace(regex, setTagAttribute(match[0], "content", content));
  }

  return html.replace(
    "</head>",
    `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />\n</head>`,
  );
}

function setCanonical(html, url) {
  const regex = /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i;

  const match = html.match(regex);

  if (match) {
    return html.replace(regex, setTagAttribute(match[0], "href", url));
  }

  return html.replace(
    "</head>",
    `<link rel="canonical" href="${url}" />\n</head>`,
  );
}

async function main() {
  const template = await fs.readFile(path.join(outDir, "index.html"), "utf8");

  const manifest = JSON.parse(
    await fs.readFile(path.join(outDir, "manifest.json"), "utf8"),
  );

  const vite = await createServer({
    root,
    configFile: path.join(root, "vite.config.js"),
    server: {
      middlewareMode: true,
    },
    appType: "custom",
    logLevel: "error",
  });

  try {
    const { default: App } = await vite.ssrLoadModule("/src/App.jsx");

    for (const [route, metadata] of Object.entries(pages)) {
      const appHtml = renderToString(
        React.createElement(App, {
          initialRoute: route,
        }),
      );

      let html = template.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`,
      );

      const canonical = `https://ebdaa-media.com${route === "/" ? "/" : route}`;

      html = html.replace(
        /<title>[\s\S]*?<\/title>/i,
        `<title>${escapeHtml(metadata.title)}</title>`,
      );

      html = setMeta(html, "name", "description", metadata.description);

      html = setCanonical(html, canonical);

      html = setMeta(html, "property", "og:title", metadata.title);
      html = setMeta(html, "property", "og:description", metadata.description);
      html = setMeta(html, "property", "og:url", canonical);

      html = setMeta(html, "name", "twitter:title", metadata.title);
      html = setMeta(html, "name", "twitter:description", metadata.description);

      // Replace ALL source asset URLs with production hashed URLs.
      // IMPORTANT: production URLs must be percent-encoded. Asset names like
      // "خلفية طول-abc123.webp" contain spaces, and a raw space inside
      // <source srcset="..."> ends the URL, so the browser silently drops the
      // mobile <source> and shows the <img> (desktop) image instead.
      for (const [source, asset] of Object.entries(manifest)) {
        if (asset.file && source.startsWith("src/assets/")) {
          const sourceUrl = `/${source}`;
          const productionUrl = encodeAssetUrl(`/${asset.file}`);

          const variants = new Set([
            sourceUrl,
            encodeURI(sourceUrl),
            encodeAssetUrl(sourceUrl),
          ]);

          for (const variant of variants) {
            html = html.replaceAll(variant, productionUrl);
          }
        }
      }

      // Handle navigation icons if they were not replaced by the manifest.
      const emittedAssets = new Set();

      for (const asset of Object.values(manifest)) {
        if (asset.file) emittedAssets.add(asset.file);

        for (const file of asset.assets ?? []) {
          emittedAssets.add(file);
        }
      }

      for (const source of [
        "src/assets/home-icon.png",
        "src/assets/services-icon.png",
      ]) {
        if (
          !html.includes(`/${source}`) &&
          !html.includes(encodeURI(`/${source}`))
        ) {
          continue;
        }

        const filename = path.basename(source);
        const extension = path.extname(filename);
        const name = filename.slice(0, -extension.length);

        const outputFile = [...emittedAssets].find((file) => {
          const outputName = path.basename(file);

          return outputName === filename || outputName.startsWith(`${name}-`);
        });

        if (!outputFile) {
          throw new Error(`Could not find production asset for ${source}`);
        }

        html = html.replaceAll(`/${source}`, `/${outputFile}`);
        html = html.replaceAll(encodeURI(`/${source}`), `/${outputFile}`);
      }

      const outputPath =
        route === "/"
          ? path.join(outDir, "index.html")
          : path.join(outDir, route.slice(1), "index.html");

      await fs.mkdir(path.dirname(outputPath), {
        recursive: true,
      });

      await fs.writeFile(outputPath, html, "utf8");

      console.log(`Pre-rendered: ${route}`);
    }

    console.log("\nAll pages pre-rendered successfully.");
  } finally {
    await vite.close();
  }
}

main().catch((error) => {
  console.error("Pre-rendering failed:", error);
  process.exit(1);
});
