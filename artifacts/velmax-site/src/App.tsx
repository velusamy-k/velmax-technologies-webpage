import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  MoveUpRight,
  X,
} from 'lucide-react';
import { BrandMark } from './components/brand-mark';
import { BusinessEnquirySection, productOptions } from './components/business-enquiry-section';
import { ClientLogoMarquee } from './components/client-logo-marquee';
import { ServoModelGroups } from './components/servo-model-groups';
import type { ProductOptionValue } from './lib/enquiry-product-options';
import {
  clearEnquiryPrefill,
  readEnquiryPrefill,
  type EnquiryPrefill,
} from './lib/whatsapp-enquiry';
import { Route, Switch } from 'wouter';
import ServoVariantFlowPage from './pages/servo-variant-flow';
import { siteConfig } from './site-config';
import './site.css';

function ProductLink({ id, label, onClick }: { id: string; label: string; onClick?: () => void }) {
  return <a href={`#${id}`} onClick={onClick} data-testid={`link-product-${id}`}>{label}<ArrowUpRight size={13} /></a>;
}

export function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductOptionValue>('general');
  const [enquiryPrefill, setEnquiryPrefill] = useState<EnquiryPrefill | null>(null);
  const contact = siteConfig.company.contact;

  const applyEnquiryPrefillFromStorage = () => {
    const prefill = readEnquiryPrefill();
    if (!prefill) return;
    setEnquiryPrefill(prefill);
    setSelectedProduct(prefill.product);
  };

  useEffect(() => {
    applyEnquiryPrefillFromStorage();

    const onHashChange = () => {
      if (window.location.hash === '#contact') {
        applyEnquiryPrefillFromStorage();
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    setProductMenuOpen(false);
  };

  const handlePrefillChange = (prefill: EnquiryPrefill | null) => {
    setEnquiryPrefill(prefill);
    if (!prefill) {
      clearEnquiryPrefill();
    }
  };

  return (
    <main id="top">
      {siteConfig.company.announcement && <div className="announcement">{siteConfig.company.announcement}</div>}
      <header className="site-header">
        <div className="header-inner">
          <BrandMark />
          <nav className={`desktop-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
            <div className="nav-products">
              <button className="nav-item products-toggle" onClick={() => setProductMenuOpen(!productMenuOpen)} aria-expanded={productMenuOpen} data-testid="button-products-menu">Products <ChevronDown size={13} /></button>
              {productMenuOpen && <div className="product-dropdown">{siteConfig.products.map((product) => <ProductLink key={product.id} id={product.id} label={product.shortName} onClick={closeMenu} />)}</div>}
            </div>
            <a href="#approach" className="nav-item" onClick={closeMenu} data-testid="link-about">About</a>
            {siteConfig.industries.length > 0 && <a href="#industries" className="nav-item" onClick={closeMenu}>Industries</a>}
            <a href="#contact" className="nav-item" onClick={closeMenu} data-testid="link-contact-nav">Contact</a>
          </nav>
          <a className="header-cta" href="#contact" data-testid="link-enquire-top">Enquire now <ArrowUpRight size={14} /></a>
          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} data-testid="button-mobile-menu">{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="eyebrow-line" /> POWER EQUIPMENT / BUSINESS ENQUIRIES</div>
          <h1 id="hero-title">Powering<br /><em>every</em> possibility.</h1>
          <p>Power systems built around what your business needs to keep moving.</p>
          <div className="hero-actions">
            <a href="#products" className="button button-orange" data-testid="link-explore-products">Explore our products <ArrowDownRight size={16} /></a>
            <a href="#contact" className="button button-text" data-testid="link-contact-team">Talk to our team <ArrowRight size={15} /></a>
          </div>
          <div className="hero-footnote"><span className="pulse-dot" /> MANUFACTURING POWER EQUIPMENT</div>
        </div>
        <div className="hero-art" aria-label="Generated concept imagery representing Velmax power equipment">
          <div className="hero-image-wrap"><img src="/images/concept-servo.jpg" alt="Concept image only: unbranded power equipment cabinet, not an actual Velmax product" fetchPriority="high" /></div>
          <div className="hero-image-caption"><span>CONCEPT VISUAL</span><span>01 / 03</span></div>
          <div className="hero-stamp"><span>ENGINEERED</span><b>FOR</b><span>CONTINUITY</span><i /></div>
        </div>
        <a href="#manifesto" className="scroll-cue" aria-label="Scroll to continue"><span>SCROLL TO DISCOVER</span><ArrowDown size={15} /></a>
        <div className="hero-index">01 — 04</div>
      </section>

      <section className="manifesto" id="manifesto">
        <div className="manifesto-label reveal"><span>01 / A BETTER KIND OF POWER</span><span>BUILT FOR THE REAL WORLD</span></div>
        <div className="manifesto-content">
          <p className="manifesto-title reveal">Power is not a product.<br /><em>It’s what makes everything else possible.</em></p>
          <div className="manifesto-note reveal"><span className="orange-rule" /><p>From voltage regulation to backup and continuity, the right equipment starts with understanding the work it has to do.</p></div>
        </div>
        <div className="manifesto-bottom"><span>VELMAX TECHNOLOGIES</span><span>DESIGNED AROUND YOUR REQUIREMENTS <ArrowDownRight size={14} /></span></div>
      </section>

      <section className="product-intro" id="products">
        <div className="section-top reveal"><span className="eyebrow"><span className="eyebrow-line" /> THREE PRODUCT FAMILIES</span><span className="section-index">02 — 04</span></div>
        <div className="product-intro-heading reveal"><h2>One need.<br /><em>Many ways forward.</em></h2><p>Explore the equipment we manufacture. Product details and specifications are shared directly, based on your requirements.</p></div>
        <div className="product-rail">
          {siteConfig.products.map((product, index) => (
            <a className={`rail-item rail-${index + 1} reveal`} href={`#${product.id}`} key={product.id} data-testid={`link-product-card-${product.id}`}>
              <div className="rail-image"><img src={product.image} alt={product.imageAlt} loading="lazy" /><span className="rail-arrow"><ArrowUpRight size={18} /></span></div>
              <div className="rail-meta"><span>{product.number} / {product.eyebrow}</span><span>EXPLORE <ArrowRight size={12} /></span></div>
              <h3>{product.shortName}</h3>
            </a>
          ))}
        </div>
      </section>

      <section className="product-stories" aria-label="Product details">
        {siteConfig.products.map((product, index) => (
          <article className={`product-story story-${index + 1}`} id={product.id} key={product.id}>
            <div className="story-visual">
              <div className="story-image"><img src={product.image} alt={product.imageAlt} loading="lazy" /><div className="story-image-shade" /></div>
              <span className="story-watermark">{product.number}</span>
            </div>
            <div className="story-copy">
              <div className="eyebrow"><span className="eyebrow-line" /> {product.eyebrow}</div>
              <span className="story-number">{product.number} / 03</span>
              <h2>{product.name.split(' ').slice(0, -1).join(' ')}<br /><em>{product.name.split(' ').slice(-1)}</em></h2>
              <p className="story-description">{product.description}</p>
              {'modelGroups' in product && product.modelGroups ? (
                <ServoModelGroups groups={product.modelGroups} />
              ) : product.benefits.length > 0 ? (
                <div className="story-benefits">{product.benefits.map((benefit, benefitIndex) => <div className="benefit-row" key={benefit}><span>0{benefitIndex + 1}</span><p>{benefit}</p><ArrowUpRight size={14} /></div>)}</div>
              ) : null}
               <a href="#contact" onClick={() => { setSelectedProduct(product.id as ProductOptionValue); closeMenu(); }} className="button button-outline" data-testid={`link-enquire-${product.id}`}>Enquire about {product.shortName} <ArrowUpRight size={15} /></a>
              <span className="spec-note">Technical specifications and model availability are confirmed on enquiry.</span>
            </div>
          </article>
        ))}
      </section>

      <section className="approach" id="approach">
        <div className="approach-top reveal"><span className="eyebrow"><span className="eyebrow-line" /> THE VELMAX APPROACH</span><span className="section-index">03 — 04</span></div>
        <div className="approach-main">
          <h2 className="reveal">Start with<br /><em>the requirement.</em></h2>
          <div className="approach-detail reveal">
            <span className="approach-mark">V<span>.</span></span>
            <p>{siteConfig.company.overview}</p>
            <p className="approach-detail-small">No assumptions. No one-size-fits-all claims. A useful conversation begins with your operating context and power requirements.</p>
            <a href="#contact" className="text-link">Tell us what you need <ArrowUpRight size={15} /></a>
          </div>
        </div>
        <div className="approach-bottom"><span>POWER EQUIPMENT / ENGINEERED CONVERSATION</span><span>VELMAX TECHNOLOGIES</span></div>
      </section>

      {siteConfig.industries.length > 0 && <section className="industries" id="industries"><div className="section-top"><span className="eyebrow"><span className="eyebrow-line" /> APPLICATIONS</span></div><h2>Power that meets<br /><em>the working world.</em></h2><div className="industry-list">{siteConfig.industries.map((item) => <article key={item.name}><h3>{item.name}</h3><p>{item.description}</p></article>)}</div></section>}
      {siteConfig.credentials.length > 0 && <section className="credibility" aria-label="Company credentials">{siteConfig.credentials.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</section>}

      <section className="our-services reveal" id="our-services" aria-labelledby="our-services-title">
        <div className="our-services-header">
          <span className="eyebrow"><span className="eyebrow-line" /> PARTNERS & CLIENTS</span>
          <h2 id="our-services-title">Our <em>Services</em></h2>
          <p>Businesses and institutions we are proud to support with dependable power equipment.</p>
        </div>
        <ClientLogoMarquee />
      </section>

      <BusinessEnquirySection
        id="contact"
        showHomeContactHeader
        prefill={enquiryPrefill}
        onPrefillChange={handlePrefillChange}
        selectedProduct={selectedProduct}
        onSelectedProductChange={setSelectedProduct}
      />

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-block"><BrandMark light /><p>{siteConfig.company.descriptor}</p></div>
          <div className="footer-column"><span>EXPLORE</span><a href="#top">Home</a><a href="#products">Products</a><a href="#approach">About</a><a href="#contact">Contact</a></div>
          <div className="footer-column"><span>PRODUCTS</span>{siteConfig.products.map((product) => <a href={`#${product.id}`} key={product.id}>{product.shortName}</a>)}</div>
          <div className="footer-column footer-contact"><span>CONTACT</span>{contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : <p>Business email to be confirmed</p>}{contact.phones.length > 0 ? contact.phones.map((number) => <a href={`tel:${number.replace(/\s/g, '')}`} key={number}>{number}</a>) : contact.phone ? <a href={`tel:${contact.phone}`}>{contact.phone}</a> : <p>Business phone to be confirmed</p>}{contact.address && <p>{contact.address}</p>}{siteConfig.company.social.map((link) => <a href={link.href} target="_blank" rel="noreferrer" key={link.label}>{link.label} <MoveUpRight size={12} /></a>)}</div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.company.name}</span><span>POWER EQUIPMENT / BUSINESS ENQUIRIES</span>{siteConfig.company.privacyUrl ? <a href={siteConfig.company.privacyUrl}>Privacy policy</a> : <span className="unverified-label">Privacy policy details to be confirmed</span>}<a href="#top" className="back-top" data-testid="link-back-to-top">BACK TO TOP <ArrowUpRight size={13} /></a></div>
      </footer>
    </main>
  );
}

function AppRouter() {
  return (
    <Switch>
      <Route path="/products/servo-stabilizers/:variantId" component={ServoVariantFlowPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  );
}

export default function App() {
  return <AppRouter />;
}
