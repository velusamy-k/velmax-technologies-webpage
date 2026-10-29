import type { ServoSlideshowImage } from '@/servo-slideshow';
import { servoSlideshowImages } from '@/servo-slideshow';

type FlowCardProps = ServoSlideshowImage & {
  decorative?: boolean;
};

function FlowCard({ src, caption, alt, decorative }: FlowCardProps) {
  return (
    <figure className="servo-flow-card" aria-hidden={decorative}>
      <img src={src} alt={decorative ? '' : alt} loading="lazy" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

type MarqueeTrackProps = {
  items: ServoSlideshowImage[];
  reverse?: boolean;
  primaryAccessible?: boolean;
};

function MarqueeTrack({ items, reverse = false, primaryAccessible = false }: MarqueeTrackProps) {
  const ordered = reverse ? [...items].reverse() : items;
  const sequence = [...ordered, ...ordered];

  return (
    <div className={`servo-flow-track-wrap ${reverse ? 'servo-flow-track-wrap--reverse' : ''}`}>
      <div className="servo-flow-track" aria-hidden="true">
        {sequence.map((item, index) => {
          const isPrimary = primaryAccessible && index === 0;
          return (
            <FlowCard
              key={`${item.src}-${index}`}
              {...item}
              decorative={!isPrimary}
            />
          );
        })}
      </div>
    </div>
  );
}

export function ServoFlowMarquee() {
  const items = servoSlideshowImages;

  return (
    <div className="servo-flow-marquee" aria-label="Servo stabilizer imagery">
      <div className="servo-flow-marquee-live">
        <MarqueeTrack items={items} primaryAccessible />
        <MarqueeTrack items={items} reverse />
      </div>
      <div className="servo-flow-marquee-static" aria-hidden="true">
        {items.map((item, index) => (
          <FlowCard key={item.src} {...item} decorative={index > 0} />
        ))}
      </div>
    </div>
  );
}
