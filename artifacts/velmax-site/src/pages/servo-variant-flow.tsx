import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, Redirect, useParams } from 'wouter';
import { BrandMark } from '@/components/brand-mark';
import { BusinessEnquirySection } from '@/components/business-enquiry-section';
import { ServoFlowMarquee } from '@/components/servo-flow-marquee';
import { ServoVariantCatalog } from '@/components/servo-variant-catalog';
import type { EnquiryPrefill } from '@/lib/whatsapp-enquiry';
import type { ServoVariantId } from '@/servo-variant-catalog';
import { getServoVariant, servoVariantPath, siteConfig } from '@/site-config';
import '../site.css';
import '../servo-flow.css';

const SERVO_ENQUIRY_SECTION_ID = 'servo-business-enquiry';

function scrollToServoEnquiry() {
  document.getElementById(SERVO_ENQUIRY_SECTION_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function ServoVariantFlowPage() {
  const params = useParams<{ variantId: string }>();
  const variantId = params.variantId ?? '';
  const variant = getServoVariant(variantId);
  const [enquiryPrefill, setEnquiryPrefill] = useState<EnquiryPrefill | null>(null);

  useEffect(() => {
    setEnquiryPrefill(null);
  }, [variantId]);

  if (!variant) {
    return <Redirect to="/#servo-stabilizers" />;
  }

  const servoProduct = siteConfig.products.find((item) => item.id === 'servo-stabilizers');
  const titleLead = servoProduct?.name.split(' ').slice(0, -1).join(' ') ?? 'Servo';
  const titleEm = servoProduct?.name.split(' ').slice(-1)[0] ?? 'stabilizers';

  const handleSelectModel = (model: string) => {
    setEnquiryPrefill({
      product: 'servo-stabilizers',
      configuration: variant.label,
      model,
    });
    requestAnimationFrame(() => scrollToServoEnquiry());
  };

  const handleFooterEnquire = () => {
    setEnquiryPrefill({
      product: 'servo-stabilizers',
      configuration: variant.label,
      model: 'General line enquiry — model to be confirmed',
    });
    requestAnimationFrame(() => scrollToServoEnquiry());
  };

  return (
    <div className="servo-flow-page">
      <header className="servo-flow-header">
        <BrandMark homeHref="/" light />
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
            {siteConfig.servoManufacturingList.map((item) => {
              const isActive = item.id === variantId;
              return (
                <li key={item.id}>
                  <Link
                    href={servoVariantPath(item.id)}
                    className={`servo-flow-manufacturing-item ${isActive ? 'is-active' : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                    data-testid={`link-servo-flow-option-${item.id}`}
                  >
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
          <ServoVariantCatalog
            variantId={variantId as ServoVariantId}
            configuration={variant.label}
            onSelectModel={handleSelectModel}
          />
        </div>

        <div className="servo-flow-visual">
          <ServoFlowMarquee />
          <p className="servo-flow-footer-note">
            Representative models from our manufacturing range. Specifications and availability are confirmed on enquiry.
          </p>
        </div>
      </div>

      <footer className="servo-flow-footer">
        <p className="servo-flow-footer-note">
          Technical specifications and model availability are confirmed on enquiry.
        </p>
        <button
          type="button"
          className="button button-outline"
          data-testid="link-enquire-servo-flow"
          onClick={handleFooterEnquire}
        >
          Enquire about Servo stabilizers <ArrowUpRight size={15} />
        </button>
      </footer>

      <BusinessEnquirySection
        id={SERVO_ENQUIRY_SECTION_ID}
        sectionClassName="servo-flow-enquiry contact"
        prefill={enquiryPrefill}
        onPrefillChange={setEnquiryPrefill}
        defaultProduct="servo-stabilizers"
        lockProductFamily
        clearSessionOnSubmit={false}
      />
    </div>
  );
}
