import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const toListItems = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  return String(value)
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((s) => s.trim().replace(/[.]+$/, ''))
    .filter((s) => s.length > 12);
};

export const ExpandableList = ({ items, initialCount, numbered = false }) => {
  const [expanded, setExpanded] = useState(false);
  const list = toListItems(items);
  const needsToggle = list.length > initialCount;
  const visible = expanded || !needsToggle ? list : list.slice(0, initialCount);
  const hiddenCount = list.length - initialCount;

  if (!list.length) return null;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <ul className="space-y-2">
        {visible.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            {numbered ? (
              <span className="mt-0.5 w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 font-code text-[10px] font-semibold flex items-center justify-center shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 mt-1.5 shrink-0" />
            )}
            <span className="text-xs text-zinc-400 font-code leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
      {needsToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 inline-flex items-center gap-1.5 self-start text-[11px] font-code font-semibold text-emerald-400/90 hover:text-emerald-300 transition-colors cursor-pointer"
        >
          <ChevronDown
            size={13}
            className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
          {expanded ? 'Show less' : `Show ${hiddenCount} more`}
        </button>
      )}
    </div>
  );
};

export const FeatureGrid = ({ features }) => {
  const [expanded, setExpanded] = useState(false);
  const list = toListItems(features);
  const compact = list.length > 0 && list.every((item) => item.length < 52);
  const initialCount = compact ? 10 : 6;
  const needsToggle = list.length > initialCount;
  const visible = expanded || !needsToggle ? list : list.slice(0, initialCount);
  const hiddenCount = list.length - initialCount;

  if (!list.length) return null;

  return (
    <div>
      {compact ? (
        <div className="flex flex-wrap gap-2">
          {visible.map((feature, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/70 border border-white/8 text-[11px] sm:text-xs text-zinc-300 font-code leading-none hover:border-emerald-400/35 hover:text-emerald-200 transition-colors"
            >
              <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
              {feature}
            </span>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {visible.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-emerald-500/25 transition-colors"
            >
              <span className="mt-0.5 w-5 h-5 rounded-md bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 font-code text-[10px] font-semibold flex items-center justify-center shrink-0">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-xs text-zinc-300 font-code leading-snug line-clamp-2" title={feature}>
                {feature}
              </span>
            </div>
          ))}
        </div>
      )}
      {needsToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-code font-semibold text-emerald-400/90 hover:text-emerald-300 transition-colors cursor-pointer"
        >
          <ChevronDown
            size={13}
            className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          />
          {expanded ? 'Show less' : `Show all ${list.length} features (+${hiddenCount})`}
        </button>
      )}
    </div>
  );
};
