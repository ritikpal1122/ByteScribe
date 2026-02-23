import { Lightbulb, AlertTriangle, Info, Sparkles } from 'lucide-react';
import { renderInlineCode } from '../utils/docHelpers';

export function TipCallout({ tip }: { tip: string }) {
  return (
    <div className="my-5 relative overflow-hidden rounded-xl border-l-4 border-blue-500 bg-blue-50/80 px-5 py-4">
      {/* Subtle right-side gradient */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-blue-100/40 to-transparent" />

      <div className="relative flex gap-3.5">
        {/* Icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100">
          <Lightbulb className="h-4 w-4 text-blue-600" />
        </div>

        {/* Content */}
        <div className="min-w-0 pt-0.5">
          <p className="text-sm font-semibold text-blue-900 mb-1">Pro Tip</p>
          <p className="text-sm text-blue-800 leading-relaxed">
            {renderInlineCode(tip)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function WarningCallout({ warning }: { warning: string }) {
  return (
    <div className="my-5 relative overflow-hidden rounded-xl border-l-4 border-amber-500 bg-amber-50/80 px-5 py-4">
      {/* Subtle right-side gradient */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-amber-100/40 to-transparent" />

      <div className="relative flex gap-3.5">
        {/* Icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
        </div>

        {/* Content */}
        <div className="min-w-0 pt-0.5">
          <p className="text-sm font-semibold text-amber-900 mb-1">Warning</p>
          <p className="text-sm text-amber-800 leading-relaxed">
            {renderInlineCode(warning)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function NoteCallout({ note }: { note: string }) {
  return (
    <div className="my-5 relative overflow-hidden rounded-xl border-l-4 border-gray-400 bg-gray-50/80 px-5 py-4">
      {/* Subtle right-side gradient */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-100/40 to-transparent" />

      <div className="relative flex gap-3.5">
        {/* Icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200">
          <Info className="h-4 w-4 text-gray-600" />
        </div>

        {/* Content */}
        <div className="min-w-0 pt-0.5">
          <p className="text-sm font-semibold text-gray-800 mb-1">Note</p>
          <p className="text-sm text-gray-700 leading-relaxed">
            {renderInlineCode(note)}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AnalogyCallout({ analogy }: { analogy: string }) {
  return (
    <div className="my-5 relative overflow-hidden rounded-xl border-l-4 border-purple-500 bg-purple-50/80 px-5 py-4">
      {/* Subtle right-side gradient */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-purple-100/40 to-transparent" />

      <div className="relative flex gap-3.5">
        {/* Icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-100">
          <Sparkles className="h-4 w-4 text-purple-600" />
        </div>

        {/* Content */}
        <div className="min-w-0 pt-0.5">
          <p className="text-sm font-semibold text-purple-900 mb-1">Think of it like...</p>
          <p className="text-sm text-purple-800 leading-relaxed italic">
            {renderInlineCode(analogy)}
          </p>
        </div>
      </div>
    </div>
  );
}
