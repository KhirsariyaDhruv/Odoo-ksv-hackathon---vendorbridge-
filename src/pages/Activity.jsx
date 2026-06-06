import { useState, useEffect } from 'react';
import api from '../api';

export function Activity() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const [rfqsRes, quotationsRes, ordersRes] = await Promise.all([
          api.get('/rfqs'),
          api.get('/quotations'),
          api.get('/orders')
        ]);

        const allEvents = [];

        // Add RFQ events
        rfqsRes.data.forEach(rfq => {
          allEvents.push({
            id: `rfq-${rfq.id}`,
            type: 'RFQ Published',
            date: new Date(rfq.createdAt),
            title: rfq.title,
            desc: `RFQ broadcasted in category '${rfq.category}'.`,
            user: rfq.user ? `${rfq.user.firstName} ${rfq.user.lastName}` : 'System',
            color: 'primary',
            icon: 'campaign'
          });
        });

        // Add Quotation events
        quotationsRes.data.forEach(q => {
          allEvents.push({
            id: `q-${q.id}`,
            type: q.status === 'Approved' ? 'Quotation Selected' : 'Quotation Submitted',
            date: new Date(q.submittedAt),
            title: `Bid from ${q.vendor?.name || 'Vendor'}`,
            desc: `Quotation for '${q.rfq?.title || 'RFQ'}' amount: $${q.amount.toFixed(2)}.`,
            user: 'Vendor Portal',
            color: q.status === 'Approved' ? 'secondary' : 'surface-variant',
            icon: 'contract'
          });
        });

        // Add Order events
        ordersRes.data.forEach(o => {
          allEvents.push({
            id: `o-${o.id}`,
            type: o.status === 'Pending Approval' ? 'Approval Pending' : `PO ${o.status}`,
            date: new Date(o.createdAt),
            title: `PO ${o.poNumber}`,
            desc: `Purchase Order for ${o.vendor?.name || 'Vendor'} is currently ${o.status}.`,
            user: 'System Workflow',
            color: o.status === 'Paid' ? 'primary' : (o.status === 'Pending Approval' ? 'tertiary' : 'secondary'),
            icon: 'pending_actions'
          });
        });

        // Sort by date descending
        allEvents.sort((a, b) => b.date.getTime() - a.date.getTime());
        
        setEvents(allEvents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto animate-fade-in">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-stack-lg">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Activity & Logs</h1>
          <p className="font-body-md text-body-sm text-on-surface-variant max-w-xl">Immutable audit trail of all procurement events, approvals, and system changes across the enterprise.</p>
        </div>
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 bg-surface-container-lowest p-1 rounded-full border border-white/10 shadow-inner print:hidden">
          <button className="px-4 py-1.5 rounded-full bg-surface-container-high text-on-surface font-label-caps text-[11px] border border-white/5 shadow-md">All Events</button>
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
              
              {loading ? (
                <div className="text-center text-on-surface-variant">Loading activity feed...</div>
              ) : events.length === 0 ? (
                <div className="text-center text-on-surface-variant">No activity logged yet.</div>
              ) : (
                events.map((event, index) => {
                  const alignClass = index % 2 === 0 ? "md:odd:flex-row-reverse" : "md:even:flex-row-reverse";
                  return (
                    <div key={event.id} className={`relative flex items-center justify-between md:justify-normal ${alignClass} group z-10 timeline-item`}>
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-lowest border border-${event.color}/30 shadow-[0_0_20px_rgba(var(--${event.color}-rgb),0.15)] text-${event.color} absolute left-0 md:left-1/2 md:-translate-x-1/2 z-20 group-hover:scale-110 transition-transform duration-300 group-hover:border-${event.color}/60`}>
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>{event.icon}</span>
                      </div>
                      <div className="absolute left-[23px] top-[48px] bottom-[-24px] w-[2px] bg-gradient-to-b from-white/10 to-white/0 z-0 md:hidden"></div>
                      <div className={`w-full md:w-[calc(50%-3rem)] bg-surface-container-lowest border border-white/5 rounded-lg p-4 hover:border-${event.color}/30 transition-colors duration-300 shadow-lg relative overflow-hidden`}>
                        <div className={`absolute top-0 left-0 w-1 h-full bg-${event.color} opacity-50`}></div>
                        <div className="flex justify-between items-start mb-2">
                          <span className={`font-label-caps text-[10px] text-${event.color} tracking-wider uppercase bg-${event.color}/10 px-2 py-0.5 rounded`}>{event.type}</span>
                          <span className="font-mono-data text-[11px] text-on-surface-variant">{event.date.toLocaleString()}</span>
                        </div>
                        <h3 className="font-body-md text-body-sm font-semibold text-on-surface mb-1">{event.title}</h3>
                        <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed mb-3">{event.desc}</p>
                        <div className="flex items-center gap-2 border-t border-white/5 pt-3">
                          <div className="w-5 h-5 rounded-full bg-surface-variant flex items-center justify-center">
                            <span className="material-symbols-outlined text-[10px] text-on-surface">person</span>
                          </div>
                          <span className="font-mono-data text-[11px] text-on-surface-variant">Action by: {event.user}</span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              
            </div>
          </div>
        </div>
        
        {/* Right Sidebar / Statistics */}
        <div className="lg:col-span-4 space-y-6">
          {/* Summary Stats Widget */}
          <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-xl p-5 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500"></div>
            <h3 className="font-mono-data text-body-sm text-on-surface mb-4">Event Frequency</h3>
            <div className="flex justify-between items-center text-on-surface-variant mt-4">
              <div>
                <p className="font-label-caps text-[10px] uppercase tracking-wider mb-1">Total Events</p>
                <p className="font-display-md text-[24px] text-on-surface leading-none">{events.length}</p>
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
