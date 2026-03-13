const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Покласти basePath перед шляхом для GitHub Pages */
export const assetUrl = (path: string) =>
  base + (path.startsWith("/") ? path : "/" + path);
