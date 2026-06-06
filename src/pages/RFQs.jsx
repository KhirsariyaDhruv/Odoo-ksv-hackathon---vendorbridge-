import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export function RFQs() {
  const navigate = useNavigate();
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRfqs = async () => {
      try {
        const response = await api.get('/rfqs');
        setRfqs(response.data);
      } catch (error) {
        console.error('Failed to fetch RFQs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRfqs();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-md">
        <div>
          <h1 className="font-display-md text-headline-lg font-semibold text-on-surface mb-1">RFQs</h1>
          <p className="font-body-md text-body-sm text-on-surface-variant">Manage your Requests for Quotation.</p>
        </div>
        <button 
          onClick={() => navigate('/rfqs/create')} 
          className="px-5 py-2.5 rounded-full bg-primary text-on-primary hover:bg-primary-fixed-dim transition-colors shadow-[0_0_15px_rgba(196,192,255,0.4)] flex items-center gap-2 font-label-caps"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Request
        </button>
      </div>

      <div className="glass-panel rounded-3xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 font-label-caps text-on-surface-variant font-semibold uppercase tracking-wider">RFQ ID</th>
                <th className="py-3 px-4 font-label-caps text-on-surface-variant font-semibold uppercase tracking-wider">Title</th>
                <th className="py-3 px-4 font-label-caps text-on-surface-variant font-semibold uppercase tracking-wider">Category</th>
                <th className="py-3 px-4 font-label-caps text-on-surface-variant font-semibold uppercase tracking-wider">Deadline</th>
                <th className="py-3 px-4 font-label-caps text-on-surface-variant font-semibold uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm text-on-surface">
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-on-surface-variant">Loading RFQs...</td>
                </tr>
              ) : rfqs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-on-surface-variant">No RFQs found. Click "New Request" to create one.</td>
                </tr>
              ) : (
                rfqs.map((rfq) => (
                  <tr key={rfq.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-mono-data font-medium text-primary">#{rfq.id.toString().padStart(4, '0')}</td>
                    <td className="py-4 px-4 font-medium">{rfq.title}</td>
                    <td className="py-4 px-4 text-on-surface-variant capitalize">{rfq.category}</td>
                    <td className="py-4 px-4 text-on-surface-variant">{new Date(rfq.deadline).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full border text-[11px] font-medium tracking-wide ${rfq.status === 'Open' ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-surface-variant border-outline-variant/30 text-on-surface-variant'}`}>
                        {rfq.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
