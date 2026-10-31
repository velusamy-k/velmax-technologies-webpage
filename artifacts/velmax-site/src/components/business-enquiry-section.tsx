import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { BusinessEnquiryForm } from '@/components/business-enquiry-form';
import type { ProductOptionValue } from '@/lib/enquiry-product-options';
import { buildWhatsAppClickToChatUrl, type EnquiryPrefill } from '@/lib/whatsapp-enquiry';
import { siteConfig } from '@/site-config';

const whatsAppIntroUrl = buildWhatsAppClickToChatUrl(
  'Hello Velmax Technologies,\n\nI would like to enquire about your power equipment.',
);

type BusinessEnquirySectionProps = {
  id?: string;
  sectionClassName?: string;
  showHomeContactHeader?: boolean;
  prefill?: EnquiryPrefill | null;
  onPrefillChange?: (prefill: EnquiryPrefill | null) => void;
  defaultProduct?: ProductOptionValue;
  lockProductFamily?: boolean;
  selectedProduct?: ProductOptionValue;
  onSelectedProductChange?: (product: ProductOptionValue) => void;
  clearSessionOnSubmit?: boolean;
};

export function BusinessEnquirySection({
  id,
  sectionClassName = 'contact',
  showHomeContactHeader = false,
  prefill = null,
  onPrefillChange,
  defaultProduct = 'general',
  lockProductFamily = false,
  selectedProduct,
  onSelectedProductChange,
  clearSessionOnSubmit = true,
}: BusinessEnquirySectionProps) {
  const contact = siteConfig.company.contact;
  const whatsAppContactHref = contact.whatsapp ?? whatsAppIntroUrl;

  return (
    <section className={sectionClassName} id={id}>
      {showHomeContactHeader ? (
        <div className="contact-top">
          <span className="eyebrow">
            <span className="eyebrow-line" /> START A CONVERSATION
          </span>
          <span className="section-index">LET&apos;S TALK POWER</span>
        </div>
      ) : (
        <div className="contact-top servo-enquiry-section-top">
          <span className="eyebrow">
            <span className="eyebrow-line" /> BUSINESS ENQUIRY
          </span>
          <span className="section-index">SERVO STABILIZERS</span>
        </div>
      )}
      <div className="contact-layout">
        <div className="contact-copy">
          <h2>
            Let&apos;s power
            <br />
            <em>your next move.</em>
          </h2>
          <p>Tell us about your power requirements. Our team will help you explore the right solution.</p>
          <div className="contact-detail-list">
            {contact.phones.length > 0 && (
              <div className="contact-detail-phones">
                <span className="contact-detail-icon" aria-hidden="true">
                  <Phone size={18} />
                </span>
                <span>PHONE / MOBILE</span>
                <div className="contact-phone-values">
                  {contact.phones.map((number) => (
                    <a href={`tel:${number.replace(/\s/g, '')}`} key={number}>
                      {number}
                      <ArrowUpRight size={16} />
                    </a>
                  ))}
                </div>
              </div>
            )}
            {contact.email && (
              <a className="contact-detail-row" href={`mailto:${contact.email}`}>
                <span className="contact-detail-icon" aria-hidden="true">
                  <Mail size={18} />
                </span>
                <span>EMAIL</span>
                {contact.email}
                <ArrowUpRight size={16} />
              </a>
            )}
            {contact.address && (
              <div>
                <span>ADDRESS</span>
                {contact.address}
              </div>
            )}
            {!contact.email && contact.phones.length === 0 && !contact.address && (
              <div className="contact-details-placeholder">
                <span>CONTACT DETAILS</span>
                <p>Business email, phone and address will appear here once confirmed.</p>
              </div>
            )}
            <a className="contact-detail-row" href={whatsAppContactHref} target="_blank" rel="noreferrer">
              <span className="contact-detail-icon" aria-hidden="true">
                <FaWhatsapp size={18} />
              </span>
              <span>WHATSAPP</span>
              Message our team
              <ArrowUpRight size={16} />
            </a>
            {contact.mapUrl && (
              <a href={contact.mapUrl} target="_blank" rel="noreferrer">
                <span>LOCATION</span>
                View on map
                <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </div>
        <div className="enquiry-panel">
          <BusinessEnquiryForm
            prefill={prefill}
            onPrefillChange={onPrefillChange}
            defaultProduct={defaultProduct}
            lockProductFamily={lockProductFamily}
            selectedProduct={selectedProduct}
            onSelectedProductChange={onSelectedProductChange}
            clearSessionOnSubmit={clearSessionOnSubmit}
          />
        </div>
      </div>
      <div className="contact-orbit" aria-hidden="true" />
    </section>
  );
}

export { productOptions } from '@/lib/enquiry-product-options';
