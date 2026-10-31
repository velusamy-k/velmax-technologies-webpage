const LOGOS_DIR = 'LOGOS';
const VELMAX_LOGO_FOLDER = 'VELMAX LOGO';
const VELMAX_LOGO_FILE = 'VELMAX LOGO.png';

function publicImageUrl(...segments: string[]): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = segments.map((s) => encodeURIComponent(s)).join('/');
  return `${base}/images/${path}`;
}

/** Velmax company emblem (gear + bolt) for header, footer, and subpages. */
export const velmaxLogoSrc = publicImageUrl(
  LOGOS_DIR,
  VELMAX_LOGO_FOLDER,
  VELMAX_LOGO_FILE,
);
