import { getServoVariantCatalog, type ServoVariantId } from '@/servo-variant-catalog';

type ServoVariantCatalogProps = {
  variantId: ServoVariantId;
  configuration: string;
  onSelectModel: (model: string) => void;
};

export function ServoVariantCatalog({ variantId, onSelectModel }: ServoVariantCatalogProps) {
  const sections = getServoVariantCatalog(variantId);

  if (!sections?.length) {
    return null;
  }

  return (
    <div className="servo-variant-catalog">
      <p className="servo-flow-list-heading servo-variant-catalog-heading">MODELS IN THIS LINE</p>
      {sections.map((section) => (
        <div className="servo-catalog-section" key={section.title ?? section.models[0]}>
          {section.title ? (
            <h3 className="servo-catalog-section-title">{section.title}</h3>
          ) : null}
          <ul className="servo-product-grid">
            {section.models.map((model) => (
              <li key={model}>
                <button
                  type="button"
                  className="servo-product-btn"
                  onClick={() => onSelectModel(model)}
                  data-testid={`button-servo-model-${model.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  {model}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="servo-catalog-enquiry-hint">
        Select a model to pre-fill BUSINESS ENQUIRY below.
      </p>
    </div>
  );
}
