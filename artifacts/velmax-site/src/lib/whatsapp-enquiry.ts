export type EnquiryProductValue =
  | 'servo-stabilizers'
  | 'inverter-batteries'
  | 'online-ups'
  | 'general';

export type WhatsAppEnquiryFields = {
  name: string;
  company?: string;
  email: string;
  phone: string;
  product: EnquiryProductValue;
  message?: string;
};

/** Digits only, no leading + — format required by wa.me / api.whatsapp.com */
export const WHATSAPP_BUSINESS_PHONE = '919025277770';

const productLabels: Record<EnquiryProductValue, string> = {
  'servo-stabilizers': 'Servo Stabilizer',
  'inverter-batteries': 'Inverter Battery',
  'online-ups': 'Online UPS',
  general: 'General enquiry (product not specified)',
};

export function getEnquiryProductLabel(product: EnquiryProductValue): string {
  return productLabels[product];
}

export function formatWhatsAppEnquiryMessage(fields: WhatsAppEnquiryFields): string {
  const lines = [
    'Hello Velmax Technologies,',
    '',
    'I would like to submit a product enquiry via your website.',
    '',
    `Product of interest: ${getEnquiryProductLabel(fields.product)}`,
    `Name: ${fields.name}`,
  ];

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
