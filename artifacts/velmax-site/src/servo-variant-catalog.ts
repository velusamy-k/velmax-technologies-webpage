export type ServoVariantId = 'air-1ph' | 'air-3ph' | 'oil-1ph' | 'oil-3ph';

export type ServoCatalogSection = {
  title?: string;
  models: string[];
};

export const servoVariantCatalog: Record<ServoVariantId, ServoCatalogSection[]> = {
  'air-1ph': [
    {
      title: 'WIDE RANGE',
      models: [
        '3 KVA SERVO - WIDE RANGE',
        '5 KVA SERVO - WIDE RANGE',
        '7.5 KVA SERVO - WIDE RANGE',
        '10 KVA SERVO - WIDE RANGE',
        '15 KVA SERVO - WIDE RANGE',
      ],
    },
    {
      title: 'DUAL TYPE',
      models: ['1 KVA SERVO - DUAL TYPE', '2 KVA SERVO - DUAL TYPE', '3 KVA SERVO - DUAL TYPE'],
    },
    {
      title: 'NORMAL',
      models: [
        '3 KVA SERVO - NORMAL',
        '5 KVA SERVO - NORMAL',
        '7.5 KVA SERVO - NORMAL',
        '10 KVA SERVO - NORMAL',
        '15 KVA SERVO - NORMAL',
      ],
    },
  ],
  'air-3ph': [
    {
      title: 'WIDE RANGE',
      models: [
        '10 KVA SERVO - WIDE RANGE',
        '12 KVA SERVO - WIDE RANGE',
        '15 KVA SERVO - WIDE RANGE',
        '22 KVA SERVO - WIDE RANGE',
        '25 KVA SERVO - WIDE RANGE',
        '30 KVA SERVO - WIDE RANGE',
        '40 KVA SERVO - WIDE RANGE',
        '45 KVA SERVO - WIDE RANGE',
        '60 KVA SERVO - WIDE RANGE',
        '65 KVA SERVO - WIDE RANGE',
        '75 KVA SERVO - WIDE RANGE',
        '90 KVA SERVO - WIDE RANGE',
        '100 KVA SERVO - WIDE RANGE',
        '125 KVA SERVO - WIDE RANGE',
        '150 KVA SERVO - WIDE RANGE',
      ],
    },
    {
      title: 'NORMAL',
      models: [
        '10 KVA SERVO - NORMAL',
        '12 KVA SERVO - NORMAL',
        '15 KVA SERVO - NORMAL',
        '22 KVA SERVO - NORMAL',
        '25 KVA SERVO - NORMAL',
        '30 KVA SERVO - NORMAL',
        '40 KVA SERVO - NORMAL',
        '45 KVA SERVO - NORMAL',
        '60 KVA SERVO - NORMAL',
        '65 KVA SERVO - NORMAL',
        '75 KVA SERVO - NORMAL',
        '90 KVA SERVO - NORMAL',
        '100 KVA SERVO - NORMAL',
        '125 KVA SERVO - NORMAL',
        '150 KVA SERVO - NORMAL',
      ],
    },
  ],
  'oil-1ph': [
    {
      models: [
        '7.5 KVA SERVO STABILIZER',
        '10 KVA SERVO STABILIZER',
        '15 KVA SERVO STABILIZER',
      ],
    },
  ],
  'oil-3ph': [
    {
      models: [
        '10 KVA SERVO STABILIZER',
        '12 KVA SERVO STABILIZER',
        '15 KVA SERVO STABILIZER',
        '22 KVA SERVO STABILIZER',
        '25 KVA SERVO STABILIZER',
        '30 KVA SERVO STABILIZER',
        '40 KVA SERVO STABILIZER',
        '45 KVA SERVO STABILIZER',
        '60 KVA SERVO STABILIZER',
        '65 KVA SERVO STABILIZER',
        '75 KVA SERVO STABILIZER',
        '90 KVA SERVO STABILIZER',
        '100 KVA SERVO STABILIZER',
        '125 KVA SERVO STABILIZER',
        '150 KVA SERVO STABILIZER',
        'UPTO 1000 KVA STABILIZERS',
      ],
    },
  ],
};

export function getServoVariantCatalog(variantId: string): ServoCatalogSection[] | undefined {
  if (variantId in servoVariantCatalog) {
    return servoVariantCatalog[variantId as ServoVariantId];
  }
  return undefined;
}
