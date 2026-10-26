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
      <span className="brand-symbol" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="brand-wordmark">
        <strong>VELMAX</strong>
        <small>TECHNOLOGIES</small>
      </span>
    </a>
  );
}
