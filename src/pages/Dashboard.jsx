import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    rfqs: 0,
    approvals: 0,
    totalSpend: 0,
    posThisMonth: 0,
    overdue: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [rfqsRes, approvalsRes, ordersRes] = await Promise.all([
          api.get('/rfqs'),
          api.get('/approvals'),
          api.get('/orders')
        ]);
        
        const activeRfqs = rfqsRes.data.filter(r => r.status === 'Open').length;
        const pendingApprovals = approvalsRes.data.length;
        
        const allOrders = ordersRes.data;
        const paidOrders = allOrders.filter(o => o.status === 'Paid');
        const totalSpend = paidOrders.reduce((sum, o) => sum + o.amount, 0);
        
        const thisMonth = new Date().getMonth();
        const thisYear = new Date().getFullYear();
        const posThisMonthSum = allOrders
          .filter(o => {
            const d = new Date(o.createdAt);
            return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
          })
          .reduce((sum, o) => sum + o.amount, 0);
          
        const overdue = allOrders.filter(o => {
          if (o.status === 'Paid' || o.status === 'Rejected') return false;
          const due = new Date(o.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000;
          return new Date().getTime() > due;
        }).length;

        setData({
          rfqs: activeRfqs,
          approvals: pendingApprovals,
          totalSpend,
          posThisMonth: posThisMonthSum,
          overdue,
          recentOrders: allOrders.slice(0, 4)
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  const formatCurrency = (amount) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <>
      {/* Page Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-md">
        <div>
          <h1 className="font-display-md text-headline-lg font-semibold text-on-surface mb-1">Overview Dashboard</h1>
          <p className="font-body-md text-body-sm text-on-surface-variant">Welcome back. Here's what's happening with your supply chain today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/vendors?add=true')} className="bg-transparent hover:bg-surface-container-high text-on-surface border border-outline-variant/30 rounded-full py-2 px-4 flex items-center gap-2 transition-colors font-body-md text-body-sm">
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Add Vendor
          </button>
          <button onClick={() => navigate('/rfqs/create')} className="bg-primary hover:bg-primary-container text-on-primary rounded-full py-2 px-4 flex items-center gap-2 transition-colors font-body-md text-body-sm font-medium shadow-[0_0_15px_rgba(196,192,255,0.2)]">
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
                <span className="material-symbols-outlined text-[14px] text-tertiary">trending_up</span> Active
              </span>
            </div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">Active RFQs</h3>
            <div className="font-display-md text-display-md text-on-surface font-semibold text-shadow-sm shadow-primary/50">
              {loading ? '-' : data.rfqs.toString().padStart(2, '0')}
            </div>
          </div>

          {/* KPI 2 */}
          <div className="glass-panel rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
                <span className="material-symbols-outlined text-secondary icon-fill">fact_check</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-surface-variant text-on-surface text-[11px] font-mono-data tracking-wider">
                <span className="material-symbols-outlined text-[14px] text-on-surface-variant">hourglass_empty</span> Pending
              </span>
            </div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">Pending Approvals</h3>
            <div className="font-display-md text-display-md text-on-surface font-semibold text-shadow-sm shadow-secondary/50">
              {loading ? '-' : data.approvals.toString().padStart(2, '0')}
            </div>
          </div>

          {/* KPI 3 */}
          <div className="glass-panel rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-tertiary/10 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-50"></div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center border border-tertiary/20">
                <span className="material-symbols-outlined text-tertiary icon-fill">shopping_cart</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-surface-variant text-on-surface text-[11px] font-mono-data tracking-wider">
                <span className="material-symbols-outlined text-[14px] text-tertiary">trending_up</span> This Mth
              </span>
            </div>
            <h3 className="font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase tracking-widest">POs This Month</h3>
            <div className="font-mono-data text-display-md text-on-surface font-medium text-shadow-sm shadow-tertiary/50 tracking-tight">
              {loading ? '-' : formatCurrency(data.posThisMonth)}
            </div>
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
              <div className="font-display-md text-display-md text-error font-semibold text-shadow-sm">
                {loading ? '-' : data.overdue.toString().padStart(2, '0')}
              </div>
              <button onClick={() => navigate('/orders')} className="text-body-sm text-on-surface-variant hover:text-on-surface underline decoration-white/20 underline-offset-4">View All</button>
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
              <span className="font-body-md text-body-md text-on-surface font-medium">Total Spend (Paid)</span>
            </div>
            <button className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-surface hover:bg-surface-variant transition-colors">
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">more_horiz</span>
            </button>
          </div>
          <div className="relative z-10 mt-auto">
            <div className="font-mono-data text-display-md text-on-surface font-semibold tracking-tight mb-2">
              {loading ? '-' : formatCurrency(data.totalSpend)}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 bg-tertiary/20 text-tertiary rounded-md text-[11px] font-mono-data flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">insights</span> Metrics
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Lifetime spend</span>
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
            <button onClick={() => navigate('/orders')} className="text-body-sm text-primary hover:text-primary-container transition-colors font-medium">View All Orders</button>
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
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-on-surface-variant">Loading recent orders...</td>
                  </tr>
                ) : data.recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-on-surface-variant">No recent purchase orders.</td>
                  </tr>
                ) : (
                  data.recentOrders.map((row) => {
                    let statusColor = 'surface-variant';
                    let statusText = 'surface-variant';
                    if (row.status === 'Approved') {
                      statusColor = 'tertiary';
                      statusText = 'tertiary';
                    } else if (row.status === 'Paid') {
                      statusColor = 'primary';
                      statusText = 'primary';
                    } else if (row.status === 'Pending Approval') {
                      statusColor = 'secondary';
                      statusText = 'secondary';
                    }

                    return (
                      <tr onClick={() => navigate(`/invoices/${row.id}`)} key={row.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                        <td className="py-4 px-4 font-mono-data font-medium text-primary">{row.poNumber}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-[12px] font-bold text-on-surface-variant uppercase">{row.vendor?.init || 'V'}</div>
                            <span className="">{row.vendor?.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-on-surface-variant">{new Date(row.createdAt).toLocaleDateString()}</td>
                        <td className="py-4 px-4 text-right font-mono-data">${row.amount?.toFixed(2)}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-${statusColor}/10 border border-${statusColor}/20 text-${statusText} text-[11px] font-medium tracking-wide`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
