export function Dashboard() {
  return (
    <>
      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-md">
        <div>
          <h1 className="font-display-md text-headline-lg font-semibold text-on-surface mb-1">Overview Dashboard</h1>
          <p className="font-body-md text-body-sm text-on-surface-variant">Welcome back. Here's what's happening with your supply chain today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-transparent hover:bg-surface-container-high text-on-surface border border-outline-variant/30 rounded-full py-2 px-4 flex items-center gap-2 transition-colors font-body-md text-body-sm">
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Add Vendor
          </button>
          <button className="bg-primary hover:bg-primary-container text-on-primary rounded-full py-2 px-4 flex items-center gap-2 transition-colors font-body-md text-body-sm font-medium shadow-[0_0_15px_rgba(196,192,255,0.2)]">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New RFQ
          </button>
        </div>
      </div>

      {/* Main Content Grid (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-grid">
        {/* KPI Section */}
        <div className="md:col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-gutter-grid">
          
          {/* KPI 1 */}
          <div className="glass-panel rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <span className="material-symbols-outlined text-primary icon-fill">request_quote</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-surface-variant text-on-surface text-[11px] font-mono-data tracking-wider">
                <span className="material-symbols-outlined text-[14px] text-tertiary">trending_up</span> 14%
              </span>
            </div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">Active RFQs</h3>
            <div className="font-display-md text-display-md text-on-surface font-semibold text-shadow-sm shadow-primary/50">12</div>
          </div>

          {/* KPI 2 */}
          <div className="glass-panel rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
                <span className="material-symbols-outlined text-secondary icon-fill">fact_check</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-surface-variant text-on-surface text-[11px] font-mono-data tracking-wider">
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant">horizontal_rule</span> 0%
              </span>
            </div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">Pending Approvals</h3>
            <div className="font-display-md text-display-md text-on-surface font-semibold text-shadow-sm shadow-secondary/50">05</div>
          </div>

          {/* KPI 3 */}
          <div className="glass-panel rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center border border-tertiary/20">
                <span className="material-symbols-outlined text-tertiary icon-fill">shopping_cart</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-surface-variant text-on-surface text-[11px] font-mono-data tracking-wider">
                <span className="material-symbols-outlined text-[14px] text-tertiary">trending_up</span> 8.2%
              </span>
            </div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">POs This Month</h3>
            <div className="font-mono-data text-display-md text-on-surface font-medium text-shadow-sm shadow-tertiary/50 tracking-tight">$2.3<span className="text-headline-lg text-on-surface-variant">M</span></div>
          </div>

          {/* KPI 4 */}
          <div className="glass-panel rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-error/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center border border-error/20">
                <span className="material-symbols-outlined text-error icon-fill">receipt_long</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-error/10 text-error border border-error/20 text-[11px] font-mono-data tracking-wider">
                Action Needed
              </span>
            </div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">Overdue Invoices</h3>
            <div className="flex items-baseline gap-3">
              <div className="font-display-md text-display-md text-error font-semibold text-shadow-sm">03</div>
              <button className="text-body-sm text-on-surface-variant hover:text-on-surface underline decoration-white/20 underline-offset-4">View All</button>
            </div>
          </div>
        </div>

        {/* Featured Highlight / Mini Chart */}
        <div className="md:col-span-12 lg:col-span-4 bg-primary/10 border border-primary/20 rounded-3xl p-6 relative overflow-hidden flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
          <div className="relative z-10 flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(196,192,255,0.4)]">
                <span className="material-symbols-outlined text-on-primary text-[16px] icon-fill">account_balance_wallet</span>
              </div>
              <span className="font-body-md text-body-md text-on-surface font-medium">Total Spend</span>
            </div>
            <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-surface hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">more_horiz</span>
            </button>
          </div>
          <div className="relative z-10 mt-auto">
            <div className="font-mono-data text-display-md text-on-surface font-semibold tracking-tight mb-2">$14,560<span className="text-[20px] text-on-surface-variant font-normal">.00</span></div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 bg-tertiary/20 text-tertiary rounded-md text-[11px] font-mono-data flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">arrow_outward</span> 24.2%
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">vs last month</span>
            </div>
            {/* Abstract Chart Representation */}
            <div className="h-16 w-full flex items-end gap-1 mt-6">
              <div className="flex-1 bg-primary/20 rounded-t-sm h-[30%] hover:bg-primary/40 transition-colors"></div>
              <div className="flex-1 bg-primary/30 rounded-t-sm h-[50%] hover:bg-primary/50 transition-colors"></div>
              <div className="flex-1 bg-primary/20 rounded-t-sm h-[40%] hover:bg-primary/40 transition-colors"></div>
              <div className="flex-1 bg-primary/40 rounded-t-sm h-[70%] hover:bg-primary/60 transition-colors"></div>
              <div className="flex-1 bg-primary/50 rounded-t-sm h-[60%] hover:bg-primary/70 transition-colors"></div>
              <div className="flex-1 bg-primary rounded-t-sm h-[90%] shadow-[0_0_10px_rgba(196,192,255,0.5)]"></div>
              <div className="flex-1 bg-primary/30 rounded-t-sm h-[45%] hover:bg-primary/50 transition-colors"></div>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="md:col-span-12 glass-panel rounded-3xl p-6 mt-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display-md text-headline-lg-mobile font-semibold text-on-surface">Recent Purchase Orders</h2>
            <button className="text-body-sm text-primary hover:text-primary-container transition-colors font-medium">View All Orders</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold uppercase tracking-wider">PO Number</th>
                  <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold uppercase tracking-wider">Vendor</th>
                  <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold uppercase tracking-wider text-right">Amount</th>
                  <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold uppercase tracking-wider text-center">Status</th>
                </tr>
              </thead>
              <tbody className="font-body-sm text-body-sm text-on-surface">
                {[
                  { po: 'PO-2023-089', vendor: 'TechCorp Solutions', init: 'TC', date: 'Oct 24, 2023', amt: '$45,200.00', status: 'Pending', sColor: 'secondary' },
                  { po: 'PO-2023-088', vendor: 'Global Logistics Inc.', init: 'GL', date: 'Oct 22, 2023', amt: '$12,850.50', status: 'Approved', sColor: 'tertiary' },
                  { po: 'PO-2023-087', vendor: 'Office Supplies Co.', init: 'OS', date: 'Oct 20, 2023', amt: '$1,240.00', status: 'Approved', sColor: 'tertiary' },
                  { po: 'PO-2023-086', vendor: 'NetSys Hardware', init: 'NS', date: 'Oct 18, 2023', amt: '$89,000.00', status: 'Draft', sColor: 'surface-variant' }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="py-4 px-4 font-mono-data font-medium text-primary">{row.po}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-[12px] font-bold text-on-surface-variant">{row.init}</div>
                        <span className="">{row.vendor}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-on-surface-variant">{row.date}</td>
                    <td className="py-4 px-4 text-right font-mono-data">{row.amt}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full ${row.sColor === 'surface-variant' ? 'bg-surface-variant border border-outline-variant/30 text-on-surface-variant' : `bg-${row.sColor}/10 border border-${row.sColor}/20 text-${row.sColor}`} text-[11px] font-medium tracking-wide`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
