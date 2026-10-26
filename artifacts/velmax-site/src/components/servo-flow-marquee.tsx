const SERVO_IMAGE = '/images/concept-servo.jpg';
const CARD_COUNT = 8;

function FlowCard({ decorative }: { decorative?: boolean }) {
  return (
    <figure className="servo-flow-card" aria-hidden={decorative}>
      <img
        src={SERVO_IMAGE}
        alt={decorative ? '' : 'Concept image of a servo stabilizer cabinet'}
        loading="lazy"
      />
      <figcaption>Servo stabilizer</figcaption>
    </figure>
  );
}

function MarqueeTrack({ reverse = false }: { reverse?: boolean }) {
  const cards = Array.from({ length: CARD_COUNT }, (_, index) => index);
  return (
    <div className={`servo-flow-track-wrap ${reverse ? 'servo-flow-track-wrap--reverse' : ''}`}>
      <div className="servo-flow-track" aria-hidden="true">
        {cards.map((index) => (
          <FlowCard key={`a-${index}`} decorative={index > 0} />
        ))}
        {cards.map((index) => (
          <FlowCard key={`b-${index}`} decorative />
        ))}
      </div>
    </div>
  );
}

export function ServoFlowMarquee() {
  return (
    <div className="servo-flow-marquee" aria-label="Servo stabilizer imagery">
      <div className="servo-flow-marquee-live">
        <MarqueeTrack />
        <MarqueeTrack reverse />
      </div>
      <div className="servo-flow-marquee-static" aria-hidden="true">
        {Array.from({ length: 3 }, (_, index) => (
          <FlowCard key={index} decorative={index > 0} />
        ))}
      </div>
    </div>
  );
}
