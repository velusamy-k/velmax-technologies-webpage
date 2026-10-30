export type ServoSlideshowImage = {
  src: string;
  caption: string;
  alt: string;
};

const WEBPAGE_IMG_DIR = 'WEBPAGE IMG';

function publicWebpageImage(filename: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/images/${encodeURIComponent(WEBPAGE_IMG_DIR)}/${encodeURIComponent(filename)}`;
}

function slideshowEntry(filename: string): ServoSlideshowImage {
  const caption = filename.replace(/\.(png|jpe?g)$/i, '');
  return {
    src: publicWebpageImage(filename),
    caption,
    alt: caption,
  };
}

/** Shared gallery for all /products/servo-stabilizers/:variantId pages. */
export const servoSlideshowImages: ServoSlideshowImage[] = [
  slideshowEntry('10 KVA and 12 KVA Servo Stabilizers.png'),
  slideshowEntry('15 KVA 3 PHASE SERVO STABILIZER.png'),
  slideshowEntry('20 KVA Air Cooled Servo Stabilizer.png'),
  slideshowEntry('22.5 KVA Clean Energy Stabilizer.png'),
  slideshowEntry('45 KVA Air-Cooled Servo Stabilizer.png'),
  slideshowEntry('100 KVA Three-Phase Servo Stabilizer.png'),
  slideshowEntry('150 KVA Oil-Cooled Servo Stabilizer.png'),
  slideshowEntry('20 Amp Three-Phase Transformer Ad.png'),
  slideshowEntry('3 KVA 5KVA SINGLE PHASE SERVO STABILIZER.jpeg'),
  slideshowEntry('30 KVA 3 PHASE AIR COOLED SERVO STABILIZER.jpeg'),
];
