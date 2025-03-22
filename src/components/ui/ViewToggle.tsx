
import React from 'react';
import { GridIcon, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewToggleProps {
  view: 'grid' | 'list';
  setView: (view: 'grid' | 'list') => void;
  className?: string;
}

export function ViewToggle({ view, setView, className }: ViewToggleProps) {
  return (
    <div className={cn("inline-flex border border-border rounded-md overflow-hidden", className)}>
      <button 
        className={cn(
          "px-3 py-2 transition-colors",
          view === 'list' 
            ? "bg-primary text-primary-foreground" 
            : "bg-transparent hover:bg-secondary"
        )}
        onClick={() => setView('list')}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </button>
      <button 
        className={cn(
          "px-3 py-2 transition-colors",
          view === 'grid' 
            ? "bg-primary text-primary-foreground" 
            : "bg-transparent hover:bg-secondary"
        )}
        onClick={() => setView('grid')}
        aria-label="Grid view"
      >
        <GridIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
