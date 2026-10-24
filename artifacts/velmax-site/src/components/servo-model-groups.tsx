import { useId, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { ServoModelGroup } from '../site-config';

type ServoModelGroupsProps = {
  groups: ServoModelGroup[];
};

export function ServoModelGroups({ groups }: ServoModelGroupsProps) {
  const baseId = useId();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) => {
    setExpanded((current) => ({ ...current, [groupId]: !current[groupId] }));
  };

  return (
    <div className="story-benefits servo-model-groups">
      {groups.map((group) => {
        const isOpen = Boolean(expanded[group.id]);
        const panelId = `${baseId}-${group.id}-variants`;

        return (
          <div className="servo-model-group" key={group.id}>
            <div className="servo-model-parent benefit-row">
              <label className="servo-model-toggle" htmlFor={`${baseId}-${group.id}`}>
                <input
                  id={`${baseId}-${group.id}`}
                  type="checkbox"
                  checked={isOpen}
                  onChange={() => toggleGroup(group.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                />
                <span className="servo-model-checkbox" aria-hidden="true" />
              </label>
              <p>{group.label}</p>
            </div>
            {isOpen && (
              <div className="servo-model-variants" id={panelId}>
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
            )}
          </div>
        );
      })}
    </div>
  );
}
