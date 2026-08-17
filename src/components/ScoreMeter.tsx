import React from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface ScoreMeterProps {
  score: number;
  status: 'READY' | 'NEEDS REVIEW';
}

export const ScoreMeter: React.FC<ScoreMeterProps> = ({ score, status }) => {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const isHigh = score >= 85;
  const isMedium = score >= 65 && score < 85;

  const strokeColor = isHigh
    ? '#10b981' // emerald-500
    : isMedium
    ? '#6366f1' // indigo-500
    : '#f59e0b'; // amber-500

  const glowColor = isHigh
    ? 'rgba(16, 185, 129, 0.35)'
    : isMedium
    ? 'rgba(99, 102, 241, 0.35)'
    : 'rgba(245, 158, 11, 0.35)';

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl">
      {/* Radial SVG Gauge */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#27272a"
            strokeWidth="7"
            fill="transparent"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={strokeColor}
            strokeWidth="7"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 8px ${glowColor})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{score}%</span>
          <span className="text-xs font-medium text-zinc-400">Score</span>
        </div>
      </div>

      {/* Score Description & Status Badge */}
      <div className="flex-1 space-y-2 text-center sm:text-left w-full">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs sm:text-sm font-semibold text-zinc-200">
            Completeness Score
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              status === 'READY'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
            }`}
          >
            {status === 'READY' ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Ready
              </>
            ) : (
              <>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Needs Review
              </>
            )}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          {score >= 90
            ? 'Optimal product fidelity. Standard commercial attributes are thoroughly populated.'
            : score >= 75
            ? 'Good foundational data. Supplement engineering metrics for maximum readiness.'
            : 'Key industrial fields omitted. Enrich missing specs before publishing.'}
        </p>
      </div>
    </div>
  );
};

