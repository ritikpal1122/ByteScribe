import { DIFFICULTY_COLORS } from '../utils/colorTokens';

const LEVELS = ['beginner', 'intermediate', 'advanced'] as const;

export default function DifficultyFilter({
  activeFilters,
  onToggle,
}: {
  activeFilters: Set<string>;
  onToggle: (level: string) => void;
}) {
  return (
    <div className="flex items-center gap-1.5 px-4 py-2">
      {LEVELS.map((level) => {
        const isActive = activeFilters.has(level);
        return (
          <button
            key={level}
            onClick={() => onToggle(level)}
            className={`text-[11px] font-medium px-2.5 py-1 rounded-full capitalize transition-all ${
              isActive
                ? DIFFICULTY_COLORS[level]
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {level}
          </button>
        );
      })}
    </div>
  );
}
