import { useEffect, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { productOptions, type ProductOptionValue } from '@/lib/enquiry-product-options';
import {
  buildWhatsAppEnquiryUrl,
  clearEnquiryPrefill,
  type EnquiryPrefill,
  type EnquiryProductValue,
} from '@/lib/whatsapp-enquiry';

function messageFromPrefill(prefill: EnquiryPrefill): string {
  return `I am interested in the ${prefill.model} (${prefill.configuration}). Please share specifications and availability.`;
}

type BusinessEnquiryFormProps = {
  prefill?: EnquiryPrefill | null;
  onPrefillChange?: (prefill: EnquiryPrefill | null) => void;
  defaultProduct?: ProductOptionValue;
  lockProductFamily?: boolean;
  selectedProduct?: ProductOptionValue;
  onSelectedProductChange?: (product: ProductOptionValue) => void;
  clearSessionOnSubmit?: boolean;
};

export function BusinessEnquiryForm({
  prefill = null,
  onPrefillChange,
  defaultProduct = 'general',
  lockProductFamily = false,
  selectedProduct: selectedProductProp,
  onSelectedProductChange,
  clearSessionOnSubmit = true,
}: BusinessEnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedProductInternal, setSelectedProductInternal] = useState<ProductOptionValue>(defaultProduct);
  const [message, setMessage] = useState('');

  const selectedProduct = selectedProductProp ?? selectedProductInternal;
  const setSelectedProduct = (value: ProductOptionValue) => {
    onSelectedProductChange?.(value);
    if (selectedProductProp === undefined) {
      setSelectedProductInternal(value);
    }
  };

  useEffect(() => {
    if (prefill) {
      setSelectedProduct(prefill.product);
      setMessage(messageFromPrefill(prefill));
    }
  }, [prefill]);

  const clearPrefillAndResetForm = () => {
    if (clearSessionOnSubmit) {
      clearEnquiryPrefill();
    }
    onPrefillChange?.(null);
    setMessage('');
    setSelectedProduct(defaultProduct);
    setSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const company = String(form.get('company') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const phone = String(form.get('phone') ?? '').trim();
    const product = selectedProduct as EnquiryProductValue;
    const messageText = message.trim();
    if (!name || !email || phone.length < 5) return;

    const whatsAppUrl = buildWhatsAppEnquiryUrl({
      name,
      ...(company ? { company } : {}),
      email,
      phone,
      product,
      ...(prefill?.configuration ? { configuration: prefill.configuration } : {}),
      ...(prefill?.model ? { model: prefill.model } : {}),
      ...(messageText ? { message: messageText } : {}),
    });

    window.open(whatsAppUrl, '_blank', 'noopener,noreferrer');
    if (clearSessionOnSubmit) {
      clearEnquiryPrefill();
    }
    onPrefillChange?.(null);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="form-success" role="status" data-testid="status-enquiry-success">
        <span className="success-icon">
          <Check size={21} />
        </span>
        <span className="eyebrow">WHATSAPP OPENED</span>
        <h3>
          Thank you.
          <br />
          <em>Continue in WhatsApp.</em>
        </h3>
        <p>
          Your enquiry details were prepared in WhatsApp. Send the message there to reach our team.
        </p>
        <button className="text-link" type="button" onClick={clearPrefillAndResetForm}>
          Send another enquiry <ArrowUpRight size={15} />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="form-heading">
        <span>BUSINESS ENQUIRY</span>
        <span>Fields marked * are required</span>
      </div>
      <form onSubmit={handleSubmit} className="enquiry-form">
        <div className="form-row">
          <label>
            Name *
            <input
              name="name"
              required
              maxLength={120}
              autoComplete="name"
              placeholder="Your name"
              data-testid="input-name"
            />
          </label>
          <label>
            Company
            <input
              name="company"
              maxLength={160}
              autoComplete="organization"
              placeholder="Company name"
              data-testid="input-company"
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Work email *
            <input
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              placeholder="you@company.com"
              data-testid="input-email"
            />
          </label>
          <label>
            Phone *
            <input
              name="phone"
              type="tel"
              required
              minLength={5}
              maxLength={32}
              autoComplete="tel"
              placeholder="Enter your Valid Mobile number"
              data-testid="input-phone"
            />
          </label>
        </div>
        {prefill ? (
          <div className="enquiry-prefill-summary" data-testid="enquiry-prefill-summary">
            <span className="enquiry-prefill-label">Product of interest (from your selection)</span>
            <p className="enquiry-prefill-product">
              {productOptions.find((o) => o.value === prefill.product)?.label ?? 'Servo stabilizers'}
            </p>
            <p className="enquiry-prefill-detail">
              <strong>Configuration:</strong> {prefill.configuration}
            </p>
            <p className="enquiry-prefill-detail">
              <strong>Model:</strong> {prefill.model}
            </p>
            <button
              type="button"
              className="enquiry-prefill-clear text-link"
              onClick={clearPrefillAndResetForm}
            >
              Change product
            </button>
          </div>
        ) : null}
        <label>
          Product family
          <select
            name="product"
            value={selectedProduct}
            disabled={lockProductFamily}
            onChange={(event) =>
              setSelectedProduct(event.currentTarget.value as ProductOptionValue)
            }
            data-testid="select-product"
          >
            {productOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          How can we help?
          <textarea
            name="message"
            value={message}
            onChange={(event) => setMessage(event.currentTarget.value)}
            maxLength={5000}
            rows={3}
            placeholder="A little about your power requirement…"
            data-testid="input-message"
          />
        </label>
        <button className="button button-orange form-submit" type="submit" data-testid="button-submit-enquiry">
          <span className="form-submit-label">
            Send enquiry
            <FaWhatsapp size={17} aria-hidden="true" />
            <ArrowUpRight size={15} aria-hidden="true" />
          </span>
        </button>
        <p className="form-privacy">
          Submitting opens WhatsApp with your enquiry pre-filled for +91 9025277770. Add Velmax’s approved
          privacy and retention terms before launch.
        </p>
      </form>
    </>
  );
}
