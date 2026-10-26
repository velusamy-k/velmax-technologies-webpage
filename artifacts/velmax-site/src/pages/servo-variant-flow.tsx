import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, Redirect, useParams } from 'wouter';
import { BrandMark } from '@/components/brand-mark';
import { ServoFlowMarquee } from '@/components/servo-flow-marquee';
import { getServoVariant, servoVariantPath, siteConfig } from '@/site-config';
import '../site.css';
import '../servo-flow.css';

export default function ServoVariantFlowPage() {
  const params = useParams<{ variantId: string }>();
  const variantId = params.variantId ?? '';
  const variant = getServoVariant(variantId);

  if (!variant) {
    return <Redirect to="/#servo-stabilizers" />;
  }

  const servoProduct = siteConfig.products.find((item) => item.id === 'servo-stabilizers');
  const titleLead = servoProduct?.name.split(' ').slice(0, -1).join(' ') ?? 'Servo';
  const titleEm = servoProduct?.name.split(' ').slice(-1)[0] ?? 'stabilizers';

  return (
    <div className="servo-flow-page">
      <header className="servo-flow-header">
        <BrandMark homeHref="/" />
        <a className="servo-flow-back" href="/#servo-stabilizers" data-testid="link-servo-flow-back">
          <ArrowLeft size={14} aria-hidden="true" />
          Back to Servo stabilizers
        </a>
      </header>

      <div className="servo-flow-main">
        <div className="servo-flow-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            {servoProduct?.eyebrow ?? 'Voltage conditioning'}
          </div>
          <h1>
            {titleLead}
            <br />
            <em>{titleEm}</em>
          </h1>
          <p className="servo-flow-lead">{variant.label}</p>
          <p className="servo-flow-list-heading">WHAT WE MANUFACTURE</p>
          <nav aria-label="Servo stabilizer configurations">
          <ul className="servo-flow-manufacturing-list">
            {siteConfig.servoManufacturingList.map((item, index) => {
              const isActive = item.id === variantId;
              return (
                <li key={item.id}>
                  <Link
                    href={servoVariantPath(item.id)}
                    className={`servo-flow-manufacturing-item ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                    data-testid={`link-servo-flow-option-${item.id}`}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <p>{item.label}</p>
                      {item.detail ? <small>{item.detail}</small> : null}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          </nav>
        </div>

        <div className="servo-flow-visual">
          <ServoFlowMarquee />
          <p className="servo-flow-footer-note">
            Concept imagery for layout only. Approved product photography will replace placeholders before launch.
          </p>
        </div>
      </div>

      <footer className="servo-flow-footer">
        <p className="servo-flow-footer-note">
          Technical specifications and model availability are confirmed on enquiry.
        </p>
        <a
          className="button button-outline"
          href="/#contact"
          data-testid="link-enquire-servo-flow"
        >
          Enquire about Servo stabilizers <ArrowUpRight size={15} />
        </a>
      </footer>
    </div>
  );
}
