import type { XPToast, SectionBanner } from './useCompletionFx';

interface CompletionFxProps {
  xpToasts: XPToast[];
  combo: number;
  sectionBanner: SectionBanner | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function CompletionFx({
  xpToasts,
  combo,
  sectionBanner,
  containerRef,
}: CompletionFxProps) {
  const rect = containerRef.current?.getBoundingClientRect();

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 51 }}
    >
      {/* XP Toasts */}
      {xpToasts.map((toast) => {
        if (!rect) return null;
        return (
          <div
            key={toast.id}
            className="absolute animate-xp-float font-bold drop-shadow-lg"
            style={{
              left: toast.x - rect.left,
              top: toast.y - rect.top - 10,
              fontSize: Math.min(14 + toast.points / 10, 24),
            }}
          >
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              +{toast.points} XP
            </span>
          </div>
        );
      })}

      {/* Combo Counter */}
      {combo >= 2 && (
        <div key={`combo-${combo}`} className="absolute top-4 right-4 animate-combo-pop">
          <div
            className={`px-4 py-2 rounded-full font-bold text-lg shadow-lg text-white ${
              combo >= 5
                ? 'bg-gradient-to-r from-red-500 to-orange-500 animate-fire-pulse'
                : combo >= 3
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'bg-gradient-to-r from-orange-500 to-amber-500'
            }`}
          >
            x{combo} {combo >= 5 ? 'INSANE!' : combo >= 3 ? 'Combo!' : 'Combo'}
          </div>
        </div>
      )}

      {/* Section Complete Banner */}
      {sectionBanner && (
        <div
          key={sectionBanner.id}
          className="absolute inset-x-0 top-1/3 flex justify-center animate-section-banner"
        >
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl shadow-2xl text-center">
            <div className="text-xs uppercase tracking-widest mb-1 opacity-80">
              Section Complete
            </div>
            <div className="text-2xl font-bold">{sectionBanner.title}</div>
          </div>
        </div>
      )}
    </div>
  );
}
