import { velmaxLogoSrc } from '@/brand-assets';

type BrandMarkProps = {
  light?: boolean;
  homeHref?: string;
};

export function BrandMark({ light = false, homeHref = '#top' }: BrandMarkProps) {
  return (
    <a
      href={homeHref}
      className={`brand ${light ? 'brand-light' : ''}`}
      aria-label="Velmax Technologies, home"
      data-testid="link-home"
    >
      <img
        src={velmaxLogoSrc}
        alt=""
        className="brand-emblem"
        aria-hidden="true"
        width={36}
        height={36}
        decoding="async"
      />
      <span className="brand-wordmark">
        <strong>VELMAX</strong>
        <small>TECHNOLOGIES</small>
      </span>
    </a>
  );
}
