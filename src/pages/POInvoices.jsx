import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';

export function POInvoices() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${id}`);
        setOrder(response.data);
      } catch (err) {
        setError('Failed to fetch invoice details');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchOrder();
    } else {
      setLoading(false);
      setError('No invoice ID provided');
    }
  }, [id]);

  const handleMarkAsPaid = async () => {
    setPaying(true);
    try {
      await api.put(`/orders/${id}/status`, { status: 'Paid' });
      setOrder({ ...order, status: 'Paid' });
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setPaying(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmail = () => {
    alert(`Invoice sent to ${order?.vendor?.email || 'vendor'}`);
  };

  const handleDownloadPDF = () => {
    // In a real app, this would trigger a PDF generation or download from backend
    alert('PDF download started');
  };

  if (loading) {
    return <div className="p-8 text-on-surface-variant">Loading invoice details...</div>;
  }

  if (error || !order) {
    return (
      <div className="p-8">
        <div className="text-error mb-4">{error || 'Invoice not found'}</div>
        <button onClick={() => navigate('/orders')} className="text-primary hover:underline">
          Back to Orders
        </button>
      </div>
    );
  }

  const isPaid = order.status === 'Paid';
  const subtotal = order.amount * 0.82; // Reverse calculation assuming 18% tax
  const tax = order.amount - subtotal;

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-md">
        <div>
          <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-label-caps mb-2">
            <Link to="/orders" className="hover:text-primary transition-colors">Orders</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary">INV-{order.id.toString().padStart(4, '0')}</span>
          </div>
          <h1 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface">Invoice Details</h1>
        </div>
        <div className="flex items-center gap-3 flex-wrap print:hidden">
          <button onClick={handleDownloadPDF} className="px-4 py-2 rounded-xl bg-transparent border border-white/10 text-on-surface hover:bg-surface-container-high font-label-caps transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download PDF
          </button>
          <button onClick={handlePrint} className="px-4 py-2 rounded-xl bg-transparent border border-white/10 text-on-surface hover:bg-surface-container-high font-label-caps transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">print</span>
            Print
          </button>
          <button onClick={handleEmail} className="px-4 py-2 rounded-xl bg-transparent border border-white/10 text-on-surface hover:bg-surface-container-high font-label-caps transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">mail</span>
            Email
          </button>
          {!isPaid && (
            <button 
              onClick={handleMarkAsPaid}
              disabled={paying}
              className="px-5 py-2 rounded-xl bg-primary text-on-primary font-label-caps hover:bg-primary-fixed transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(196,192,255,0.2)] disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              {paying ? 'Processing...' : 'Mark as Paid'}
            </button>
          )}
        </div>
      </div>

      {/* Document Container (The Glass Card) */}
      <div className="glass-panel rounded-[24px] p-6 md:p-10 relative overflow-hidden print:shadow-none print:border-none print:bg-white print:text-black">
        {/* Decorative Top Border Glow */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent print:hidden"></div>
        
        {/* Status Badge */}
        <div className={`absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2 ${isPaid ? 'bg-primary/20 border-primary/30' : 'bg-secondary-container/20 border-secondary-container/30'} border px-3 py-1.5 rounded-full`}>
          <div className={`w-2 h-2 rounded-full ${isPaid ? 'bg-primary shadow-[0_0_8px_rgba(108,99,255,0.8)]' : 'bg-[#ffa17c] shadow-[0_0_8px_#ffa17c]'}`}></div>
          <span className={`font-label-caps ${isPaid ? 'text-primary' : 'text-[#ffa17c]'}`}>{isPaid ? 'Paid' : 'Pending Payment'}</span>
        </div>

        {/* Header Info */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12 border-b border-white/5 print:border-black/10 pb-8">
          {/* Vendor Info */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-surface-container-high print:bg-gray-100 flex items-center justify-center border border-white/10 print:border-gray-200 shrink-0">
              <span className="material-symbols-outlined text-3xl text-primary opacity-80">storefront</span>
            </div>
            <div>
              <h2 className="font-display-md text-headline-lg-mobile text-on-surface print:text-black mb-1">{order.vendor?.name}</h2>
              <p className="font-mono-data text-body-sm text-on-surface-variant print:text-gray-600">Vendor ID: V-{order.vendor?.id.toString().padStart(4, '0')}</p>
              <div className="mt-3 font-body-sm text-body-sm text-on-surface-variant/80 print:text-gray-600">
                Email: {order.vendor?.email}<br/>
                Phone: {order.vendor?.phone}<br/>
                GST: {order.vendor?.gstNumber}
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:text-right">
            <div>
              <div className="font-label-caps text-on-surface-variant print:text-gray-500 mb-1">Invoice Number</div>
              <div className="font-mono-data text-body-md text-on-surface print:text-black">INV-{order.id.toString().padStart(4, '0')}</div>
            </div>
            <div>
              <div className="font-label-caps text-on-surface-variant print:text-gray-500 mb-1">PO Number</div>
              <div className="font-mono-data text-body-md text-on-surface print:text-black">{order.poNumber}</div>
            </div>
            <div>
              <div className="font-label-caps text-on-surface-variant print:text-gray-500 mb-1">Issue Date</div>
              <div className="font-mono-data text-body-md text-on-surface print:text-black">
                {new Date(order.createdAt).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="font-label-caps text-on-surface-variant print:text-gray-500 mb-1">Due Date</div>
              <div className="font-mono-data text-body-md text-[#ffa17c] font-medium print:text-black">
                {new Date(new Date(order.createdAt).getTime() + 30*24*60*60*1000).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-10">
          <div className="font-label-caps text-on-surface-variant print:text-gray-500 mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">domain</span>
            Bill To
          </div>
          <h3 className="font-display-md text-body-lg font-medium text-on-surface print:text-black">VendorBridge Corporate HQ</h3>
          <div className="font-body-sm text-body-sm text-on-surface-variant/80 print:text-gray-600 mt-1">
            100 Enterprise Way, Floor 14<br/>
            New York, NY 10001<br/>
            United States
          </div>
        </div>

        {/* Line Items Table */}
        <div className="bg-surface-container-low/50 print:bg-white rounded-xl border border-white/5 print:border-black/10 overflow-x-auto mb-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 print:border-black/10 bg-surface-container-high/30 print:bg-gray-50">
                <th className="py-4 px-6 font-label-caps text-on-surface-variant print:text-gray-600 font-medium">Item Description</th>
                <th className="py-4 px-6 font-label-caps text-on-surface-variant print:text-gray-600 font-medium text-right">Qty</th>
                <th className="py-4 px-6 font-label-caps text-on-surface-variant print:text-gray-600 font-medium text-right">Rate</th>
                <th className="py-4 px-6 font-label-caps text-on-surface-variant print:text-gray-600 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="font-mono-data text-body-sm print:text-black">
              <tr className="border-b border-white/5 print:border-black/10 hover:bg-surface-container-high/20 transition-colors">
                <td className="py-4 px-6 text-on-surface print:text-black">
                  <div className="font-medium mb-1">{order.quotation?.rfq?.title || 'General Items'}</div>
                  <div className="text-[12px] text-on-surface-variant/60 print:text-gray-500 font-body-sm">RFQ Reference: #{order.quotation?.rfq?.id || 'N/A'}</div>
                </td>
                <td className="py-4 px-6 text-right text-on-surface-variant print:text-gray-600">1</td>
                <td className="py-4 px-6 text-right text-on-surface-variant print:text-gray-600">${subtotal.toFixed(2)}</td>
                <td className="py-4 px-6 text-right text-on-surface print:text-black">${subtotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex flex-col md:flex-row justify-end border-t border-white/5 print:border-black/10 pt-8">
          <div className="w-full md:w-[350px]">
            <div className="space-y-3 font-mono-data text-body-sm">
              <div className="flex justify-between text-on-surface-variant print:text-gray-600">
                <span className="">Subtotal</span>
                <span className="">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant print:text-gray-600">
                <span className="">Tax (18%)</span>
                <span className="">${tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-white/10 print:bg-black/10 my-4"></div>
              <div className="flex justify-between items-center bg-primary/10 print:bg-gray-100 p-4 rounded-xl border border-primary/20 print:border-gray-300">
                <span className="font-label-caps text-primary print:text-black">Grand Total</span>
                <span className="font-display-md text-headline-lg-mobile text-primary print:text-black font-bold tracking-tight">${order.amount?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-12 pt-8 border-t border-white/5 print:border-black/10 text-center md:text-left print:text-black">
          <div className="font-label-caps text-on-surface-variant print:text-gray-600 mb-2">Payment Instructions</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant/70 print:text-gray-500 max-w-2xl">
            Please remit payment to {order.vendor?.name} via ACH or Wire Transfer within 30 days of invoice date. Late payments are subject to a 1.5% monthly penalty fee.
          </p>
        </div>
      </div>
    </>
  );
}
