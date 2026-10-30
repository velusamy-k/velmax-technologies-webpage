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

export type ServoManufacturingListItem = {
  id: string;
  label: string;
  detail?: string;
};

export const servoVariantPath = (variantId: string) =>
  `/products/servo-stabilizers/${variantId}`;

export type ResolvedServoVariant = ServoModelVariant & {
  groupId: string;
  groupLabel: string;
};

function getServoProduct() {
  const product = siteConfig.products.find((item) => item.id === 'servo-stabilizers');
  return product && 'modelGroups' in product ? product : undefined;
}

export function getServoVariant(variantId: string): ResolvedServoVariant | undefined {
  const product = getServoProduct();
  if (!product?.modelGroups) return undefined;
  for (const group of product.modelGroups) {
    const variant = group.variants.find((item) => item.id === variantId);
    if (variant) {
      return {
        ...variant,
        groupId: group.id,
        groupLabel: group.label,
      };
    }
  }
  return undefined;
}

export function getAllServoVariants(): ResolvedServoVariant[] {
  const product = getServoProduct();
  if (!product?.modelGroups) return [];
  return product.modelGroups.flatMap((group) =>
    group.variants.map((variant) => ({
      ...variant,
      groupId: group.id,
      groupLabel: group.label,
    })),
  );
}

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
      /** Click-to-chat for +91 9025277770; form uses the same number via whatsapp-enquiry.ts */
      whatsapp: 'https://wa.me/919025277770' as string | null,
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
              href: servoVariantPath('air-1ph'),
            },
            {
              id: 'air-3ph',
              label: 'Air Cooled 3 Phase Input & 3 Phase Output.',
              href: servoVariantPath('air-3ph'),
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
              href: servoVariantPath('oil-1ph'),
            },
            {
              id: 'oil-3ph',
              label: 'Oil Cooled 3 Phase Input & 3 Phase Output.',
              href: servoVariantPath('oil-3ph'),
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
      benefits: [],
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
      benefits: [],
    },
  ] satisfies SiteProduct[],
  // Replace placeholder detail lines with verified manufacturing copy when supplied.
  servoManufacturingList: [
    {
      id: 'air-1ph',
      label: 'Air Cooled — Single phase input & single phase output',
    },
    {
      id: 'air-3ph',
      label: 'Air Cooled — 3 phase input & 3 phase output',
    },
    {
      id: 'oil-1ph',
      label: 'Oil Cooled — Single phase input & single phase output',
    },
    {
      id: 'oil-3ph',
      label: 'Oil Cooled — 3 phase input & 3 phase output',
    },
  ] satisfies ServoManufacturingListItem[],
  // Empty until customer applications have been verified by the company.
  industries: [] as { name: string; description: string }[],
  // Empty until certificates, testimonials or measurable claims are verified.
  credentials: [] as { label: string; value: string }[],
};
