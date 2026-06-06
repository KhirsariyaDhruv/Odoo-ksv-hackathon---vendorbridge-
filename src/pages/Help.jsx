export function Help() {
  return (
    <div className="max-w-[1200px] mx-auto animate-fade-in z-10 relative">
      {/* Page Header */}
      <div className="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-display-md font-display-md text-on-surface mb-2">Help Center</h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">Find answers, submit requests, and track your ongoing support interactions.</p>
        </div>
        <button className="bg-primary hover:bg-primary-container text-[#1a1a24] font-label-caps text-label-caps px-6 py-3 rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(196,192,255,0.2)] transition-all hover:shadow-[0_0_25px_rgba(196,192,255,0.4)]">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>add</span>
          New Ticket
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-grid">
        {/* Quick Actions / FAQ Categories (Span 8) */}
        <div className="md:col-span-8 flex flex-col gap-gutter-grid">
          <h3 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">category</span>
            Knowledge Base
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Category Card 1 */}
            <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-2xl p-5 hover:-translate-y-1 transition-transform duration-300 group cursor-pointer relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-primary-container/10 to-transparent pointer-events-none rounded-tl-2xl"></div>
              <div className="w-12 h-12 rounded-xl bg-primary-container/10 flex items-center justify-center mb-4 group-hover:bg-primary-container/20 transition-colors">
                <span className="material-symbols-outlined text-primary text-[28px]">account_balance_wallet</span>
              </div>
              <h4 className="text-body-md font-body-md font-semibold text-on-surface mb-1">Account & Billing</h4>
              <p className="text-body-sm font-body-sm text-outline">Manage subscriptions, invoices, and payment methods.</p>
            </div>
            
            {/* Category Card 2 */}
            <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-2xl p-5 hover:-translate-y-1 transition-transform duration-300 group cursor-pointer relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-tertiary-container/10 to-transparent pointer-events-none rounded-tl-2xl"></div>
              <div className="w-12 h-12 rounded-xl bg-tertiary-container/10 flex items-center justify-center mb-4 group-hover:bg-tertiary-container/20 transition-colors">
                <span className="material-symbols-outlined text-tertiary text-[28px]">api</span>
              </div>
              <h4 className="text-body-md font-body-md font-semibold text-on-surface mb-1">API Integrations</h4>
              <p className="text-body-sm font-body-sm text-outline">Webhooks, API keys, and endpoint documentation.</p>
            </div>
            
            {/* Category Card 3 */}
            <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-2xl p-5 hover:-translate-y-1 transition-transform duration-300 group cursor-pointer relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-secondary-container/10 to-transparent pointer-events-none rounded-tl-2xl"></div>
              <div className="w-12 h-12 rounded-xl bg-secondary-container/10 flex items-center justify-center mb-4 group-hover:bg-secondary-container/20 transition-colors">
                <span className="material-symbols-outlined text-secondary text-[28px]">security</span>
              </div>
              <h4 className="text-body-md font-body-md font-semibold text-on-surface mb-1">Security & Auth</h4>
              <p className="text-body-sm font-body-sm text-outline">2FA setup, SSO configuration, and role management.</p>
            </div>
          </div>
          
          {/* Recent Tickets Table */}
          <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-2xl mt-4 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface">Recent Support Tickets</h3>
              <button className="text-label-caps font-label-caps text-primary hover:text-primary-container transition-colors">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-surface-container-highest/50">
                    <th className="py-4 px-6 text-label-caps font-label-caps text-on-surface-variant font-medium">Ticket ID</th>
                    <th className="py-4 px-6 text-label-caps font-label-caps text-on-surface-variant font-medium">Subject</th>
                    <th className="py-4 px-6 text-label-caps font-label-caps text-on-surface-variant font-medium">Status</th>
                    <th className="py-4 px-6 text-label-caps font-label-caps text-on-surface-variant font-medium text-right">Last Updated</th>
                  </tr>
                </thead>
                <tbody className="text-body-sm font-body-sm">
                  <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <td className="py-4 px-6 text-mono-data font-mono-data text-outline">#VB-8921</td>
                    <td className="py-4 px-6 text-on-surface font-medium">Webhook delivery failing on staging env</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/20 border border-secondary/20 text-secondary text-[11px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_5px_currentColor]"></span>
                        Pending Action
                      </span>
                    </td>
                    <td className="py-4 px-6 text-outline text-right">2 hrs ago</td>
                  </tr>
                  <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <td className="py-4 px-6 text-mono-data font-mono-data text-outline">#VB-8845</td>
                    <td className="py-4 px-6 text-on-surface font-medium">Request to upgrade rate limits</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container/20 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_currentColor] animate-pulse"></span>
                        In Progress
                      </span>
                    </td>
                    <td className="py-4 px-6 text-outline text-right">1 day ago</td>
                  </tr>
                  <tr className="hover:bg-white/[0.02] transition-colors cursor-pointer">
                    <td className="py-4 px-6 text-mono-data font-mono-data text-outline">#VB-8710</td>
                    <td className="py-4 px-6 text-on-surface font-medium text-outline">Clarification on SLA terms for Q3</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-container/20 border border-tertiary/20 text-tertiary text-[11px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                        Resolved
                      </span>
                    </td>
                    <td className="py-4 px-6 text-outline text-right">3 days ago</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Right Sidebar / System Status (Span 4) */}
        <div className="md:col-span-4 flex flex-col gap-gutter-grid">
          {/* System Status Card */}
          <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-2xl p-6 bg-gradient-to-br from-surface-container-lowest to-surface-container-low">
            <h3 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface mb-4">System Status</h3>
            <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-tertiary-container/5 border border-tertiary/10">
              <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center relative">
                <span className="material-symbols-outlined text-tertiary">check_circle</span>
                <span className="absolute inset-0 rounded-full bg-tertiary/20 animate-ping opacity-50"></span>
              </div>
              <div>
                <p className="text-body-md font-body-md font-semibold text-tertiary">All Systems Operational</p>
                <p className="text-label-caps font-label-caps text-outline mt-1">Updated 5 mins ago</p>
              </div>
            </div>
            <ul className="flex flex-col gap-3 text-body-sm font-body-sm">
              <li className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-on-surface-variant">API Endpoints</span>
                <span className="text-tertiary font-mono-data text-[12px]">99.99%</span>
              </li>
              <li className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-on-surface-variant">Dashboard</span>
                <span className="text-tertiary font-mono-data text-[12px]">100%</span>
              </li>
              <li className="flex items-center justify-between py-2">
                <span className="text-on-surface-variant">Webhooks</span>
                <span className="text-tertiary font-mono-data text-[12px]">99.98%</span>
              </li>
            </ul>
            <button className="w-full mt-4 py-2 border border-outline-variant/30 rounded-lg text-label-caps font-label-caps text-on-surface-variant hover:bg-white/5 transition-colors">View Status Page</button>
          </div>
          
          {/* Contact Options */}
          <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-2xl p-6 relative overflow-hidden">
            {/* Decorative gradient blob */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-container/20 rounded-full blur-[40px] pointer-events-none"></div>
            
            <h3 className="text-headline-lg-mobile font-headline-lg-mobile text-on-surface mb-2">Still need help?</h3>
            <p className="text-body-sm font-body-sm text-outline mb-6">Our enterprise support team is available 24/7.</p>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-lowest border border-white/5 hover:border-primary/30 transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">forum</span>
                </div>
                <div>
                  <p className="text-body-sm font-body-sm font-semibold text-on-surface">Live Chat</p>
                  <p className="text-label-caps font-label-caps text-outline mt-0.5">Under 2 min wait</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-lowest border border-white/5 hover:border-primary/30 transition-colors group cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="text-body-sm font-body-sm font-semibold text-on-surface">Schedule Call</p>
                  <p className="text-label-caps font-label-caps text-outline mt-0.5">With tech specialist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
