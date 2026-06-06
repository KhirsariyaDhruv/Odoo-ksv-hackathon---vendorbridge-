export function RFQs() {
  return (
    <div className="flex-1 p-container-padding flex justify-center pb-32 md:pb-container-padding animate-fade-in z-10 relative">
      <div className="w-full max-w-4xl max-w-[800px]">
        {/* Header */}
        <div className="mb-stack-lg">
          <h2 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface mb-2">Create New RFQ</h2>
          <p className="font-body-md text-body-lg text-on-surface-variant">Initiate a request for quotation to find the best vendors for your needs.</p>
        </div>
        
        {/* Progress Stepper */}
        <div className="mb-stack-lg relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-highest -translate-y-1/2 z-0 rounded-full"></div>
          <div className="absolute top-1/2 left-0 w-1/3 h-0.5 bg-primary -translate-y-1/2 z-0 rounded-full shadow-[0_0_10px_rgba(196,192,255,0.4)]"></div>
          <div className="relative z-10 flex justify-between">
            {/* Step 1: Active */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-display-md font-bold shadow-[0_0_15px_rgba(135,129,255,0.4)]">
                1
              </div>
              <span className="font-body-md text-label-caps uppercase tracking-wider text-primary">Details</span>
            </div>
            {/* Step 2: Inactive */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center font-display-md">
                2
              </div>
              <span className="font-body-md text-label-caps uppercase tracking-wider text-on-surface-variant">Items</span>
            </div>
            {/* Step 3: Inactive */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant text-on-surface-variant flex items-center justify-center font-display-md">
                3
              </div>
              <span className="font-body-md text-label-caps uppercase tracking-wider text-on-surface-variant">Vendors</span>
            </div>
          </div>
        </div>
        
        {/* Form Container */}
        <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-xl p-stack-md relative overflow-hidden">
          {/* Subtle top-left glow */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <form className="space-y-stack-md relative z-10">
            <div className="space-y-stack-sm">
              <label className="block font-body-md text-body-sm text-on-surface-variant ml-1" htmlFor="rfq-title">RFQ Title</label>
              <input className="w-full bg-surface-container-lowest border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-3 px-4 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/30 transition-all duration-200" id="rfq-title" placeholder="e.g., Q3 Office Furniture Refresh" type="text" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
              <div className="space-y-stack-sm">
                <label className="block font-body-md text-body-sm text-on-surface-variant ml-1" htmlFor="category">Category</label>
                <div className="relative">
                  <select className="w-full bg-surface-container-lowest border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-3 pl-4 pr-10 text-body-md font-body-md text-on-surface appearance-none cursor-pointer transition-all duration-200" id="category" defaultValue="furniture">
                    <option disabled value="">Select category...</option>
                    <option value="furniture">Furniture & Fixtures</option>
                    <option value="it">IT Equipment</option>
                    <option value="services">Professional Services</option>
                    <option value="raw">Raw Materials</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                </div>
              </div>
              <div className="space-y-stack-sm">
                <label className="block font-body-md text-body-sm text-on-surface-variant ml-1" htmlFor="deadline">Submission Deadline</label>
                <div className="relative">
                  <input className="w-full bg-surface-container-lowest border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-3 px-4 text-body-md font-body-md text-on-surface transition-all duration-200 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 cursor-pointer" id="deadline" type="date" />
                </div>
              </div>
            </div>
            <div className="space-y-stack-sm">
              <label className="block font-body-md text-body-sm text-on-surface-variant ml-1" htmlFor="description">Description & Requirements</label>
              <textarea className="w-full bg-surface-container-lowest border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-3 px-4 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/30 resize-none transition-all duration-200" id="description" placeholder="Provide detailed requirements, specifications, or context for this request..." rows={4}></textarea>
            </div>
            <div className="pt-stack-sm flex justify-end gap-4 border-t border-white/5 mt-stack-md">
              <button className="px-6 py-2.5 rounded-full font-body-md text-body-md text-on-surface-variant border border-outline-variant hover:bg-surface-container-high transition-colors" type="button">
                Cancel
              </button>
              <button className="px-6 py-2.5 rounded-full font-body-md text-body-md text-on-primary bg-primary hover:bg-primary-fixed-dim transition-colors shadow-[0_0_15px_rgba(196,192,255,0.4)] flex items-center gap-2 group" type="button">
                Next Step
                <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
