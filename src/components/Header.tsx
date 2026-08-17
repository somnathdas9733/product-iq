import React from 'react';
import { Cpu, Sparkles, CheckCircle2, Zap } from 'lucide-react';

interface HeaderProps {
  hasApiKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  hasApiKey,
}) => {
  return (
    <header className="border-b border-zinc-800/80 bg-[#09090b]/90 backdrop-blur-xl sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-3.5 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-indigo-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.35)] transition-transform hover:scale-105 shrink-0">
              <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-none">
                  PRODUCT<span className="text-indigo-400">IQ</span>
                </span>
                <span className="px-2.5 py-0.5 text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md">
                  AI Core
                </span>
              </div>
              <span className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                AI Product Intelligence
              </span>
            </div>
          </div>

          {/* Node Active pulse pill (Mobile view inline) */}
          <div className="flex sm:hidden items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-zinc-300">
              Active
            </span>
          </div>
        </div>

        {/* Status Indicators & Meta Badges (Desktop & Tablet) */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {/* Architecture Pipeline Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs sm:text-sm shrink-0">
            <span className="text-zinc-400 font-medium">Pipeline:</span>
            <span className="text-indigo-400 font-semibold">Generate</span>
            <span className="text-zinc-600">→</span>
            <span className="text-zinc-200 font-semibold">Enrich</span>
            <span className="text-zinc-600">→</span>
            <span className="text-emerald-400 font-semibold">Validate</span>
          </div>

          {/* Node Active pulse pill (Desktop view) */}
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full shrink-0">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-zinc-300">
              AI Engine Active
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

