import { useState, useEffect } from 'react';
import api from '../api';

export function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await api.get('/vendors');
        setVendors(response.data);
      } catch (err) {
        console.error('Failed to fetch vendors', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  return (
    <>
      <div className="flex justify-between items-end mb-stack-lg">
        <div>
          <h2 className="font-display-md text-headline-lg text-on-surface tracking-tight mb-2">Vendors Management</h2>
          <p className="font-body-md text-on-surface-variant">Manage your supplier network, track compliance, and view operational status.</p>
        </div>
        <button className="bg-tertiary-container hover:bg-tertiary hover:text-on-tertiary text-on-tertiary-container px-6 py-3 rounded-full flex items-center gap-2 font-display-md text-body-sm font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(102,158,99,0.15)] hover:shadow-[0_0_30px_rgba(154,213,148,0.3)]">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add Vendor
        </button>
      </div>

      <div className="flex gap-2 mb-stack-md border-b border-white/5 pb-px relative">
        <button className="px-5 py-2.5 font-display-md text-body-sm font-medium text-primary border-b-2 border-primary relative z-10 flex items-center gap-2">
          All
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-mono-data">{vendors.length}</span>
        </button>
        <button className="px-5 py-2.5 font-display-md text-body-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2">
          Active
          <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded-full text-xs font-mono-data">{vendors.filter(v => v.status === 'Active').length}</span>
        </button>
        <button className="px-5 py-2.5 font-display-md text-body-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2">
          Pending
          <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded-full text-xs font-mono-data">{vendors.filter(v => v.status === 'Pending Review').length}</span>
        </button>
        <button className="px-5 py-2.5 font-display-md text-body-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2">
          Blocked
          <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded-full text-xs font-mono-data">{vendors.filter(v => v.status === 'Blocked').length}</span>
        </button>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-highest/30 border-b border-white/5">
                <th className="py-4 px-6 font-display-md text-label-caps text-on-surface-variant font-semibold tracking-wider">Vendor Name</th>
                <th className="py-4 px-6 font-display-md text-label-caps text-on-surface-variant font-semibold tracking-wider">Category</th>
                <th className="py-4 px-6 font-display-md text-label-caps text-on-surface-variant font-semibold tracking-wider">GST No.</th>
                <th className="py-4 px-6 font-display-md text-label-caps text-on-surface-variant font-semibold tracking-wider">Contact</th>
                <th className="py-4 px-6 font-display-md text-label-caps text-on-surface-variant font-semibold tracking-wider">Status</th>
                <th className="py-4 px-6 font-display-md text-label-caps text-on-surface-variant font-semibold tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-body-sm">
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-on-surface-variant">Loading vendors...</td>
                </tr>
              ) : vendors.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-on-surface-variant">No vendors found.</td>
                </tr>
              ) : vendors.map((vendor, i) => (
                <tr key={i} className={`hover:bg-surface-container/40 transition-colors group ${vendor.status === 'Blocked' ? 'opacity-60 hover:opacity-100' : ''}`}>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded bg-primary-container/20 border border-primary/20 flex items-center justify-center text-primary font-display-md font-bold`}>
                        {vendor.init}
                      </div>
                      <div>
                        <div className="font-medium text-on-surface">{vendor.name}</div>
                        <div className="text-xs text-on-surface-variant mt-0.5">Joined {new Date(vendor.joinedDate || vendor.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">{vendor.category}</td>
                  <td className="py-4 px-6 font-mono-data text-on-surface">{vendor.gstNumber}</td>
                  <td className="py-4 px-6 text-on-surface-variant">
                    <div className="text-on-surface">{vendor.email}</div>
                    <div className="text-xs mt-0.5">{vendor.phone}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-container/20 text-primary border border-primary/20 text-xs font-medium`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_5px_rgba(255,255,255,0.2)]`}></span>
                      {vendor.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
