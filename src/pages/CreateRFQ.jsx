import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export function CreateRFQ() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ title: '', category: '', deadline: '', description: '' });
  const [items, setItems] = useState([{ name: '', quantity: 1, uom: '', details: '' }]);
  const [vendorIds, setVendorIds] = useState([]);
  const [availableVendors, setAvailableVendors] = useState([]);
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (step === 3) {
      // Fetch vendors when entering step 3
      const fetchVendors = async () => {
        try {
          const res = await api.get('/vendors');
          setAvailableVendors(res.data);
        } catch (err) {
          console.error('Failed to fetch vendors', err);
        }
      };
      fetchVendors();
    }
  }, [step]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { name: '', quantity: 1, uom: '', details: '' }]);
  
  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const toggleVendor = (id) => {
    if (vendorIds.includes(id)) {
      setVendorIds(vendorIds.filter(vId => vId !== id));
    } else {
      setVendorIds([...vendorIds, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      await api.post('/rfqs', { ...formData, items, vendorIds });
      setSuccess(true);
      setTimeout(() => navigate('/rfqs'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create RFQ');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 p-container-padding flex justify-center pb-32 md:pb-container-padding animate-fade-in z-10 relative">
      <div className="w-full max-w-4xl max-w-[800px]">
        {/* Header */}
        <div className="mb-stack-lg">
          <h2 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface mb-2">Create New RFQ</h2>
          <p className="font-body-md text-body-lg text-on-surface-variant">Initiate a request for quotation to find the best vendors for your needs.</p>
        </div>
        
        {/* Progress Stepper */}
        <div className="mb-stack-lg relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-highest -translate-y-1/2 z-0 rounded-full"></div>
          <div className={`absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 rounded-full shadow-[0_0_10px_rgba(196,192,255,0.4)] transition-all duration-300 ${step === 1 ? 'w-0' : step === 2 ? 'w-1/2' : 'w-full'}`}></div>
          <div className="relative z-10 flex justify-between">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display-md font-bold transition-all ${step >= 1 ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(135,129,255,0.4)]' : 'bg-surface-container-highest border border-outline-variant text-on-surface-variant'}`}>
                1
              </div>
              <span className={`font-body-md text-label-caps uppercase tracking-wider ${step >= 1 ? 'text-primary' : 'text-on-surface-variant'}`}>Details</span>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display-md font-bold transition-all ${step >= 2 ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(135,129,255,0.4)]' : 'bg-surface-container-highest border border-outline-variant text-on-surface-variant'}`}>
                2
              </div>
              <span className={`font-body-md text-label-caps uppercase tracking-wider ${step >= 2 ? 'text-primary' : 'text-on-surface-variant'}`}>Items</span>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display-md font-bold transition-all ${step >= 3 ? 'bg-primary text-on-primary shadow-[0_0_15px_rgba(135,129,255,0.4)]' : 'bg-surface-container-highest border border-outline-variant text-on-surface-variant'}`}>
                3
              </div>
              <span className={`font-body-md text-label-caps uppercase tracking-wider ${step >= 3 ? 'text-primary' : 'text-on-surface-variant'}`}>Vendors</span>
            </div>
          </div>
        </div>
        
        {/* Form Container */}
        <div className="bg-surface/50 backdrop-blur-xl border border-white/10 shadow-inner rounded-xl p-stack-md relative overflow-hidden min-h-[400px]">
          {/* Subtle top-left glow */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          {error && <div className="mb-4 bg-error-container text-on-error-container p-3 rounded text-sm relative z-10">{error}</div>}
          {success && <div className="mb-4 bg-tertiary-container text-on-tertiary-container p-3 rounded text-sm relative z-10">RFQ created successfully! Redirecting...</div>}
          
          <form onSubmit={handleSubmit} className="space-y-stack-md relative z-10">
            
            {/* STEP 1: DETAILS */}
            {step === 1 && (
              <div className="space-y-stack-md animate-fade-in">
                <div className="space-y-stack-sm">
                  <label className="block font-body-md text-body-sm text-on-surface-variant ml-1" htmlFor="rfq-title">RFQ Title</label>
                  <input required name="title" value={formData.title} onChange={handleChange} className="w-full bg-surface-container-lowest border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-3 px-4 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/30 transition-all duration-200" id="rfq-title" placeholder="e.g., Q3 Office Furniture Refresh" type="text" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  <div className="space-y-stack-sm">
                    <label className="block font-body-md text-body-sm text-on-surface-variant ml-1" htmlFor="category">Category</label>
                    <div className="relative">
                      <select required name="category" value={formData.category} onChange={handleChange} className="w-full bg-surface-container-lowest border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-3 pl-4 pr-10 text-body-md font-body-md text-on-surface appearance-none cursor-pointer transition-all duration-200" id="category">
                        <option disabled value="">Select category...</option>
                        <option value="Furniture & Fixtures">Furniture & Fixtures</option>
                        <option value="IT Equipment">IT Equipment</option>
                        <option value="Professional Services">Professional Services</option>
                        <option value="Raw Materials">Raw Materials</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                    </div>
                  </div>
                  <div className="space-y-stack-sm">
                    <label className="block font-body-md text-body-sm text-on-surface-variant ml-1" htmlFor="deadline">Submission Deadline</label>
                    <div className="relative">
                      <input required name="deadline" value={formData.deadline} onChange={handleChange} className="w-full bg-surface-container-lowest border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-3 px-4 text-body-md font-body-md text-on-surface transition-all duration-200 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-50 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 cursor-pointer" id="deadline" type="date" />
                    </div>
                  </div>
                </div>
                <div className="space-y-stack-sm">
                  <label className="block font-body-md text-body-sm text-on-surface-variant ml-1" htmlFor="description">Description & Requirements</label>
                  <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full bg-surface-container-lowest border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg py-3 px-4 text-body-md font-body-md text-on-surface placeholder:text-on-surface-variant/30 resize-none transition-all duration-200" id="description" placeholder="Provide detailed requirements, specifications, or context for this request..." rows={4}></textarea>
                </div>
              </div>
            )}

            {/* STEP 2: ITEMS */}
            {step === 2 && (
              <div className="space-y-stack-md animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display-md text-headline-sm text-on-surface">Requested Items</h3>
                  <button type="button" onClick={addItem} className="flex items-center gap-1 text-sm text-primary hover:text-primary-fixed-dim bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors">
                    <span className="material-symbols-outlined text-[18px]">add</span> Add Item
                  </button>
                </div>
                
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {items.map((item, index) => (
                    <div key={index} className="bg-surface-container-low border border-white/5 rounded-lg p-4 relative group">
                      <button type="button" onClick={() => removeItem(index)} className="absolute top-3 right-3 text-on-surface-variant opacity-50 hover:opacity-100 hover:text-error transition-all" title="Remove Item">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                        <div className="md:col-span-6 space-y-1">
                          <label className="text-xs text-on-surface-variant ml-1">Item Name / SKU</label>
                          <input required value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} className="w-full bg-surface-container-lowest border border-white/10 focus:border-primary rounded py-2 px-3 text-sm" placeholder="e.g. Ergonomic Office Chair" />
                        </div>
                        <div className="md:col-span-3 space-y-1">
                          <label className="text-xs text-on-surface-variant ml-1">Quantity</label>
                          <input required type="number" min="1" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} className="w-full bg-surface-container-lowest border border-white/10 focus:border-primary rounded py-2 px-3 text-sm" />
                        </div>
                        <div className="md:col-span-3 space-y-1">
                          <label className="text-xs text-on-surface-variant ml-1">UOM</label>
                          <input value={item.uom} onChange={(e) => handleItemChange(index, 'uom', e.target.value)} className="w-full bg-surface-container-lowest border border-white/10 focus:border-primary rounded py-2 px-3 text-sm" placeholder="e.g. pcs, boxes" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-on-surface-variant ml-1">Additional Details (Optional)</label>
                        <input value={item.details} onChange={(e) => handleItemChange(index, 'details', e.target.value)} className="w-full bg-surface-container-lowest border border-white/10 focus:border-primary rounded py-2 px-3 text-sm" placeholder="e.g. Must be black color, adjustable arms" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: VENDORS */}
            {step === 3 && (
              <div className="space-y-stack-md animate-fade-in">
                <div className="mb-4">
                  <h3 className="font-display-md text-headline-sm text-on-surface">Select Vendors</h3>
                  <p className="text-sm text-on-surface-variant mt-1">Choose which registered vendors will receive this RFQ. They will be notified automatically.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {availableVendors.length === 0 ? (
                    <div className="col-span-2 text-center py-8 text-on-surface-variant border border-white/5 rounded-lg">No active vendors found. You can submit the RFQ anyway and invite vendors later.</div>
                  ) : (
                    availableVendors.map(vendor => (
                      <div 
                        key={vendor.id} 
                        onClick={() => toggleVendor(vendor.id)}
                        className={`cursor-pointer border rounded-xl p-4 flex items-center gap-4 transition-all duration-200 ${vendorIds.includes(vendor.id) ? 'bg-primary/10 border-primary shadow-[0_0_15px_rgba(135,129,255,0.15)]' : 'bg-surface-container-low border-white/5 hover:border-white/20'}`}
                      >
                        <div className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${vendorIds.includes(vendor.id) ? 'bg-primary border-primary text-on-primary' : 'border-outline-variant bg-surface-container-lowest'}`}>
                          {vendorIds.includes(vendor.id) && <span className="material-symbols-outlined text-[16px] font-bold">check</span>}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-on-surface text-sm">{vendor.name}</div>
                          <div className="text-xs text-on-surface-variant">{vendor.category}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            <div className="pt-stack-sm flex justify-between gap-4 border-t border-white/5 mt-stack-md">
              {step > 1 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-2.5 rounded-full font-body-md text-body-md text-on-surface-variant border border-outline-variant hover:bg-surface-container-high transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">arrow_back</span> Back
                </button>
              ) : (
                <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-full font-body-md text-body-md text-on-surface-variant border border-outline-variant hover:bg-surface-container-high transition-colors">
                  Cancel
                </button>
              )}
              
              <button disabled={submitting} type="submit" className="px-6 py-2.5 rounded-full font-body-md text-body-md text-on-primary bg-primary hover:bg-primary-fixed-dim transition-colors shadow-[0_0_15px_rgba(196,192,255,0.4)] flex items-center gap-2 group disabled:opacity-50">
                {submitting ? 'Processing...' : step < 3 ? 'Continue' : 'Submit RFQ'}
                {!submitting && step < 3 && <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>}
                {!submitting && step === 3 && <span className="material-symbols-outlined text-[20px]">send</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

