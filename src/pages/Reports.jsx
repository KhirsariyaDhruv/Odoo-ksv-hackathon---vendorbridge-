import { useState, useEffect } from 'react';
import api from '../api';

export function Reports() {
  const [data, setData] = useState({
    totalSpend: 0,
    activeVendors: 0,
    poFulfillment: 0,
    overdueInvoices: [],
    topVendors: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        const [ordersRes, vendorsRes] = await Promise.all([
          api.get('/orders'),
          api.get('/vendors')
        ]);
        
        const allOrders = ordersRes.data;
        const allVendors = vendorsRes.data;
        
        const paidOrders = allOrders.filter(o => o.status === 'Paid');
        const totalSpend = paidOrders.reduce((sum, o) => sum + o.amount, 0);
        
        const poFulfillment = allOrders.length > 0 
          ? Math.round((paidOrders.length / allOrders.length) * 100) 
          : 0;
          
        const overdue = allOrders.filter(o => {
          if (o.status === 'Paid' || o.status === 'Rejected') return false;
          const due = new Date(o.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000;
          return new Date().getTime() > due;
        });

        const vendorSpend = {};
        allOrders.forEach(o => {
          if (!vendorSpend[o.vendorId]) {
            vendorSpend[o.vendorId] = { vendor: o.vendor, spend: 0 };
          }
          if (o.status === 'Paid') {
             vendorSpend[o.vendorId].spend += o.amount;
          }
        });
        
        const topVendors = Object.values(vendorSpend)
          .sort((a, b) => b.spend - a.spend)
          .slice(0, 3);

        setData({
          totalSpend,
          activeVendors: allVendors.length,
          poFulfillment,
          overdueInvoices: overdue,
          topVendors
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReportsData();
  }, []);

  const formatCurrency = (amount) => {
    if (amount >= 100000) return `$${(amount / 1000).toFixed(1)}k`;
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="flex-1 flex flex-col gap-stack-md overflow-x-hidden animate-fade-in">
      {/* Page Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-4">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface tracking-tight mb-2">Reports & Analytics</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Analyze spending, vendor performance, and operational efficiency.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Month Selector */}
          <div className="relative">
            <button className="bg-surface/60 backdrop-blur-xl border border-white/10 flex items-center gap-2 px-4 py-2 rounded-full font-body-sm text-body-sm text-on-surface hover:bg-surface-container-high transition-colors group shadow-inner">
              <span className="material-symbols-outlined text-[18px] text-primary">calendar_month</span>
              {new Date().toLocaleString('default', { month: 'short', year: 'numeric' })}
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-on-surface">expand_more</span>
            </button>
          </div>
          {/* Export Button */}
          <button className="bg-surface-container flex items-center gap-2 px-5 py-2 rounded-full font-body-sm text-body-sm text-on-surface border border-white/10 hover:border-primary/50 hover:text-primary transition-all group shadow-inner">
            <span className="material-symbols-outlined text-[18px] group-hover:text-primary">download</span>
            Export CSV
          </button>
        </div>
      </div>
      
      {/* Dashboard Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-grid">
        {/* Card 1: Total Spend (Primary Accent) */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-[0_0_20px_rgba(196,192,255,0.15)]">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <span className="material-symbols-outlined text-5xl text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>account_balance_wallet</span>
          </div>
          <p className="font-label-caps text-label-caps text-primary uppercase tracking-wider mb-2">Total Spend</p>
          <h3 className="font-display-md text-display-md text-on-surface mb-4">{loading ? '-' : formatCurrency(data.totalSpend)}</h3>
          <div className="h-12 w-full mt-auto">
            <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 30" width="100%">
              <path className="text-primary" d="M0,25 L20,15 L40,20 L60,5 L80,10 L100,2" fill="none" stroke="currentColor" strokeWidth="2"></path>
              <path className="text-primary/10" d="M0,25 L20,15 L40,20 L60,5 L80,10 L100,2 L100,30 L0,30 Z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
        
        {/* Card 2: Active Vendors (Secondary/Orange Accent) */}
        <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 shadow-[0_0_20px_rgba(255,181,153,0.15)]">
          <p className="font-label-caps text-label-caps text-secondary uppercase tracking-wider mb-2">Active Vendors</p>
          <h3 className="font-display-md text-display-md text-on-surface mb-4">{loading ? '-' : data.activeVendors}</h3>
          <div className="h-12 w-full mt-auto">
            <svg height="100%" preserveAspectRatio="none" viewBox="0 0 100 30" width="100%">
              <path className="text-secondary" d="M0,10 L30,12 L50,8 L70,15 L100,5" fill="none" stroke="currentColor" strokeWidth="2"></path>
            </svg>
          </div>
        </div>
        
        {/* Card 3: PO Fulfillment (Tertiary/Green Accent) */}
        <div className="bg-tertiary/10 border border-tertiary/20 rounded-xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <p className="font-label-caps text-label-caps text-tertiary uppercase tracking-wider mb-2">PO Fulfillment</p>
          <h3 className="font-display-md text-display-md text-on-surface mb-4">{loading ? '-' : `${data.poFulfillment}%`}</h3>
          <div className="h-12 w-full mt-auto flex items-end">
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full rounded-full shadow-[0_0_10px_rgba(154,213,148,0.5)]" style={{ width: `${data.poFulfillment}%` }}></div>
            </div>
          </div>
        </div>
        
        {/* Card 4: Overdue Invoices (Error/Red Accent) */}
        <div className="bg-surface/50 backdrop-blur-xl border border-error/20 shadow-inner rounded-xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <p className="font-label-caps text-label-caps text-error uppercase tracking-wider mb-2">Overdue Invoices</p>
          <h3 className="font-display-md text-display-md text-on-surface mb-4">{loading ? '-' : data.overdueInvoices.length}</h3>
          <div className="mt-auto space-y-2">
            {!loading && data.overdueInvoices.length === 0 ? (
               <div className="text-on-surface-variant font-body-sm">No overdue invoices.</div>
            ) : (
               data.overdueInvoices.slice(0, 2).map(inv => (
                <div key={inv.id} className="flex justify-between items-center font-mono-data text-mono-data text-on-surface-variant border-b border-white/5 pb-1">
                  <span>{inv.poNumber}</span>
                  <span className="text-error">-${inv.amount.toFixed(0)}</span>
                </div>
               ))
            )}
          </div>
        </div>
      </div>
      
      {/* Detailed Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter-grid mt-4">
        {/* Main Chart (Takes up 2 columns) */}
        <div className="lg:col-span-2 bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-xl p-6 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-6 z-10">
            <div>
              <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Spending Trends</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Comparison vs Previous Quarter</p>
            </div>
            <div className="flex bg-surface-container-highest rounded-lg p-1">
              <button className="px-3 py-1 text-label-caps font-label-caps rounded-md bg-surface text-on-surface shadow-sm">Q2</button>
              <button className="px-3 py-1 text-label-caps font-label-caps rounded-md text-on-surface-variant hover:text-on-surface">Q1</button>
            </div>
          </div>
          
          {/* Chart Canvas Area */}
          <div className="flex-1 relative min-h-[300px] w-full flex items-end pb-8 pl-8 z-10">
            {/* Y Axis Labels */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-label-caps font-label-caps text-on-surface-variant/50">
              <span>{formatCurrency(data.totalSpend || 400000)}</span>
              <span>{formatCurrency((data.totalSpend * 0.75) || 300000)}</span>
              <span>{formatCurrency((data.totalSpend * 0.5) || 200000)}</span>
              <span>{formatCurrency((data.totalSpend * 0.25) || 100000)}</span>
              <span>0</span>
            </div>
            {/* Grid Lines */}
            <div className="absolute left-8 right-0 top-0 bottom-8 border-l border-b border-white/10 flex flex-col justify-between">
              <div className="w-full border-t border-white/5 h-0"></div>
              <div className="w-full border-t border-white/5 h-0"></div>
              <div className="w-full border-t border-white/5 h-0"></div>
              <div className="w-full border-t border-white/5 h-0"></div>
              <div className="w-full border-t border-white/5 h-0"></div>
            </div>
            {/* Main SVG Chart Line */}
            <svg className="w-full h-full absolute left-8 bottom-8 top-0 right-0" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#c4c0ff" stopOpacity="0.3"></stop>
                  <stop offset="100%" stopColor="#c4c0ff" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path d="M0,80 C20,70 30,90 50,40 C70,-10 80,50 100,20 L100,100 L0,100 Z" fill="url(#lineGrad)"></path>
              <path className="text-primary" d="M0,80 C20,70 30,90 50,40 C70,-10 80,50 100,20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px rgba(196,192,255,0.6))' }}></path>
              <circle className="fill-surface stroke-primary stroke-[1.5px]" cx="50" cy="40" r="2.5" style={{ filter: 'drop-shadow(0 0 4px #c4c0ff)' }}></circle>
            </svg>
          </div>
        </div>
        
        {/* Secondary Panel (Right Column) */}
        <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-xl p-6 flex flex-col">
          <h3 className="font-headline-lg text-headline-lg-mobile md:text-body-lg font-semibold text-on-surface mb-6">Top Vendors by Volume</h3>
          <div className="space-y-6 flex-1">
            {!loading && data.topVendors.length === 0 && (
              <div className="text-on-surface-variant text-center py-4">No vendor data available.</div>
            )}
            {data.topVendors.map((item, index) => {
               const percentage = data.totalSpend > 0 ? Math.round((item.spend / data.totalSpend) * 100) : 0;
               return (
                <div key={item.vendor?.id || index} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-surface-container-highest border border-white/5 flex items-center justify-center text-on-surface-variant font-display-md text-[16px] uppercase">
                      {item.vendor?.name?.charAt(0) || 'V'}
                    </div>
                    <div>
                      <p className="font-body-md text-body-sm text-on-surface group-hover:text-primary transition-colors">{item.vendor?.name || 'Unknown'}</p>
                      <p className="font-label-caps text-label-caps text-on-surface-variant/70">{item.vendor?.category || 'General'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono-data text-mono-data text-on-surface">{formatCurrency(item.spend)}</p>
                    <p className="font-label-caps text-label-caps text-tertiary">{percentage}%</p>
                  </div>
                </div>
               );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
