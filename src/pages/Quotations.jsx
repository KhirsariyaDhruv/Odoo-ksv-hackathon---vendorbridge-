import { Link } from 'react-router-dom';

export function Quotations() {
  return (
    <div className="flex-1 overflow-y-auto animate-fade-in">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-stack-lg">
        <div>
          <div className="flex items-center gap-2 mb-2 text-on-surface-variant font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <Link to="/rfqs" className="hover:text-primary transition-colors">Back to RFQ-2023-089</Link>
          </div>
          <h2 className="font-display-lg text-display-lg text-on-surface">Quotation Comparison</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">Comparing bids for Enterprise Server Hardware Refresh. 3 vendors have submitted valid quotations.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-transparent text-white border border-primary rounded-full py-2 px-6 flex items-center gap-2 text-sm font-display-md font-semibold hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-sm">download</span>
            Export PDF
          </button>
        </div>
      </div>
      
      {/* Comparison Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-grid mb-stack-lg">
        {/* Vendor 1: Infra Supplies (Highlighted) */}
        <div className="bg-tertiary-container text-on-tertiary-container rounded-xl p-6 flex flex-col h-full transform transition-transform hover:-translate-y-1 relative overflow-hidden">
          {/* Subtle Inner Glow */}
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.03) 0%, transparent 50%)' }}></div>
          
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <span className="inline-block px-2 py-1 bg-tertiary/20 text-on-tertiary-container text-xs font-bold rounded mb-2 font-mono-data tracking-wider">LOWEST BID</span>
              <h3 className="font-headline-lg text-headline-lg font-bold">Infra Supplies</h3>
              <p className="font-body-sm text-body-sm opacity-80 mt-1">Vendor ID: VS-8921</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <span className="material-symbols-outlined text-on-tertiary-container">router</span>
            </div>
          </div>
          <div className="space-y-4 flex-1 relative z-10">
            <div className="flex justify-between items-baseline border-b border-black/10 pb-2">
              <span className="font-body-sm text-body-sm opacity-80">Grand Total</span>
              <span className="font-mono-data text-xl font-bold">$124,410.00</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-black/10 pb-2">
              <span className="font-body-sm text-body-sm opacity-80">GST %</span>
              <span className="font-mono-data font-medium">8% included</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-black/10 pb-2">
              <span className="font-body-sm text-body-sm opacity-80">Delivery Days</span>
              <span className="font-mono-data font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">local_shipping</span> 14 Days
              </span>
            </div>
            <div className="flex justify-between items-baseline border-b border-black/10 pb-2">
              <span className="font-body-sm text-body-sm opacity-80">Payment Terms</span>
              <span className="font-mono-data font-medium">Net 30</span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="font-body-sm text-body-sm opacity-80">Vendor Rating</span>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                <span className="font-mono-data font-bold">4.8</span>
              </div>
            </div>
          </div>
          <button className="w-full bg-on-tertiary-container text-tertiary-container rounded-full py-3 mt-8 font-body-md font-bold hover:bg-black/80 transition-colors shadow-lg relative z-10">
            Select & Approve
          </button>
        </div>
        
        {/* Vendor 2: TechCore LTD */}
        <div className="bg-surface-container-low border border-white/10 rounded-xl p-6 flex flex-col h-full relative overflow-hidden">
          {/* Subtle Inner Glow */}
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.03) 0%, transparent 50%)' }}></div>
          
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface font-semibold">TechCore LTD</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Vendor ID: VS-4420</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center border border-white/5">
              <span className="material-symbols-outlined text-on-surface-variant">dns</span>
            </div>
          </div>
          <div className="space-y-4 flex-1 relative z-10">
            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Grand Total</span>
              <span className="font-mono-data text-xl text-on-surface">$131,200.50</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant">GST %</span>
              <span className="font-mono-data text-on-surface">8% included</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Delivery Days</span>
              <span className="font-mono-data text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-on-surface-variant">local_shipping</span> 10 Days
              </span>
            </div>
            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Payment Terms</span>
              <span className="font-mono-data text-on-surface">Net 15</span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Vendor Rating</span>
              <div className="flex items-center gap-1 text-on-surface">
                <span className="material-symbols-outlined text-sm text-on-surface-variant" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
                <span className="font-mono-data font-medium">4.5</span>
              </div>
            </div>
          </div>
          <button className="w-full bg-surface-variant text-on-surface hover:text-white border border-white/10 rounded-full py-3 mt-8 font-body-md font-medium hover:bg-white/5 transition-colors relative z-10">
            Select & Approve
          </button>
        </div>
        
        {/* Vendor 3: Office Need Co */}
        <div className="bg-surface-container-low border border-white/10 rounded-xl p-6 flex flex-col h-full opacity-80 relative overflow-hidden">
          {/* Subtle Inner Glow */}
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.03) 0%, transparent 50%)' }}></div>
          
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface font-semibold">Office Need Co</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Vendor ID: VS-1102</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center border border-white/5">
              <span className="material-symbols-outlined text-on-surface-variant">inventory_2</span>
            </div>
          </div>
          <div className="space-y-4 flex-1 relative z-10">
            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Grand Total</span>
              <span className="font-mono-data text-xl text-on-surface">$135,000.00</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant">GST %</span>
              <span className="font-mono-data text-on-surface text-error flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">info</span> Excluded
              </span>
            </div>
            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Delivery Days</span>
              <span className="font-mono-data text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-on-surface-variant">local_shipping</span> 21 Days
              </span>
            </div>
            <div className="flex justify-between items-baseline border-b border-white/5 pb-2">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Payment Terms</span>
              <span className="font-mono-data text-on-surface">Net 45</span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="font-body-sm text-body-sm text-on-surface-variant">Vendor Rating</span>
              <div className="flex items-center gap-1 text-on-surface">
                <span className="material-symbols-outlined text-sm text-on-surface-variant" style={{ fontVariationSettings: '"FILL" 1' }}>star_half</span>
                <span className="font-mono-data font-medium">3.9</span>
              </div>
            </div>
          </div>
          <button className="w-full bg-transparent text-on-surface-variant hover:text-on-surface border border-white/5 rounded-full py-3 mt-8 font-body-md font-medium hover:bg-white/5 transition-colors relative z-10">
            Select & Approve
          </button>
        </div>
      </div>
      
      {/* Footer Meta / Audit */}
      <div className="flex items-center justify-center gap-2 text-on-surface-variant/50 font-mono-data text-xs py-4 border-t border-white/5">
        <span className="material-symbols-outlined text-sm">verified_user</span>
        <span>Audit Trail: Comparison generated on Oct 24, 2023 at 14:32 PST by Admin User.</span>
      </div>
    </div>
  );
}
