export type ClientLogo = {
  src: string;
  alt: string;
};

const LOGOS_DIR = 'LOGOS';

function publicLogoUrl(filename: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/images/${encodeURIComponent(LOGOS_DIR)}/${encodeURIComponent(filename)}`;
}

function logoEntry(filename: string, alt: string): ClientLogo {
  return { src: publicLogoUrl(filename), alt };
}

/** Client / partner logos for the Our Services marquee. */
export const clientLogos: ClientLogo[] = [
  logoEntry('AARECC Power Source Logo.png', 'AARECC Power Source'),
  logoEntry('Apollo Hospital Logo.jpg', 'Apollo Hospital'),
  logoEntry('KLEIDER CARE.png', 'Kleider Care'),
  logoEntry('New Power Circuits Logo.png', 'New Power Circuits'),
  logoEntry('OBI Interiors Logo.png', 'OBI Interiors'),
  logoEntry('VOLTECH Engineering Excellence Logo.png', 'VOLTECH Engineering Excellence'),
  logoEntry('ZEBU.png', 'ZEBU'),
  logoEntry('Zoho.jpg', 'Zoho'),
];
