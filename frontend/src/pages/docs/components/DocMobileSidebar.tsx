import { X } from 'lucide-react';
import type { LanguageConfig } from '@/data/docs';
import type { LangColorTokens } from '../utils/colorTokens';
import DocLeftSidebar from './DocLeftSidebar';

export default function DocMobileSidebar({
  isOpen,
  onClose,
  lang,
  colors,
  selectedEntryId,
  onSelectEntry,
  collapsedCategories,
  onToggleCategory,
  isEntryCompleted,
  completedCount,
}: {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageConfig;
  colors: LangColorTokens;
  selectedEntryId: string | null;
  onSelectEntry: (entryId: string) => void;
  collapsedCategories: Set<string>;
  onToggleCategory: (catId: string) => void;
  isEntryCompleted: (entryId: string) => boolean;
  completedCount: number;
}) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 left-0 w-72 bg-white z-50 shadow-2xl lg:hidden flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <span className="text-sm font-bold text-gray-900">
            Navigation
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <DocLeftSidebar
            lang={lang}
            colors={colors}
            selectedEntryId={selectedEntryId}
            onSelectEntry={(id) => {
              onSelectEntry(id);
              onClose();
            }}
            collapsedCategories={collapsedCategories}
            onToggleCategory={onToggleCategory}
            isEntryCompleted={isEntryCompleted}
            completedCount={completedCount}
          />
        </div>
      </div>
    </>
  );
}
