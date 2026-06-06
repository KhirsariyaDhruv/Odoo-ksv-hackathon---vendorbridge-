import { useState, useEffect } from 'react';
import api from '../api';

export function Approvals() {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchApprovals = async () => {
      try {
        const response = await api.get('/approvals');
        setApprovals(response.data);
      } catch (err) {
        setError('Failed to fetch pending approvals');
      } finally {
        setLoading(false);
      }
    };
    fetchApprovals();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    setSubmitting(true);
    try {
      await api.put(`/approvals/${id}/status`, { status });
      // Remove from pending list
      setApprovals(approvals.filter(a => a.id !== id));
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-on-surface-variant">Loading approvals...</div>;
  }

  if (approvals.length === 0) {
    return (
      <div className="max-w-5xl mx-auto space-y-stack-md animate-fade-in p-container-padding">
        <div className="bg-surface-container border border-white/10 rounded-xl p-8 text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-4xl mb-2 opacity-50">fact_check</span>
          <h2 className="font-display-md text-headline-sm text-on-surface mb-1">All Caught Up!</h2>
          <p>You have no pending purchase orders awaiting your approval.</p>
        </div>
      </div>
    );
  }

  const currentPO = approvals[0];

  return (
    <div className="max-w-5xl mx-auto space-y-stack-md animate-fade-in p-container-padding">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-surface-container-high text-on-surface-variant border border-white/5">Purchase Order</span>
            <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-secondary-fixed/10 text-secondary-fixed border border-secondary-fixed/20">Awaiting Your Approval</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface">{currentPO.poNumber}</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">{currentPO.quotation?.rfq?.title || 'System Generated PO'}</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            onClick={() => handleStatusUpdate(currentPO.id, 'Rejected')}
            disabled={submitting}
            className="flex-1 md:flex-none px-6 py-2 rounded-lg bg-transparent border border-error/50 text-error hover:bg-error/10 font-label-caps transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">close</span> Reject
          </button>
          <button 
            onClick={() => handleStatusUpdate(currentPO.id, 'Approved')}
            disabled={submitting}
            className="flex-1 md:flex-none px-6 py-2 rounded-lg bg-tertiary-container text-on-tertiary-container font-label-caps hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(181,242,175,0.2)] disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">check</span> {submitting ? 'Approving...' : 'Approve PO'}
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
                      <h3 className="font-body-md text-on-surface text-sm font-semibold">Quotation Approved</h3>
                      <p className="font-body-sm text-on-surface-variant text-xs mt-1">Initiated by System</p>
                    </div>
                    <span className="font-mono-data text-mono-data text-on-surface-variant/50 text-xs">
                      {new Date(currentPO.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Step 2: L2 Approval (Active) */}
              <div className="relative flex items-start gap-4 mb-8">
                <div className="w-6 h-6 rounded-full bg-secondary-fixed border border-secondary-fixed flex items-center justify-center z-10 mt-0.5 shadow-[0_0_15px_rgba(255,219,206,0.4)]">
                  <span className="material-symbols-outlined text-[14px] text-on-secondary-fixed">hourglass_empty</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-body-md text-secondary-fixed text-sm font-semibold">PO Authorization</h3>
                      <p className="font-body-sm text-secondary-fixed/80 text-xs mt-1 flex items-center gap-1">
                        Manager <span className="text-on-surface-variant">(Awaiting)</span>
                      </p>
                    </div>
                    <span className="font-mono-data text-mono-data text-secondary-fixed/50 text-xs">Current</span>
                  </div>
                </div>
              </div>
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
                ${currentPO.amount?.toFixed(2)}
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
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-primary-container/20 flex items-center justify-center text-primary border border-primary/20 font-bold uppercase">
                {currentPO.vendor?.init || 'V'}
              </div>
              <div>
                <div className="font-body-md font-semibold text-on-surface text-sm">{currentPO.vendor?.name || 'Unknown'}</div>
                <div className="font-body-sm text-on-surface-variant text-xs">Category: {currentPO.vendor?.category}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
