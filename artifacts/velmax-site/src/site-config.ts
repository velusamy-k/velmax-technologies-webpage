/**
 * Single source of editable company and product content.
 * Do not publish unverified values. Add verified contact details, specs,
 * industries, certifications and social links here when supplied.
 *
 * Product images in /public/images/concept-*.jpg are generated concept art,
 * not actual Velmax products. Replace each image path with approved photography.
 */

export type ServoModelVariant = {
  id: string;
  label: string;
  href: string;
};

export type ServoModelGroup = {
  id: string;
  label: string;
  variants: ServoModelVariant[];
};

type BaseProduct = {
  id: string;
  number: string;
  name: string;
  shortName: string;
  eyebrow: string;
  image: string;
  imageAlt: string;
  description: string;
  benefits: string[];
};

export type SiteProduct =
  | (BaseProduct & { id: 'servo-stabilizers'; modelGroups: ServoModelGroup[] })
  | BaseProduct;

export const siteConfig = {
  company: {
    name: 'Velmax Technologies',
    descriptor: 'Power equipment, engineered for continuity.',
    overview:
      'Velmax Technologies manufactures servo stabilizers, inverter batteries and online UPS systems for businesses evaluating dependable power equipment.',
    announcement: null as string | null,
    contact: {
      email: 'velmaxtechnologies@gmail.com' as string | null,
      phone: '+91 9025277770' as string | null,
      phones: ['+91 9025277770', '+91 9003077471'] as string[],
      address: null as string | null,
      whatsapp: null as string | null,
      mapUrl: null as string | null,
    },
    social: [] as { label: string; href: string }[],
    privacyUrl: null as string | null,
  },
  products: [
    {
      id: 'servo-stabilizers',
      number: '01',
      name: 'Servo stabilizers',
      shortName: 'Servo stabilizers',
      eyebrow: 'Voltage conditioning',
      image: '/images/concept-servo.jpg',
      imageAlt: 'Generated concept image of an unbranded servo stabilizer cabinet',
      description:
        'A considered approach to voltage regulation. Explore a servo stabilizer solution for the demands of your equipment and operating environment.',
      benefits: [],
      modelGroups: [
        {
          id: 'air-cooled',
          label: 'Air Cooled Model Servo Stabilizer',
          variants: [
            {
              id: 'air-1ph',
              label: 'Air Cooled Single phase Input & Single Phase Output.',
              href: '#',
            },
            {
              id: 'air-3ph',
              label: 'Air Cooled 3 Phase Input & 3 Phase Output.',
              href: '#',
            },
          ],
        },
        {
          id: 'oil-cooled',
          label: 'Oil Cooled Model Servo Stabilizer',
          variants: [
            {
              id: 'oil-1ph',
              label: 'Oil Cooled Single phase Input & Single Phase Output.',
              href: '#',
            },
            {
              id: 'oil-3ph',
              label: 'Oil Cooled 3 Phase Input & 3 Phase Output.',
              href: '#',
            },
          ],
        },
      ],
    },
    {
      id: 'inverter-batteries',
      number: '02',
      name: 'Inverter batteries',
      shortName: 'Inverter batteries',
      eyebrow: 'Stored power',
      image: '/images/concept-battery.jpg',
      imageAlt: 'Generated concept image of unbranded inverter battery units',
      description:
        'A reliable backup system begins with the right battery. Tell us about your load and usage; our team can help discuss an appropriate configuration.',
      benefits: [
        'A considered match for your inverter system',
        'Guidance shaped around the way you use power',
        'Available variants and specifications on enquiry',
      ],
    },
    {
      id: 'online-ups',
      number: '03',
      name: 'Online UPS systems',
      shortName: 'Online UPS',
      eyebrow: 'Power continuity',
      image: '/images/concept-ups.jpg',
      imageAlt: 'Generated concept image of an unbranded online UPS cabinet',
      description:
        'For operations where power continuity matters. Start a conversation about the load, environment and level of continuity your installation requires.',
      benefits: [
        'A solution conversation focused on your application',
        'Technical details confirmed for each requirement',
        'Models and specifications available on enquiry',
      ],
    },
  ] satisfies SiteProduct[],
  // Empty until customer applications have been verified by the company.
  industries: [] as { name: string; description: string }[],
  // Empty until certificates, testimonials or measurable claims are verified.
  credentials: [] as { label: string; value: string }[],
};
