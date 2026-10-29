export type ServoSlideshowImage = {
  src: string;
  caption: string;
  alt: string;
};

const WEBPAGE_IMG_DIR = 'WEBPAGE IMG';

function publicWebpageImage(filename: string): string {
  return `/images/${encodeURIComponent(WEBPAGE_IMG_DIR)}/${encodeURIComponent(filename)}`;
}

function slideshowEntry(filename: string): ServoSlideshowImage {
  const caption = filename.replace(/\.png$/i, '');
  return {
    src: publicWebpageImage(filename),
    caption,
    alt: caption,
  };
}

/** Shared gallery for all /products/servo-stabilizers/:variantId pages. */
export const servoSlideshowImages: ServoSlideshowImage[] = [
  slideshowEntry('10 KVA & 12 KVA Servo Stabilizers.png'),
  slideshowEntry('15 KVA 3 PHASE SERVO STABILIZER.png'),
  slideshowEntry('20 KVA Air Cooled Servo Stabilizer.png'),
  slideshowEntry('22.5 KVA Clean Energy Stabilizer.png'),
  slideshowEntry('45 KVA Air-Cooled Servo Stabilizer.png'),
  slideshowEntry('100 KVA Three-Phase Servo Stabilizer.png'),
  slideshowEntry('150 KVA Oil-Cooled Servo Stabilizer.png'),
  slideshowEntry('20 Amp Three-Phase Transformer Ad.png'),
];
