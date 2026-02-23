import { ArrowLeft, List, Search } from 'lucide-react';

export default function DocMobileBottomBar({
  onBack,
  onToggleToc,
  onOpenSearch,
}: {
  onBack: () => void;
  onToggleToc: () => void;
  onOpenSearch: () => void;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="flex items-center justify-around bg-white border-t border-gray-200 px-2 py-2 backdrop-blur-lg bg-opacity-90">
        <button
          onClick={onBack}
          className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-4.5 h-4.5 text-gray-600" />
          <span className="text-[10px] text-gray-500">Back</span>
        </button>

        <button
          onClick={onToggleToc}
          className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <List className="w-4.5 h-4.5 text-gray-600" />
          <span className="text-[10px] text-gray-500">TOC</span>
        </button>

        <button
          onClick={onOpenSearch}
          className="flex flex-col items-center gap-0.5 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Search className="w-4.5 h-4.5 text-gray-600" />
          <span className="text-[10px] text-gray-500">Search</span>
        </button>
      </div>
    </div>
  );
}
