import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { LinkItem } from '@/types/admin';

// All known options for each category
const AMBITI_OPTIONS: LinkItem[] = [
  { name: 'Pizzerie', href: '/professionale/pizzerie' },
  { name: 'Panifici', href: '/professionale/panifici' },
  { name: 'Bracerie', href: '/professionale/bracerie' },
  { name: 'Cucine Professionali', href: '/professionale/cucine-professionali' },
  { name: 'Caldaie a Biomassa', href: '/domestico/caldaie-biomassa' },
  { name: 'Camini', href: '/domestico/camini' },
  { name: 'Stufe', href: '/domestico/stufe' },
  { name: 'Torrefazioni', href: '/industriale/torrefazioni' },
  { name: 'Caseifici', href: '/industriale/caseifici' },
  { name: 'Affumicatori', href: '/industriale/affumicatori' },
  { name: 'Forni Industriali', href: '/industriale/forni-industriali' },
];

const APPLICAZIONI_OPTIONS: LinkItem[] = [
  { name: 'Forni a Legna', href: '/applicazioni/forni-a-legna' },
  { name: 'Forni Elettrici', href: '/applicazioni/forni-elettrici' },
  { name: 'Forni a Gas', href: '/applicazioni/forni-a-gas' },
  { name: 'Braci e Carbone', href: '/applicazioni/braci-carbone' },
  { name: 'Caldaie a Biomassa', href: '/applicazioni/caldaie-biomassa' },
  { name: 'Camini', href: '/applicazioni/camini' },
  { name: 'Cappe', href: '/applicazioni/cappe' },
  { name: 'Forni Industriali', href: '/applicazioni/forni-industriali' },
  { name: 'Torrefazioni', href: '/applicazioni/torrefazioni' },
  { name: 'Affumicatori', href: '/applicazioni/affumicatori' },
  { name: 'Girarrosti', href: '/applicazioni/girarrosti' },
  { name: 'Taglio Laser', href: '/applicazioni/taglio-laser' },
];

const SETTORI_OPTIONS: LinkItem[] = [
  { name: 'Professionale', href: '/settori/professionale' },
  { name: 'Domestico', href: '/settori/domestico' },
  { name: 'Industriale', href: '/settori/industriale' },
];

interface LinkListEditorProps {
  label: string;
  value: LinkItem[];
  onChange: (items: LinkItem[]) => void;
  category: 'ambiti' | 'applicazioni' | 'settori';
}

export default function LinkListEditor({
  label,
  value,
  onChange,
  category,
}: LinkListEditorProps) {
  const options =
    category === 'ambiti'
      ? AMBITI_OPTIONS
      : category === 'applicazioni'
      ? APPLICAZIONI_OPTIONS
      : SETTORI_OPTIONS;

  const isChecked = (option: LinkItem) =>
    value.some((v) => v.href === option.href);

  const handleToggle = (option: LinkItem, checked: boolean) => {
    if (checked) {
      onChange([...value, option]);
    } else {
      onChange(value.filter((v) => v.href !== option.href));
    }
  };

  // Group ambiti by sector for better UX
  const groupedOptions =
    category === 'ambiti'
      ? [
          { label: 'Professionale', items: options.filter((o) => o.href.startsWith('/professionale')) },
          { label: 'Domestico', items: options.filter((o) => o.href.startsWith('/domestico')) },
          { label: 'Industriale', items: options.filter((o) => o.href.startsWith('/industriale')) },
        ]
      : null;

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="border rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto">
        {groupedOptions ? (
          groupedOptions.map((group) => (
            <div key={group.label}>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                {group.label}
              </p>
              <div className="space-y-1 mb-2">
                {group.items.map((option) => (
                  <label
                    key={option.href}
                    className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 rounded px-2 py-1"
                  >
                    <Checkbox
                      checked={isChecked(option)}
                      onCheckedChange={(checked) =>
                        handleToggle(option, !!checked)
                      }
                    />
                    <span className="text-sm">{option.name}</span>
                  </label>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-1">
            {options.map((option) => (
              <label
                key={option.href}
                className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 rounded px-2 py-1"
              >
                <Checkbox
                  checked={isChecked(option)}
                  onCheckedChange={(checked) =>
                    handleToggle(option, !!checked)
                  }
                />
                <span className="text-sm">{option.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
