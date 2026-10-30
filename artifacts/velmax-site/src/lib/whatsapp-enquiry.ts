export type EnquiryProductValue =
  | 'servo-stabilizers'
  | 'inverter-batteries'
  | 'online-ups'
  | 'general';

export type EnquiryPrefill = {
  product: EnquiryProductValue;
  configuration: string;
  model: string;
};

export type WhatsAppEnquiryFields = {
  name: string;
  company?: string;
  email: string;
  phone: string;
  product: EnquiryProductValue;
  message?: string;
  configuration?: string;
  model?: string;
};

/** Digits only, no leading + — format required by wa.me / api.whatsapp.com */
export const WHATSAPP_BUSINESS_PHONE = '919025277770';

const ENQUIRY_PREFILL_KEY = 'velmax-enquiry-prefill';

const productLabels: Record<EnquiryProductValue, string> = {
  'servo-stabilizers': 'Servo Stabilizer',
  'inverter-batteries': 'Inverter Battery',
  'online-ups': 'Online UPS',
  general: 'General enquiry (product not specified)',
};

export function getEnquiryProductLabel(product: EnquiryProductValue): string {
  return productLabels[product];
}

export function saveEnquiryPrefill(prefill: EnquiryPrefill): void {
  try {
    sessionStorage.setItem(ENQUIRY_PREFILL_KEY, JSON.stringify(prefill));
  } catch {
    /* sessionStorage unavailable */
  }
}

export function readEnquiryPrefill(): EnquiryPrefill | null {
  try {
    const raw = sessionStorage.getItem(ENQUIRY_PREFILL_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as EnquiryPrefill;
    if (!parsed?.product || !parsed.configuration || !parsed.model) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearEnquiryPrefill(): void {
  try {
    sessionStorage.removeItem(ENQUIRY_PREFILL_KEY);
  } catch {
    /* sessionStorage unavailable */
  }
}

export function contactEnquiryHref(): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/#contact`;
}

export function formatWhatsAppEnquiryMessage(fields: WhatsAppEnquiryFields): string {
  const lines = [
    'Hello Velmax Technologies,',
    '',
    'I would like to submit a product enquiry via your website.',
    '',
    `Product of interest: ${getEnquiryProductLabel(fields.product)}`,
  ];

  if (fields.configuration?.trim()) {
    lines.push(`Configuration: ${fields.configuration.trim()}`);
  }
  if (fields.model?.trim()) {
    lines.push(`Model: ${fields.model.trim()}`);
  }

  lines.push(`Name: ${fields.name}`);

  if (fields.company?.trim()) {
    lines.push(`Company: ${fields.company.trim()}`);
  }

  lines.push(`Work email: ${fields.email}`, `Phone: ${fields.phone}`);

  if (fields.message?.trim()) {
    lines.push('', 'Requirements / message:', fields.message.trim());
  }

  lines.push('', 'Thank you.');
  return lines.join('\n');
}

export function buildWhatsAppClickToChatUrl(text: string, phone = WHATSAPP_BUSINESS_PHONE): string {
  const normalizedPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppEnquiryUrl(fields: WhatsAppEnquiryFields): string {
  return buildWhatsAppClickToChatUrl(formatWhatsAppEnquiryMessage(fields));
}
