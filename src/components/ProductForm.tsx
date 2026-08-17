import React from 'react';
import { ProductInput } from '../types';
import { 
  Sparkles, 
  RotateCcw, 
  Sliders,
  Loader2
} from 'lucide-react';

interface ProductFormProps {
  formData: ProductInput;
  onChange: (field: keyof ProductInput, value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  isLoading: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onClear,
  isLoading,
}) => {
  const addQuickSpec = (specSnippet: string) => {
    const current = formData.specifications;
    const updated = current ? `${current}\n${specSnippet}` : specSnippet;
    onChange('specifications', updated);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      {/* Subtle top light flare */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 mb-5 sm:mb-6">
        <div className="flex items-center justify-between">
          <div className="inline-block px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs sm:text-sm font-semibold">
            01 • Raw Specification Input
          </div>
          <span className="text-xs sm:text-sm font-medium text-zinc-400">
            Ground Truth
          </span>
        </div>
      </div>

      {/* Form Fields */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-4 sm:space-y-5 relative z-10"
      >
        {/* Row 1: Product Name & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-zinc-200">
              Product Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.productName}
              onChange={(e) => onChange('productName', e.target.value)}
              placeholder="e.g., Industrial Water Pump"
              className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-white text-sm sm:text-base focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-colors placeholder:text-zinc-600"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs sm:text-sm font-semibold text-zinc-200">
              Product Category <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.category}
              onChange={(e) => onChange('category', e.target.value)}
              placeholder="e.g., Water Pump, Industrial Valves"
              className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-white text-sm sm:text-base focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-colors placeholder:text-zinc-600"
            />
          </div>
        </div>

        {/* Row 2: Material */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-zinc-200">
            Material Composition
          </label>
          <input
            type="text"
            value={formData.material}
            onChange={(e) => onChange('material', e.target.value)}
            placeholder="e.g., Stainless Steel 316L, Forged Carbon Steel, Solid Carbide"
            className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-white text-sm sm:text-base focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-colors placeholder:text-zinc-600"
          />
        </div>

        {/* Row 3: Technical Specifications */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs sm:text-sm font-semibold text-zinc-200">
              Technical Specifications
            </label>
            <span className="text-xs text-zinc-400 font-mono hidden sm:inline">One per line or key: value</span>
          </div>
          <textarea
            rows={4}
            value={formData.specifications}
            onChange={(e) => onChange('specifications', e.target.value)}
            placeholder={"Flow rate: 50 L/min\nMaximum pressure: 10 bar\nInlet/Outlet: 1.5 inch"}
            className="w-full px-4 py-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-white text-sm sm:text-base font-mono focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-colors placeholder:text-zinc-600"
          />
          {/* Quick Snippet Inserters */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-zinc-400 font-medium mr-1">Quick:</span>
            {[
              { label: '+ Voltage', text: 'Voltage: 380V / 3-Phase' },
              { label: '+ Temp Range', text: 'Operating Temp: -20°C to 120°C' },
              { label: '+ Weight', text: 'Weight: 14.5 kg' },
              { label: '+ Dimensions', text: 'Dimensions: 320 x 180 x 210 mm' },
            ].map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => addQuickSpec(chip.text)}
                className="px-3 py-1.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-indigo-300 border border-zinc-800 text-xs font-mono transition-colors cursor-pointer active:scale-95"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 4: Applications */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-zinc-200">
            Target Applications & Use Cases
          </label>
          <textarea
            rows={2}
            value={formData.applications}
            onChange={(e) => onChange('applications', e.target.value)}
            placeholder="e.g., Industrial water circulation, cooling tower booster, rinse systems"
            className="w-full px-4 py-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-white text-sm sm:text-base focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-colors placeholder:text-zinc-600"
          />
        </div>

        {/* Row 5: Additional Info */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-semibold text-zinc-200">
            Additional Information & Operating Notes
          </label>
          <input
            type="text"
            value={formData.additionalInfo}
            onChange={(e) => onChange('additionalInfo', e.target.value)}
            placeholder="e.g., Continuous 24/7 duty rating in non-corrosive liquids."
            className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-white text-sm sm:text-base focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-colors placeholder:text-zinc-600"
          />
        </div>

        {/* Primary Action Bar - Bento style buttons */}
        <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            disabled={isLoading || (!formData.productName && !formData.category)}
            className={`w-full sm:flex-1 py-4 px-6 rounded-2xl font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
              isLoading
                ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
                : 'bg-white text-black hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.15)]'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
                <span>Synthesizing Intelligence...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-black" />
                <span>Generate Product Intelligence</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClear}
            disabled={isLoading}
            className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm sm:text-base font-bold border border-zinc-700 transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4 text-zinc-400" />
            <span>Clear</span>
          </button>
        </div>
      </form>
    </div>
  );
};

