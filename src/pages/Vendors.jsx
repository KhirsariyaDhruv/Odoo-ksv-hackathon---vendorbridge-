import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';

export function Vendors() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(searchParams.get('add') === 'true');
  const [formData, setFormData] = useState({ name: '', init: '', category: '', gstNumber: '', email: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

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

  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchParams({});
    setFormData({ name: '', init: '', category: '', gstNumber: '', email: '', phone: '' });
    setError('');
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const response = await api.post('/vendors', formData);
      setVendors([response.data, ...vendors]);
      closeModal();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add vendor');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-end mb-stack-lg">
        <div>
          <h2 className="font-display-md text-headline-lg text-on-surface tracking-tight mb-2">Vendors Management</h2>
          <p className="font-body-md text-on-surface-variant">Manage your supplier network, track compliance, and view operational status.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-tertiary-container hover:bg-tertiary hover:text-on-tertiary text-on-tertiary-container px-6 py-3 rounded-full flex items-center gap-2 font-display-md text-body-sm font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(102,158,99,0.15)] hover:shadow-[0_0_30px_rgba(154,213,148,0.3)]">
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

      {/* Add Vendor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-surface-container-highest border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display-md text-headline-sm text-on-surface">Add New Vendor</h3>
              <button onClick={closeModal} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            {error && <div className="mb-4 bg-error-container text-on-error-container p-3 rounded text-sm">{error}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-on-surface-variant mb-1">Company Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-on-surface-variant mb-1">Initials (e.g. TC)</label>
                  <input required name="init" value={formData.init} onChange={handleChange} maxLength="3" type="text" className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none uppercase" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-on-surface-variant mb-1">Category</label>
                  <select required name="category" value={formData.category} onChange={handleChange} className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none">
                    <option value="">Select Category...</option>
                    <option value="IT Services">IT Services</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Consulting">Consulting</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-on-surface-variant mb-1">GST Number</label>
                  <input required name="gstNumber" value={formData.gstNumber} onChange={handleChange} type="text" className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-on-surface-variant mb-1">Email</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-on-surface-variant mb-1">Phone</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="text" className="w-full bg-surface-container border border-white/10 rounded-lg px-3 py-2 text-on-surface focus:border-primary outline-none" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={closeModal} className="px-5 py-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2 rounded-full bg-tertiary text-on-tertiary font-medium hover:bg-tertiary/90 transition-colors disabled:opacity-50">
                  {submitting ? 'Adding...' : 'Add Vendor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
