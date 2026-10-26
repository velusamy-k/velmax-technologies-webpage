import { ArrowUpRight } from 'lucide-react';
import type { ServoModelGroup } from '../site-config';

type ServoModelGroupsProps = {
  groups: ServoModelGroup[];
};

export function ServoModelGroups({ groups }: ServoModelGroupsProps) {
  return (
    <div className="story-benefits servo-model-groups">
      {groups.map((group) => (
        <div className="servo-model-group" key={group.id}>
          <div className="servo-model-parent benefit-row">
            <span className="servo-model-marker" aria-hidden="true" />
            <p>{group.label}</p>
          </div>
          <div className="servo-model-variants">
            {group.variants.map((variant) => (
              <a
                className="servo-model-link benefit-row"
                href={variant.href}
                key={variant.id}
                data-testid={`link-servo-variant-${variant.id}`}
              >
                <span className="servo-variant-marker" aria-hidden="true" />
                <p>{variant.label}</p>
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
