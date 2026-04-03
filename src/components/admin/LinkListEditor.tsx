import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';
import type { LinkItem } from '@/types/admin';

interface LinkListEditorProps {
  label: string;
  value: LinkItem[];
  onChange: (items: LinkItem[]) => void;
  namePlaceholder?: string;
  hrefPlaceholder?: string;
}

export default function LinkListEditor({
  label,
  value,
  onChange,
  namePlaceholder = "Nome",
  hrefPlaceholder = "/percorso",
}: LinkListEditorProps) {
  const [newName, setNewName] = useState('');
  const [newHref, setNewHref] = useState('');

  const handleAdd = () => {
    if (!newName.trim() || !newHref.trim()) return;
    onChange([...value, { name: newName.trim(), href: newHref.trim() }]);
    setNewName('');
    setNewHref('');
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {value.length > 0 && (
        <div className="space-y-1">
          {value.map((item, index) => (
            <div key={index} className="flex items-center gap-2 bg-muted/50 rounded-md px-3 py-1.5 text-sm">
              <span className="font-medium">{item.name}</span>
              <span className="text-muted-foreground text-xs">{item.href}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-5 w-5 ml-auto shrink-0"
                onClick={() => handleRemove(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder={namePlaceholder}
          className="flex-1"
        />
        <Input
          value={newHref}
          onChange={(e) => setNewHref(e.target.value)}
          placeholder={hrefPlaceholder}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleAdd}
          disabled={!newName.trim() || !newHref.trim()}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
