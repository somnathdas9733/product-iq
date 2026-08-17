import React, { useState } from 'react';
import { ProductIntelligence } from '../types';
import { ScoreMeter } from './ScoreMeter';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  AlertTriangle,
  Download,
  Copy,
  Check,
  Sparkles,
  Layers,
  FileCode2,
  FileText,
  Tag,
  ArrowRight,
  Info,
} from 'lucide-react';

interface IntelligenceDashboardProps {
  data: ProductIntelligence;
  onGenerateAgain: () => void;
  onClear: () => void;
}

export const IntelligenceDashboard: React.FC<IntelligenceDashboardProps> = ({
  data,
  onGenerateAgain,
  onClear,
}) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'validation' | 'traceability' | 'json'>('visual');
  const [isCopied, setIsCopied] = useState(false);

  const handleDownloadJSON = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const filename = `${data.productName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-intelligence.json`;
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyJSON = () => {
    const jsonString = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(jsonString);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Bento Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
        {/* Subtle accent glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* Product Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-block px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                {data.category}
              </span>
              <span className="text-xs text-zinc-400 font-medium">
                Commerce-Ready Schema
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter text-white leading-tight">
              {data.productName}
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
              Industrial catalog intelligence synthesized with server-side AI validation.
            </p>
          </div>

          {/* Completeness Score Gauge */}
          <div className="w-full lg:w-auto min-w-0 sm:min-w-[320px]">
            <ScoreMeter
              score={data.completenessScore}
              status={data.validation?.status || 'READY'}
            />
          </div>
        </div>

        {/* Navigation Tabs & Action Buttons */}
        <div className="mt-6 sm:mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 relative z-10">
          {/* Sub-View Tabs (Scrollable on Mobile) */}
          <div className="flex items-center p-1.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs sm:text-sm overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'visual'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Structured Data
            </button>
            <button
              onClick={() => setActiveTab('validation')}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'validation'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Validation & Quality
              {data.validation?.status === 'NEEDS REVIEW' && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('traceability')}
              className={`px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'traceability'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Traceability
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`px-3.5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'json'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <FileCode2 className="w-4 h-4" />
              JSON
            </button>
          </div>

          {/* Export Buttons */}
          <div className="flex items-center justify-between sm:justify-end gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleDownloadJSON}
              className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-2xl bg-white hover:bg-zinc-100 text-black font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer"
            >
              <Download className="w-4 h-4 text-black" />
              <span>Download JSON</span>
            </button>

            <button
              type="button"
              onClick={handleCopyJSON}
              className="px-4 py-2.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs sm:text-sm font-bold border border-zinc-700 transition-colors flex items-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
              <span>{isCopied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              type="button"
              onClick={onGenerateAgain}
              className="px-4 py-2.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs sm:text-sm font-bold border border-zinc-700 transition-colors flex items-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Regenerate</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: Structured Intelligence Dashboard */}
      {activeTab === 'visual' && (
        <div className="space-y-6">
          {/* Description Card */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="inline-block px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                Commerce-Ready Description
              </div>
              <span className="text-xs font-medium text-zinc-400">
                AI Synthesized
              </span>
            </div>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-sans bg-zinc-950 p-4 sm:p-5 rounded-2xl border border-zinc-800">
              {data.shortDescription}
            </p>
          </div>

          {/* Two-Column Bento Grid: Key Features & Technical Specifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Features Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-zinc-300">
                    Verified Key Features
                  </span>
                </div>
                <span className="text-xs font-medium text-zinc-400">
                  {data.features?.length || 0} Points
                </span>
              </div>

              <div className="space-y-2.5">
                {data.features && data.features.length > 0 ? (
                  data.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs sm:text-sm text-zinc-200 leading-relaxed hover:border-zinc-700 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] shrink-0 mt-1.5" />
                      <span>{feature}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-zinc-500">No explicit features generated.</p>
                )}
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-semibold text-zinc-300">
                    Structured Specifications
                  </span>
                </div>
                <span className="text-xs font-medium text-zinc-400">
                  Verified Data
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-950">
                <table className="w-full text-xs sm:text-sm text-left">
                  <thead className="bg-zinc-900/90 border-b border-zinc-800 text-zinc-300 text-xs sm:text-sm font-semibold">
                    <tr>
                      <th className="px-4 py-3 sm:px-5 sm:py-3.5">Parameter</th>
                      <th className="px-4 py-3 sm:px-5 sm:py-3.5">Specified Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {Array.isArray(data.specifications) && data.specifications.length > 0 ? (
                      data.specifications.map((spec: any, idx) => {
                        const name = typeof spec === 'object' ? spec.name : `Spec #${idx + 1}`;
                        const val = typeof spec === 'object' ? spec.value : String(spec);
                        return (
                          <tr key={idx} className="hover:bg-zinc-900/50 transition-colors">
                            <td className="px-4 py-3 font-medium text-zinc-300 whitespace-nowrap">
                              {name}
                            </td>
                            <td className="px-4 py-3 font-mono text-indigo-300">
                              {val}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={2} className="px-4 py-4 text-zinc-500 text-center">
                          No structured specifications recorded.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Applications & SEO Keywords Bento Tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Applications */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-semibold text-zinc-300">
                  Target Applications
                </span>
              </div>
              <ul className="space-y-2">
                {data.applications && data.applications.length > 0 ? (
                  data.applications.map((app, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-xs text-zinc-300 bg-zinc-950 px-4 py-3 rounded-2xl border border-zinc-800"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span>{app}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-zinc-500">None specified</li>
                )}
              </ul>
            </div>

            {/* SEO Keywords */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-semibold text-zinc-300">
                  B2B Catalog Keywords
                </span>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {data.seoKeywords && data.seoKeywords.length > 0 ? (
                  data.seoKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-indigo-300 text-xs font-mono hover:border-zinc-700 transition-colors"
                    >
                      #{kw}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-zinc-500">None generated</span>
                )}
              </div>
            </div>
          </div>

          {/* Missing Information Notice Card */}
          {data.missingInformation && data.missingInformation.length > 0 && (
            <div className="bg-zinc-900 border border-amber-500/30 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-300">
                    Missing Information Detected ({data.missingInformation.length} Fields)
                  </span>
                </div>
                <span className="text-xs font-medium text-zinc-400">
                  Commerce Integrity
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                To guarantee zero hallucination, the AI flagged the following attributes as unprovided:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                {data.missingInformation.map((field, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-zinc-950 border border-amber-500/20 text-xs text-amber-200"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-mono text-[11px]">{field}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Product Validation Section */}
      {activeTab === 'validation' && (
        <div className="space-y-6">
          {/* Validation Status Bento Card */}
          <div
            className={`rounded-[2.5rem] p-6 sm:p-8 border shadow-2xl ${
              data.validation?.status === 'READY'
                ? 'bg-zinc-900 border-emerald-500/30'
                : 'bg-zinc-900 border-amber-500/30'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-xs font-semibold text-zinc-400">
                  Validation Decision
                </div>
                <div>
                  <span
                    className={`text-2xl font-bold tracking-tight ${
                      data.validation?.status === 'READY' ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    Status: {data.validation?.status === 'READY' ? 'Ready' : 'Needs Review'}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
                  {data.validation?.statusReason ||
                    (data.validation?.status === 'READY'
                      ? 'All required commercial catalog attributes are verified.'
                      : 'Important industrial attributes are missing. Provide additional specs to reach Ready status.')}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-right min-w-[160px]">
                <div className="text-4xl font-black tracking-tighter text-white">
                  {data.completenessScore}%
                </div>
                <div className="text-xs font-medium text-zinc-400 mt-1">
                  Catalog Fidelity
                </div>
              </div>
            </div>
          </div>

          {/* 3 Categories Breakdown from Specification */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Complete Information */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-zinc-300">
                    1. Complete Info
                  </span>
                </div>
                <span className="text-xs font-medium text-emerald-400">
                  Verified
                </span>
              </div>
              <ul className="space-y-2">
                {data.validation?.completeInformation && data.validation.completeInformation.length > 0 ? (
                  data.validation.completeInformation.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-zinc-200 p-3 rounded-2xl bg-zinc-950 border border-emerald-900/30 flex items-start gap-2.5"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-zinc-500">None</li>
                )}
              </ul>
            </div>

            {/* 2. Missing Information */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-zinc-300">
                    2. Missing Info
                  </span>
                </div>
                <span className="text-xs font-medium text-amber-400">
                  Gaps
                </span>
              </div>
              <ul className="space-y-2">
                {data.validation?.missingInformation && data.validation.missingInformation.length > 0 ? (
                  data.validation.missingInformation.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-amber-200 p-3 rounded-2xl bg-zinc-950 border border-amber-900/30 flex items-start gap-2.5 font-mono text-[11px]"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-emerald-400 p-3 rounded-2xl bg-zinc-950 border border-emerald-800/30 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>No missing required fields</span>
                  </li>
                )}
              </ul>
            </div>

            {/* 3. Potential Issues */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-semibold text-zinc-300">
                    3. Potential Issues
                  </span>
                </div>
                <span className="text-xs font-medium text-indigo-400">
                  Integrity
                </span>
              </div>
              <ul className="space-y-2">
                {data.validation?.potentialIssues && data.validation.potentialIssues.length > 0 ? (
                  data.validation.potentialIssues.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-rose-300 p-3 rounded-2xl bg-zinc-950 border border-rose-900/30 flex items-start gap-2.5"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-xs text-zinc-300 p-3 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>No conflicting specs detected.</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Information Source & Traceability */}
      {activeTab === 'traceability' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-start gap-3.5">
            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] shrink-0 mt-1.5" />
            <div>
              <strong className="text-white block mb-0.5 text-sm">Zero-Hallucination Traceability Architecture</strong>
              Every data point in ProductIQ is strictly partitioned between raw manufacturer ground-truth and AI synthesis.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SOURCE PROVIDED */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <span className="text-xs font-semibold text-zinc-300 block">
                    Source Provided Data
                  </span>
                  <p className="text-[10px] text-zinc-500 font-medium mt-0.5">Manufacturer Input</p>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                  Ground Truth
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="text-xs font-medium text-zinc-400">Product Name</div>
                  <div className="text-white font-sans font-bold">{data.traceability?.sourceProvided?.productName || data.productName}</div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="text-xs font-medium text-zinc-400">Category & Material</div>
                  <div className="text-zinc-200 font-sans">
                    {data.traceability?.sourceProvided?.category || data.category} • {data.traceability?.sourceProvided?.material || 'Not specified'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="text-xs font-medium text-zinc-400">Raw Specifications Input</div>
                  <pre className="text-zinc-300 text-[11px] whitespace-pre-wrap">
                    {data.traceability?.sourceProvided?.specifications || 'None provided'}
                  </pre>
                </div>
              </div>
            </div>

            {/* AI GENERATED */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <span className="text-xs font-semibold text-zinc-300 block">
                    AI Enrichment Data
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
                  AI Synthesized
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="text-xs font-medium text-zinc-400">Synthesized Description</div>
                  <p className="text-zinc-200 font-sans text-xs leading-relaxed">
                    {data.shortDescription}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="text-xs font-medium text-zinc-400">Enriched Features ({data.features?.length || 0})</div>
                  <ul className="space-y-1 text-zinc-300 font-sans text-xs">
                    {data.features?.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-indigo-400 font-bold">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="text-xs font-medium text-zinc-400">Generated Keywords</div>
                  <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-[11px] text-indigo-300">
                    {data.seoKeywords?.map((k, i) => (
                      <span key={i} className="bg-zinc-900 px-2 py-0.5 rounded-lg border border-zinc-800">#{k}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Raw JSON Inspector */}
      {activeTab === 'json' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode2 className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold text-zinc-300">
                Commerce-Ready JSON
              </span>
            </div>
            <button
              onClick={handleCopyJSON}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono font-bold flex items-center gap-2 border border-zinc-700 cursor-pointer"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {isCopied ? 'Copied' : 'Copy JSON'}
            </button>
          </div>
          <pre className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-indigo-300 text-xs font-mono overflow-x-auto max-h-[500px] leading-relaxed">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

