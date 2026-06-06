import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export function Quotations() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await api.get('/quotations');
        setQuotations(response.data);
      } catch (err) {
        setError('Failed to fetch quotations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotations();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.put(`/quotations/${id}/status`, { status: 'Approved' });
      setQuotations(quotations.map(q => q.id === id ? { ...q, status: 'Approved' } : q));
    } catch (err) {
      alert('Failed to approve quotation');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto animate-fade-in p-container-padding">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-stack-lg">
        <div>
          <div className="flex items-center gap-2 mb-2 text-on-surface-variant font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <Link to="/dashboard" className="hover:text-primary transition-colors">Back to Dashboard</Link>
          </div>
          <h2 className="font-display-lg text-display-lg text-on-surface">Quotation Comparison</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">Comparing bids for recent RFQs. {quotations.length} vendors have submitted quotations.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={async () => {
              try {
                const rfqs = await api.get('/rfqs');
                const vendors = await api.get('/vendors');
                if (rfqs.data.length && vendors.data.length) {
                  const rfqId = rfqs.data[0].id;
                  const vendorId = vendors.data[0].id;
                  await api.post('/quotations', { rfqId, vendorId, amount: Math.floor(Math.random() * 50000) + 5000 });
                  window.location.reload();
                } else {
                  alert('Please create at least 1 RFQ and 1 Vendor first.');
                }
              } catch(e) { console.error(e); }
            }}
            className="bg-secondary-container text-on-secondary-container border border-secondary-container rounded-full py-2 px-6 flex items-center gap-2 text-sm font-display-md font-semibold hover:bg-secondary-fixed transition-colors"
          >
            <span className="material-symbols-outlined text-sm">magic_button</span>
            Simulate Bid
          </button>
          <button className="bg-transparent text-white border border-primary rounded-full py-2 px-6 flex items-center gap-2 text-sm font-display-md font-semibold hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-sm">download</span>
            Export PDF
          </button>
        </div>
      </div>
      
      {error && <div className="mb-4 text-error">{error}</div>}
      {loading && <div className="text-on-surface-variant">Loading quotations...</div>}
      
      {/* Comparison Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-grid mb-stack-lg">
        {!loading && quotations.length === 0 && (
          <div className="col-span-3 text-center py-10 text-on-surface-variant border border-white/10 rounded-xl">
            No quotations found.
          </div>
        )}
        {quotations.map((quotation, index) => {
          const isLowest = index === 0; // Assuming API sorts or we can sort later
          const isApproved = quotation.status === 'Approved';
          
          return (
            <div key={quotation.id} className={`${isLowest ? 'bg-tertiary-container text-on-tertiary-container' : 'bg-surface-container-low text-on-surface border border-white/10'} rounded-xl p-6 flex flex-col h-full transform transition-transform hover:-translate-y-1 relative overflow-hidden`}>
              <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none" style={{ background: 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.03) 0%, transparent 50%)' }}></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                  {isLowest && <span className="inline-block px-2 py-1 bg-tertiary/20 text-on-tertiary-container text-xs font-bold rounded mb-2 font-mono-data tracking-wider">LOWEST BID</span>}
                  {isApproved && <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded mb-2 font-mono-data tracking-wider ml-2">APPROVED</span>}
                  <h3 className="font-headline-lg text-headline-lg font-bold">{quotation.vendor?.name || 'Unknown Vendor'}</h3>
                  <p className="font-body-sm text-body-sm opacity-80 mt-1">RFQ: {quotation.rfq?.title || `ID-${quotation.rfqId}`}</p>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isLowest ? 'bg-white/20' : 'bg-surface-variant border border-white/5'}`}>
                  <span className="material-symbols-outlined">{isLowest ? 'router' : 'dns'}</span>
                </div>
              </div>
              
              <div className="space-y-4 flex-1 relative z-10">
                <div className={`flex justify-between items-baseline border-b ${isLowest ? 'border-black/10' : 'border-white/5'} pb-2`}>
                  <span className="font-body-sm text-body-sm opacity-80">Grand Total</span>
                  <span className="font-mono-data text-xl font-bold">${quotation.amount?.toFixed(2)}</span>
                </div>
                <div className={`flex justify-between items-baseline border-b ${isLowest ? 'border-black/10' : 'border-white/5'} pb-2`}>
                  <span className="font-body-sm text-body-sm opacity-80">Status</span>
                  <span className="font-mono-data font-medium">{quotation.status}</span>
                </div>
                <div className={`flex justify-between items-baseline border-b ${isLowest ? 'border-black/10' : 'border-white/5'} pb-2`}>
                  <span className="font-body-sm text-body-sm opacity-80">Submitted On</span>
                  <span className="font-mono-data font-medium">
                    {new Date(quotation.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => handleApprove(quotation.id)}
                disabled={isApproved}
                className={`w-full rounded-full py-3 mt-8 font-body-md font-bold transition-colors shadow-lg relative z-10 ${
                  isApproved 
                    ? 'bg-surface-variant text-on-surface-variant opacity-50 cursor-not-allowed'
                    : isLowest 
                      ? 'bg-on-tertiary-container text-tertiary-container hover:bg-black/80' 
                      : 'bg-surface-variant text-on-surface hover:text-white hover:bg-white/5 border border-white/10'
                }`}
              >
                {isApproved ? 'Approved' : 'Select & Approve'}
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Footer Meta / Audit */}
      <div className="flex items-center justify-center gap-2 text-on-surface-variant/50 font-mono-data text-xs py-4 border-t border-white/5">
        <span className="material-symbols-outlined text-sm">verified_user</span>
        <span>Audit Trail: Comparison fetched on {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
}
