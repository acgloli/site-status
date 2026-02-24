import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import pkg from "./package.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
const readEnv = (...keys: string[]) => {
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
};

// site env
const siteConfig = {
  siteTitle: process.env.SITE_TITLE || "IMSYY 站点监测",
  siteDescription: process.env.SITE_DESCRIPTION || "一个简约的站点监测",
  siteKeywords: process.env.SITE_KEYWORDS || "站点监测,监测,监控",
  siteLogo: process.env.SITE_LOGO || "/favicon.ico",
  siteGithubLink:
    readEnv("SITE_GITHUB_LINK", "site_github_link") || "https://github.com/imsyy/site-status",
  siteHomeLink: readEnv("SITE_HOME_LINK", "site_home_link") || "https://www.imsyy.top/",
  siteEmailLink: readEnv("SITE_EMAIL_LINK", "site_email_link") || "mailto:one@imsyy.top",
  siteOwnerName: readEnv("SITE_OWNER_NAME") || "IMSYY",
  siteOwnerLink: readEnv("SITE_OWNER_LINK") || "https://www.imsyy.top",
  siteIcp: readEnv("SITE_ICP", "site_icp"),
  siteMoeIcp: readEnv("SITE_MOE_ICP", "site_moe_icp"),
  siteMoeIcpLink: readEnv("SITE_MOE_ICP_LINK", "site_moe_icp_link"),
  siteMpsIcp: readEnv("SITE_MPS_ICP", "site_mps_icp"),
  siteMpsIcpLink: readEnv("SITE_MPS_ICP_LINK", "site_mps_icp_link"),
  countDays: Number(process.env.COUNT_DAYS || 60),
  showLink: process.env.SHOW_LINK === "true" || true,
  platform: process.env.DEPLOYMENT_PLATFORM || "cloudflare",
  version: pkg.version,
};

export default defineNuxtConfig({
  // modules
  modules: [
    "@pinia/nuxt",
    "pinia-plugin-persistedstate",
    "@nuxt/eslint",
    "nuxtjs-naive-ui",
    "@vite-pwa/nuxt",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-lodash",
    "@nuxtjs/i18n",
  ].concat(siteConfig.platform === "cloudflare" ? "@nuxthub/core" : ""),
  // ssr
  ssr: false,
  // devtools
  devtools: { enabled: true },
  // app
  app: {
    rootAttrs: { id: "nuxt-app" },
    // site-meta
    head: {
      title: siteConfig.siteTitle,
      meta: [
        {
          name: "description",
          content: siteConfig.siteDescription,
        },
        {
          name: "keywords",
          content: siteConfig.siteKeywords,
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },
      ],
      link: [
        { rel: "icon", href: siteConfig.siteLogo },
        {
          rel: "apple-touch-icon",
          href: "/images/icons/normal/apple-touch-icon-180x180.png",
          sizes: "180x180",
        },
        {
          rel: "mask-icon",
          href: "/images/icons/normal/maskable-icon-512x512.png",
          color: "#ffffff",
        },
        // manifest
        process.env.NODE_ENV !== "development"
          ? {
              rel: "manifest",
              href: "/manifest.webmanifest",
            }
          : undefined,
      ],
      htmlAttrs: {
        lang: "zh-CN",
      },
    },
  },
  // css
  css: ["~/style/main.scss", "~/style/animate.scss"],
  // env
  runtimeConfig: {
    apiUrl: process.env.API_URL || "https://api.uptimerobot.com/v2/",
    apiKey: process.env.API_KEY,
    sitePassword: process.env.SITE_PASSWORD,
    siteSecretKey: process.env.SITE_SECRE_KEY || "site-status",
    public: siteConfig,
  },
  devServer: { port: 8566 },
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2024-11-11",
  // vite
  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            "naive-ui": [
              "useDialog",
              "useMessage",
              "useNotification",
              "useLoadingBar",
            ],
          },
        ],
      }),
      Components({
        resolvers: [NaiveUiResolver()],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ["legacy-js-api"],
        },
      },
    },
  },
  // https://eslint.nuxt.com
  eslint: {
    config: {
      stylistic: {
        quotes: "double",
        semi: true,
      },
    },
  },
  // i18n
  i18n: {
    vueI18n: "./lang/i18n.config.ts",
  },
  // icon
  icon: {
    mode: "svg",
    customCollections: [
      {
        prefix: "icon",
        dir: "./app/assets/icons",
        normalizeIconName: false,
      },
    ],
  },
  // pwa
  pwa: {
    manifest: {
      name: siteConfig.siteTitle,
      short_name: siteConfig.siteDescription,
      description: siteConfig.siteDescription,
      theme_color: "#ffffff",
      icons: [
        {
          src: "/images/icons/normal/pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "/images/icons/normal/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/images/icons/normal/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/images/icons/normal/maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
  },
});
