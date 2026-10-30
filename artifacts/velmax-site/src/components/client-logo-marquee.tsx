import { clientLogos, type ClientLogo } from '@/client-logos';

function LogoCard({ src, alt, decorative }: ClientLogo & { decorative?: boolean }) {
  return (
    <div className="client-logo-card" aria-hidden={decorative}>
      <img src={src} alt={decorative ? '' : alt} loading="lazy" decoding="async" />
    </div>
  );
}

export function ClientLogoMarquee() {
  const sequence = [...clientLogos, ...clientLogos];

  return (
    <div className="client-logo-marquee" aria-label="Partner and client logos">
      <div className="client-logo-marquee-live">
        <div className="client-logo-track-wrap">
          <div className="client-logo-track" aria-hidden="true">
            {sequence.map((item, index) => (
              <LogoCard key={`${item.src}-${index}`} {...item} decorative={index !== 0} />
            ))}
          </div>
        </div>
      </div>
      <div className="client-logo-marquee-static">
        {clientLogos.map((item) => (
          <LogoCard key={item.src} {...item} />
        ))}
      </div>
    </div>
  );
}
