import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto animate-fade-in p-container-padding">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-lg">
        <div>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Purchase Orders & Invoices</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">Manage all generated purchase orders, track their statuses, and view detailed invoices.</p>
        </div>
      </div>

      {error && <div className="mb-4 text-error">{error}</div>}

      <div className="glass-panel rounded-[24px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-highest/30 border-b border-white/5">
                <th className="py-4 px-6 font-display-md text-label-caps text-on-surface-variant font-semibold tracking-wider">PO Number</th>
                <th className="py-4 px-6 font-display-md text-label-caps text-on-surface-variant font-semibold tracking-wider">Vendor</th>
                <th className="py-4 px-6 font-display-md text-label-caps text-on-surface-variant font-semibold tracking-wider">Date</th>
                <th className="py-4 px-6 font-display-md text-label-caps text-on-surface-variant font-semibold tracking-wider text-right">Amount</th>
                <th className="py-4 px-6 font-display-md text-label-caps text-on-surface-variant font-semibold tracking-wider text-center">Status</th>
                <th className="py-4 px-6 font-display-md text-label-caps text-on-surface-variant font-semibold tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-body-sm text-on-surface">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-on-surface-variant">Loading orders...</td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-on-surface-variant">No purchase orders found.</td>
                </tr>
              ) : (
                orders.map((order) => {
                  let statusColor = 'surface-variant';
                  let statusText = 'surface-variant';
                  if (order.status === 'Approved') {
                    statusColor = 'tertiary';
                    statusText = 'tertiary';
                  } else if (order.status === 'Paid') {
                    statusColor = 'primary';
                    statusText = 'primary';
                  } else if (order.status === 'Pending Approval') {
                    statusColor = 'secondary';
                    statusText = 'secondary';
                  }

                  return (
                    <tr 
                      key={order.id} 
                      className="hover:bg-surface-container/40 transition-colors group cursor-pointer"
                      onClick={() => navigate(`/invoices/${order.id}`)}
                    >
                      <td className="py-4 px-6 font-mono-data font-medium text-primary">{order.poNumber}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center text-[12px] font-bold text-on-surface-variant uppercase">{order.vendor?.init || 'V'}</div>
                          <span>{order.vendor?.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-on-surface-variant">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 px-6 text-right font-mono-data">${order.amount?.toFixed(2)}</td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-${statusColor}/10 border border-${statusColor}/20 text-${statusText} text-[11px] font-medium tracking-wide`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10">
                          <span className="material-symbols-outlined text-[20px]">visibility</span>
                        </button>
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
  );
}
