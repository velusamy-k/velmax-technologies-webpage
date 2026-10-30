import type { EnquiryProductValue } from './whatsapp-enquiry';

export const productOptions = [
  { value: 'servo-stabilizers', label: 'Servo stabilizers' },
  { value: 'inverter-batteries', label: 'Inverter batteries' },
  { value: 'online-ups', label: 'Online UPS systems' },
  { value: 'general', label: 'Not sure yet' },
] as const satisfies ReadonlyArray<{ value: EnquiryProductValue; label: string }>;

export type ProductOptionValue = (typeof productOptions)[number]['value'];
