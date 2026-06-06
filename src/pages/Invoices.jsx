import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export function Invoices() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await api.get('/invoices');
        setInvoices(response.data);
      } catch (error) {
        console.error('Failed to fetch invoices', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-primary/10 border-primary/20 text-primary';
      case 'Pending Payment':
        return 'bg-secondary-container/20 border-secondary-container/30 text-[#ffa17c]';
      case 'Overdue':
        return 'bg-error/10 border-error/20 text-error';
      default:
        return 'bg-surface-variant border-outline-variant/30 text-on-surface-variant';
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-md">
        <div>
          <h1 className="font-display-md text-headline-lg font-semibold text-on-surface mb-1">Invoices</h1>
          <p className="font-body-md text-body-sm text-on-surface-variant">Manage and track all vendor invoices.</p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold uppercase tracking-wider">Invoice No.</th>
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold uppercase tracking-wider">Vendor</th>
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold uppercase tracking-wider">Issue Date</th>
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold uppercase tracking-wider">Due Date</th>
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold uppercase tracking-wider text-right">Amount</th>
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant font-semibold uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm text-on-surface">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-on-surface-variant">Loading invoices...</td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-on-surface-variant">No invoices found.</td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr 
                    key={inv.id} 
                    onClick={() => navigate(`/invoices/${inv.id}`)}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-4 font-mono-data font-medium text-primary">{inv.invoiceNumber}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-[12px] font-bold text-on-surface-variant uppercase">
                          {inv.vendor?.init || 'V'}
                        </div>
                        <span className="">{inv.vendor?.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-on-surface-variant">{new Date(inv.issuedDate).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-on-surface-variant">{new Date(inv.dueDate).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-right font-mono-data">${inv.amount.toFixed(2)}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full border text-[11px] font-medium tracking-wide ${getStatusStyle(inv.status)}`}>
                        {inv.status}
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
