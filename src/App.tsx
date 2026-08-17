import React, { useState, useEffect } from 'react';
import { ProductInput, ProductIntelligence } from './types';
import { Header } from './components/Header';
import { ProductForm } from './components/ProductForm';
import { IntelligenceDashboard } from './components/IntelligenceDashboard';
import { 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight,
  Split,
  Maximize2,
  Database,
  Cpu,
  ShieldCheck,
  Zap
} from 'lucide-react';

const EMPTY_PRODUCT_INPUT: ProductInput = {
  productName: '',
  category: '',
  material: '',
  specifications: '',
  applications: '',
  additionalInfo: '',
};

export default function App() {
  const [formData, setFormData] = useState<ProductInput>(EMPTY_PRODUCT_INPUT);
  const [intelligence, setIntelligence] = useState<ProductIntelligence | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<'split' | 'focus'>('split');
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);

  // Check health and initial generation
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setHasApiKey(data.hasApiKey);
      })
      .catch(() => {});
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + Enter to trigger generation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [formData]);

  const handleFieldChange = (field: keyof ProductInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setFormData(EMPTY_PRODUCT_INPUT);
    setIntelligence(null);
    setErrorMessage(null);
  };

  const handleGenerate = async () => {
    if (!formData.productName.trim() && !formData.category.trim()) {
      setErrorMessage('Please provide at least a Product Name or Category to generate intelligence.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || `Server returned ${response.status}: ${response.statusText}`);
      }

      const result: ProductIntelligence = await response.json();
      setIntelligence(result);
    } catch (err: any) {
      console.error('Generation failure:', err);
      setErrorMessage(err.message || 'Failed to generate product intelligence. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col selection:bg-indigo-500/30 selection:text-white font-sans antialiased">
      {/* App Top Navigation */}
      <Header
        hasApiKey={hasApiKey}
      />

      {/* Hero / Quick Stats Bento Sub-header */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-semibold text-indigo-400">
                AI Intelligence Engine
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 hidden sm:inline-block" />
              <span className="text-xs sm:text-sm font-medium text-zinc-400">
                Synthesize • Enrich • Validate
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Industrial Catalog Intelligence
            </h2>
          </div>

          {/* Layout Mode Switcher */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center p-1 bg-zinc-950 border border-zinc-800 rounded-2xl text-xs sm:text-sm">
              <button
                onClick={() => setLayoutMode('split')}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                  layoutMode === 'split'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Split className="w-4 h-4" />
                <span>Split View</span>
              </button>
              <button
                onClick={() => setLayoutMode('focus')}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 cursor-pointer ${
                  layoutMode === 'focus'
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Maximize2 className="w-4 h-4" />
                <span>Focus View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="mt-4 p-4 rounded-2xl bg-zinc-900 border border-rose-500/40 text-rose-200 text-sm flex items-center gap-3 shadow-xl">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}
      </section>

      {/* Main Workspace Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 flex-1 pb-16">
        {layoutMode === 'split' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Left Column: Product Input Form (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <ProductForm
                formData={formData}
                onChange={handleFieldChange}
                onSubmit={handleGenerate}
                onClear={handleClear}
                isLoading={isLoading}
              />
            </div>

            {/* Right Column: Intelligence Output Dashboard (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {intelligence ? (
                <IntelligenceDashboard
                  data={intelligence}
                  onGenerateAgain={handleGenerate}
                  onClear={handleClear}
                />
              ) : (
                /* Empty / Ready State Bento Card */
                <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden group">
                  {/* Subtle background glow */}
                  <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 mx-auto flex items-center justify-center text-indigo-400 shadow-inner">
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 animate-pulse" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto relative z-10">
                    <div className="inline-block px-3.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs sm:text-sm font-semibold">
                      Ready for Synthesis
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Synthesize Product Intelligence
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                      Enter raw specifications on the left, then click <strong>Synthesize Intelligence</strong> to trigger the AI pipeline.
                    </p>
                  </div>

                  {/* Feature Highlights Bento Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-left relative z-10">
                    <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-colors">
                      <div className="flex items-center gap-2 text-indigo-400 text-xs sm:text-sm font-semibold">
                        <ShieldCheck className="w-4 h-4" />
                        <span>AI Validation</span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">Strictly extracts from provided specs with zero hallucination.</p>
                    </div>
                    <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-colors">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-semibold">
                        <Zap className="w-4 h-4" />
                        <span>Completeness</span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">Calculates 0-100% score and highlights missing critical fields.</p>
                    </div>
                    <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2 hover:border-zinc-700 transition-colors">
                      <div className="flex items-center gap-2 text-indigo-400 text-xs sm:text-sm font-semibold">
                        <Database className="w-4 h-4" />
                        <span>Validated JSON</span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">Outputs B2B commerce-ready JSON schema for instant ERP sync.</p>
                    </div>
                  </div>

                  {/* Quick Action Button */}
                  <div className="pt-2 relative z-10">
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={isLoading}
                      className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-zinc-100 text-black font-bold text-sm sm:text-base transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center justify-center gap-2.5"
                    >
                      <Sparkles className="w-5 h-5 text-black" />
                      <span>Synthesize Product Intelligence</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Focus View Mode (Stacked Full-Width) */
          <div className="space-y-8 max-w-4xl mx-auto">
            <ProductForm
              formData={formData}
              onChange={handleFieldChange}
              onSubmit={handleGenerate}
              onClear={handleClear}
              isLoading={isLoading}
            />

            {intelligence && (
              <IntelligenceDashboard
                data={intelligence}
                onGenerateAgain={handleGenerate}
                onClear={handleClear}
              />
            )}
          </div>
        )}
      </main>

      {/* Bento Grid Industrial Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-6 text-center text-xs sm:text-sm text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-200">ProductIQ</span>
            <span>•</span>
            <span>Bento Industrial Catalog Engine</span>
          </div>
          <div className="text-xs sm:text-sm text-zinc-400 font-medium">
            AI-Powered Product Intelligence • Server-Side Validation
          </div>
        </div>
      </footer>
    </div>
  );
}

