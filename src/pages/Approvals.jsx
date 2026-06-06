export function Approvals() {
  return (
    <div className="max-w-5xl mx-auto space-y-stack-md animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-container-high text-on-surface-variant border border-white/5">Purchase Order</span>
            <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-secondary-fixed/10 text-secondary-fixed border border-secondary-fixed/20">Awaiting Your Approval</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface">PO-2024-8992</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">Acme Corp Software Licensing Renewal</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-2 rounded-lg bg-transparent border border-error/50 text-error hover:bg-error/10 font-label-caps transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">close</span> Reject
          </button>
          <button className="flex-1 md:flex-none px-6 py-2 rounded-lg bg-tertiary-container text-on-tertiary-container font-label-caps hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(181,242,175,0.2)]">
            <span className="material-symbols-outlined text-sm">check</span> Approve PO
          </button>
        </div>
      </div>
      
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Details & Remarks (Spans 8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Progress Tracker Card */}
          <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-secondary-fixed"></div>
            <h2 className="font-display-md text-body-lg font-semibold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary-fixed">route</span>
              Approval Workflow
            </h2>
            <div className="relative pl-4">
              {/* Line connecting steps */}
              <div className="absolute left-[23px] top-4 bottom-8 w-px bg-white/10"></div>
              
              {/* Step 1: Submitted */}
              <div className="relative flex items-start gap-4 mb-8">
                <div className="w-6 h-6 rounded-full bg-surface-container-highest border border-white/20 flex items-center justify-center z-10 mt-0.5">
                  <span className="material-symbols-outlined text-[14px] text-on-surface-variant">check</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-body-md text-on-surface text-sm font-semibold">Request Submitted</h3>
                      <p className="font-body-sm text-on-surface-variant text-xs mt-1">Initiated by System</p>
                    </div>
                    <span className="font-mono-data text-mono-data text-on-surface-variant/50 text-xs">Oct 24, 09:00 AM</span>
                  </div>
                </div>
              </div>
              
              {/* Step 2: L1 Review */}
              <div className="relative flex items-start gap-4 mb-8">
                <div className="w-6 h-6 rounded-full bg-tertiary/20 border border-tertiary/50 flex items-center justify-center z-10 mt-0.5">
                  <span className="material-symbols-outlined text-[14px] text-tertiary">check</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-body-md text-on-surface text-sm font-semibold">L1 Review</h3>
                      <p className="font-body-sm text-tertiary text-xs mt-1 flex items-center gap-1">
                        Rahul Mehta <span className="text-on-surface-variant">(Approved)</span>
                      </p>
                    </div>
                    <span className="font-mono-data text-mono-data text-on-surface-variant/50 text-xs">Oct 25, 14:30 PM</span>
                  </div>
                  <div className="mt-3 p-3 bg-surface-container-lowest border border-white/5 rounded-lg">
                    <p className="font-body-sm text-on-surface-variant text-xs italic">"Budget verified against Q4 allocations. Looks good to proceed."</p>
                  </div>
                </div>
              </div>
              
              {/* Step 3: L2 Approval (Active) */}
              <div className="relative flex items-start gap-4 mb-8">
                <div className="w-6 h-6 rounded-full bg-secondary-fixed border border-secondary-fixed flex items-center justify-center z-10 mt-0.5 shadow-[0_0_15px_rgba(255,219,206,0.4)]">
                  <span className="material-symbols-outlined text-[14px] text-on-secondary-fixed">hourglass_empty</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-body-md text-secondary-fixed text-sm font-semibold">L2 Approval</h3>
                      <p className="font-body-sm text-secondary-fixed/80 text-xs mt-1 flex items-center gap-1">
                        Priya Shah <span className="text-on-surface-variant">(Awaiting)</span>
                      </p>
                    </div>
                    <span className="font-mono-data text-mono-data text-secondary-fixed/50 text-xs">Current</span>
                  </div>
                </div>
              </div>
              
              {/* Step 4: Generate PO */}
              <div className="relative flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-surface-container-highest border border-white/10 flex items-center justify-center z-10 mt-0.5">
                  <span className="material-symbols-outlined text-[14px] text-on-surface-variant/30">receipt</span>
                </div>
                <div className="flex-1 opacity-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-body-md text-on-surface text-sm font-semibold">Generate PO</h3>
                      <p className="font-body-sm text-on-surface-variant text-xs mt-1">System Action</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Remark Box */}
          <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-xl p-6">
            <h2 className="font-display-md text-body-lg font-semibold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-fixed-dim">edit_note</span>
              Add Remark
            </h2>
            <textarea className="w-full bg-surface-container-lowest border border-white/10 rounded-lg p-4 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary min-h-[120px] resize-y placeholder:text-on-surface-variant/50 font-body-sm" placeholder="Enter your comments or reason for rejection here..."></textarea>
            <div className="flex justify-end mt-3">
              <button className="px-4 py-2 rounded-lg bg-surface-container-high text-on-surface hover:bg-surface-bright font-label-caps transition-colors text-xs">
                Save Draft
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Column: Summary Widgets (Spans 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* High Contrast Amount Card */}
          <div className="rounded-xl p-6 bg-on-surface text-background relative overflow-hidden shadow-[0_0_20px_rgba(196,192,255,0.15)]">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="font-label-caps text-background/70 mb-2">Total PO Value</div>
              <div className="font-display-lg text-display-lg font-bold tracking-tight">
                $84,500<span className="text-xl text-background/50">.00</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm font-medium bg-background/10 inline-flex px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-sm">payments</span>
                Net 30 Terms
              </div>
            </div>
          </div>
          
          {/* Vendor Details Widget */}
          <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-xl p-5">
            <div className="font-label-caps text-on-surface-variant mb-4 flex justify-between items-center">
              Vendor Details
              <span className="material-symbols-outlined text-sm cursor-pointer hover:text-primary">open_in_new</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-primary-container/20 flex items-center justify-center text-primary border border-primary/20">
                <span className="material-symbols-outlined">corporate_fare</span>
              </div>
              <div>
                <div className="font-body-md font-semibold text-on-surface text-sm">Acme Corp Ltd.</div>
                <div className="font-body-sm text-on-surface-variant text-xs">VID-99281A</div>
              </div>
            </div>
            <div className="space-y-3 pt-3 border-t border-white/5">
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Category</span>
                <span className="text-on-surface font-medium">Software / IT</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Risk Score</span>
                <span className="text-tertiary flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">shield</span> Low</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Contract Exp</span>
                <span className="text-on-surface font-medium">Dec 31, 2025</span>
              </div>
            </div>
          </div>
          
          {/* Line Items Summary */}
          <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-xl p-5">
            <div className="font-label-caps text-on-surface-variant mb-4">Line Items (2)</div>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="pr-4">
                  <div className="font-body-md text-sm text-on-surface truncate">Enterprise License Renew...</div>
                  <div className="font-body-sm text-xs text-on-surface-variant mt-0.5">Qty: 500 @ $120/ea</div>
                </div>
                <div className="font-mono-data text-sm text-on-surface whitespace-nowrap">$60,000</div>
              </div>
              <div className="flex justify-between items-start">
                <div className="pr-4">
                  <div className="font-body-md text-sm text-on-surface truncate">Premium Support SLA</div>
                  <div className="font-body-sm text-xs text-on-surface-variant mt-0.5">Qty: 1 @ $24,500/ea</div>
                </div>
                <div className="font-mono-data text-sm text-on-surface whitespace-nowrap">$24,500</div>
              </div>
            </div>
            <button className="w-full mt-4 py-2 border border-white/10 rounded-lg text-xs font-label-caps text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
              View Full PR Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
