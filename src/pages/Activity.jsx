export function Activity() {
  return (
    <div className="max-w-[1200px] mx-auto animate-fade-in">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-stack-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Activity & Logs</h1>
          <p className="font-body-md text-body-sm text-on-surface-variant max-w-xl">Immutable audit trail of all procurement events, approvals, and system changes across the enterprise.</p>
        </div>
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 bg-surface-container-lowest p-1 rounded-full border border-white/10 shadow-inner">
          <button className="px-4 py-1.5 rounded-full bg-surface-container-high text-on-surface font-label-caps text-[11px] border border-white/5 shadow-md">All Events</button>
          <button className="px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-white/5 font-label-caps text-[11px] transition-colors">RFQs</button>
          <button className="px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-white/5 font-label-caps text-[11px] transition-colors">Approvals</button>
          <button className="px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-white/5 font-label-caps text-[11px] transition-colors">Invoices</button>
          <button className="px-4 py-1.5 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-white/5 font-label-caps text-[11px] transition-colors">Vendors</button>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-grid">
        {/* Timeline Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-xl p-6 relative">
            <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
              <h2 className="font-mono-data text-body-md text-on-surface flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#c4c0ff]"></span>
                Live Feed
              </h2>
              <span className="font-mono-data text-[12px] text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">sync</span> Auto-updating
              </span>
            </div>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[23px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-white/10 before:via-white/5 before:to-transparent z-0 pl-12 md:pl-0">
              
              {/* Event Item 1: Quotation Selected */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group z-10 timeline-item">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-lowest border border-secondary/30 shadow-[0_0_20px_rgba(255,181,153,0.15)] text-secondary absolute left-0 md:left-1/2 md:-translate-x-1/2 z-20 group-hover:scale-110 transition-transform duration-300 group-hover:border-secondary/60">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>contract</span>
                </div>
                <div className="absolute left-[23px] top-[48px] bottom-[-24px] w-[2px] bg-gradient-to-b from-white/10 to-white/0 z-0 md:hidden"></div>
                <div className="w-full md:w-[calc(50%-3rem)] bg-surface-container-lowest border border-white/5 rounded-lg p-4 hover:border-secondary/30 transition-colors duration-300 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-secondary opacity-50"></div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-label-caps text-[10px] text-secondary tracking-wider uppercase bg-secondary/10 px-2 py-0.5 rounded">Quotation Selected</span>
                    <span className="font-mono-data text-[11px] text-on-surface-variant">10:42 AM</span>
                  </div>
                  <h3 className="font-body-md text-body-sm font-semibold text-on-surface mb-1">TechCorp IT Infrastructure</h3>
                  <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed mb-3">Quotation Q-2023-891 from 'Global Tech Supplies' selected for review. Amount: $45,200.00.</p>
                  <div className="flex items-center gap-2 border-t border-white/5 pt-3">
                    <div className="w-5 h-5 rounded-full bg-surface-variant flex items-center justify-center">
                      <span className="material-symbols-outlined text-[10px] text-on-surface">person</span>
                    </div>
                    <span className="font-mono-data text-[11px] text-on-surface-variant">Action by: M. Chen</span>
                  </div>
                </div>
              </div>
              
              {/* Event Item 2: Approval Pending */}
              <div className="relative flex items-center justify-between md:justify-normal md:even:flex-row-reverse group z-10 timeline-item">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-lowest border border-tertiary/30 shadow-[0_0_20px_rgba(154,213,148,0.15)] text-tertiary absolute left-0 md:left-1/2 md:-translate-x-1/2 z-20 group-hover:scale-110 transition-transform duration-300 group-hover:border-tertiary/60">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>pending_actions</span>
                </div>
                <div className="absolute left-[23px] top-[48px] bottom-[-24px] w-[2px] bg-gradient-to-b from-white/10 to-white/0 z-0 md:hidden"></div>
                <div className="w-full md:w-[calc(50%-3rem)] bg-surface-container-lowest border border-white/5 rounded-lg p-4 hover:border-tertiary/30 transition-colors duration-300 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-tertiary opacity-50"></div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-label-caps text-[10px] text-tertiary tracking-wider uppercase bg-tertiary/10 px-2 py-0.5 rounded">Approval Pending</span>
                    <span className="font-mono-data text-[11px] text-on-surface-variant">09:15 AM</span>
                  </div>
                  <h3 className="font-body-md text-body-sm font-semibold text-on-surface mb-1">Software Licensing Renewal 2024</h3>
                  <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed mb-3">PO Request #REQ-882 awaiting final sign-off from Department Head.</p>
                  <div className="flex items-center gap-2 border-t border-white/5 pt-3">
                    <div className="w-5 h-5 rounded-full bg-surface-variant flex items-center justify-center">
                      <span className="material-symbols-outlined text-[10px] text-on-surface">person</span>
                    </div>
                    <span className="font-mono-data text-[11px] text-on-surface-variant">Routed to: S. Williams</span>
                  </div>
                </div>
              </div>
              
              {/* Event Item 3: RFQ Published */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group z-10 timeline-item">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-lowest border border-primary/30 shadow-[0_0_20px_rgba(196,192,255,0.15)] text-primary absolute left-0 md:left-1/2 md:-translate-x-1/2 z-20 group-hover:scale-110 transition-transform duration-300 group-hover:border-primary/60">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>campaign</span>
                </div>
                <div className="absolute left-[23px] top-[48px] bottom-[-24px] w-[2px] bg-gradient-to-b from-white/10 to-white/0 z-0 md:hidden"></div>
                <div className="w-full md:w-[calc(50%-3rem)] bg-surface-container-lowest border border-white/5 rounded-lg p-4 hover:border-primary/30 transition-colors duration-300 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-50"></div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-label-caps text-[10px] text-primary tracking-wider uppercase bg-primary/10 px-2 py-0.5 rounded">RFQ Published</span>
                    <span className="font-mono-data text-[11px] text-on-surface-variant">Yesterday, 16:30</span>
                  </div>
                  <h3 className="font-body-md text-body-sm font-semibold text-on-surface mb-1">Office Furniture Expansion</h3>
                  <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed mb-3">RFQ-2023-045 broadcasted to 12 verified vendors in category 'Facilities'.</p>
                  <div className="flex items-center gap-2 border-t border-white/5 pt-3">
                    <div className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center border border-white/10">
                      <span className="material-symbols-outlined text-[12px] text-on-surface-variant">robot_2</span>
                    </div>
                    <span className="font-mono-data text-[11px] text-on-surface-variant">Action by: System (Auto-schedule)</span>
                  </div>
                </div>
              </div>
              
              {/* Load More */}
              <div className="flex justify-center pt-8 relative z-20">
                <button className="px-6 py-2 rounded-full border border-white/10 text-on-surface-variant font-label-caps hover:bg-white/5 hover:text-on-surface transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">expand_more</span> Load Older Events
                </button>
              </div>
              
            </div>
          </div>
        </div>
        
        {/* Right Sidebar / Statistics & Search Context */}
        <div className="lg:col-span-4 space-y-6">
          {/* Search within logs */}
          <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-xl p-5">
            <h3 className="font-mono-data text-body-sm text-on-surface mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary">filter_alt</span> Advanced Search
            </h3>
            <div className="space-y-3">
              <div className="relative">
                <input className="w-full bg-surface-container-lowest border border-white/10 rounded-lg py-2.5 px-3 text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-colors" placeholder="Event ID or Keyword" type="text" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-on-surface-variant">calendar_today</span>
                  <input className="w-full bg-surface-container-lowest border border-white/10 rounded-lg py-2.5 pl-8 pr-3 text-[12px] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-colors" placeholder="From Date" type="text" />
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-on-surface-variant">calendar_today</span>
                  <input className="w-full bg-surface-container-lowest border border-white/10 rounded-lg py-2.5 pl-8 pr-3 text-[12px] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-colors" placeholder="To Date" type="text" />
                </div>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-on-surface-variant">person</span>
                <input className="w-full bg-surface-container-lowest border border-white/10 rounded-lg py-2.5 pl-8 pr-3 text-body-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-colors" placeholder="User or System Agent" type="text" />
              </div>
              <button className="w-full py-2 bg-surface-container-high hover:bg-white/10 text-on-surface rounded-lg font-label-caps border border-white/10 transition-colors mt-2">Apply Filters</button>
            </div>
          </div>
          
          {/* Summary Stats Widget */}
          <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-xl p-5 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
            <h3 className="font-mono-data text-body-sm text-on-surface mb-4">Event Frequency (7d)</h3>
            {/* Mini Chart Visualization */}
            <div className="h-24 w-full flex items-end justify-between gap-1 mb-4 border-b border-white/10 pb-2">
              <div className="w-full bg-primary/20 rounded-t-sm h-[30%] hover:bg-primary/40 transition-colors relative group/bar"><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono-data text-on-surface-variant opacity-0 group-hover/bar:opacity-100 transition-opacity">12</span></div>
              <div className="w-full bg-primary/20 rounded-t-sm h-[45%] hover:bg-primary/40 transition-colors relative group/bar"><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono-data text-on-surface-variant opacity-0 group-hover/bar:opacity-100 transition-opacity">18</span></div>
              <div className="w-full bg-primary/20 rounded-t-sm h-[25%] hover:bg-primary/40 transition-colors relative group/bar"><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono-data text-on-surface-variant opacity-0 group-hover/bar:opacity-100 transition-opacity">8</span></div>
              <div className="w-full bg-primary/60 rounded-t-sm h-[80%] hover:bg-primary/80 transition-colors shadow-[0_0_10px_rgba(196,192,255,0.3)] relative group/bar"><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono-data text-on-surface-variant opacity-0 group-hover/bar:opacity-100 transition-opacity">42</span></div>
              <div className="w-full bg-primary/20 rounded-t-sm h-[60%] hover:bg-primary/40 transition-colors relative group/bar"><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono-data text-on-surface-variant opacity-0 group-hover/bar:opacity-100 transition-opacity">24</span></div>
              <div className="w-full bg-primary/20 rounded-t-sm h-[35%] hover:bg-primary/40 transition-colors relative group/bar"><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono-data text-on-surface-variant opacity-0 group-hover/bar:opacity-100 transition-opacity">15</span></div>
              <div className="w-full bg-primary/40 rounded-t-sm h-[50%] hover:bg-primary/60 transition-colors relative group/bar"><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono-data text-on-surface-variant opacity-0 group-hover/bar:opacity-100 transition-opacity">21</span></div>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant">
              <div>
                <p className="font-label-caps text-[10px] uppercase tracking-wider mb-1">Total Events</p>
                <p className="font-display-md text-[24px] text-on-surface leading-none">140</p>
              </div>
              <div className="text-right">
                <p className="font-label-caps text-[10px] uppercase tracking-wider mb-1">Peak Day</p>
                <p className="font-mono-data text-[14px] text-primary">Wednesday</p>
              </div>
            </div>
          </div>
          
          {/* System Status */}
          <div className="bg-surface-container-lowest rounded-xl p-4 border border-white/5 flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_#b5f2af] animate-pulse"></div>
              <span className="font-mono-data text-[12px] text-on-surface-variant">Audit Trail Integrity</span>
            </div>
            <span className="font-label-caps text-[10px] bg-tertiary/10 text-tertiary px-2 py-1 rounded border border-tertiary/20">VERIFIED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
