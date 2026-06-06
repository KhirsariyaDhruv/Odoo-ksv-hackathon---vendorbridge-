export function Vendors() {
  const vendors = [
    { name: 'Nexus Computing Ltd.', init: 'NC', category: 'Hardware & IT', joined: 'Oct 2023', gst: '29ABCDE1234F1Z5', email: 'sarah@nexus.com', phone: '+1 (555) 123-4567', status: 'Active', color: 'primary' },
    { name: 'Oceanic Global Shipping', init: 'OG', category: 'Logistics', joined: 'Nov 2023', gst: '07AAACN8901D1Z2', email: 'ops@oceanic.global', phone: '+44 20 7123 4567', status: 'Pending Review', color: 'secondary' },
    { name: 'Apex Supply Chain', init: 'AS', category: 'Raw Materials', joined: 'Jan 2022', gst: '22DEFGH5678J1Z9', email: 'contact@apex.co', phone: '+1 (555) 987-6543', status: 'Active', color: 'tertiary' },
    { name: 'Vertex Furnishings', init: 'VF', category: 'Office Equipment', joined: 'May 2021', gst: '33GHJKL9012M1Z4', email: 'billing@vertex.com', phone: '+1 (555) 246-8135', status: 'Blocked', color: 'error' },
  ];

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
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-mono-data">28</span>
        </button>
        <button className="px-5 py-2.5 font-display-md text-body-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2">
          Active
          <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded-full text-xs font-mono-data">21</span>
        </button>
        <button className="px-5 py-2.5 font-display-md text-body-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2">
          Pending
          <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded-full text-xs font-mono-data">4</span>
        </button>
        <button className="px-5 py-2.5 font-display-md text-body-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2">
          Blocked
          <span className="bg-surface-variant text-on-surface-variant px-2 py-0.5 rounded-full text-xs font-mono-data">3</span>
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
              {vendors.map((vendor, i) => (
                <tr key={i} className={`hover:bg-surface-container/40 transition-colors group ${vendor.status === 'Blocked' ? 'opacity-60 hover:opacity-100' : ''}`}>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded bg-${vendor.color}-container/20 border border-${vendor.color}/20 flex items-center justify-center text-${vendor.color} font-display-md font-bold`}>
                        {vendor.init}
                      </div>
                      <div>
                        <div className="font-medium text-on-surface">{vendor.name}</div>
                        <div className="text-xs text-on-surface-variant mt-0.5">Joined {vendor.joined}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-on-surface-variant">{vendor.category}</td>
                  <td className="py-4 px-6 font-mono-data text-on-surface">{vendor.gst}</td>
                  <td className="py-4 px-6 text-on-surface-variant">
                    <div className="text-on-surface">{vendor.email}</div>
                    <div className="text-xs mt-0.5">{vendor.phone}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-${vendor.color}-container/20 text-${vendor.color} border border-${vendor.color}/20 text-xs font-medium`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-${vendor.color} shadow-[0_0_5px_rgba(255,255,255,0.2)]`}></span>
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
        <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between text-body-sm text-on-surface-variant bg-surface-container-highest/20">
          <div className="">Showing 1 to 4 of 28 entries</div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded bg-surface border border-white/10 hover:bg-surface-container text-on-surface transition-colors disabled:opacity-50">Previous</button>
            <button className="px-3 py-1.5 rounded bg-primary-container/20 border border-primary/30 text-primary font-medium">1</button>
            <button className="px-3 py-1.5 rounded bg-surface border border-white/10 hover:bg-surface-container text-on-surface transition-colors">2</button>
            <button className="px-3 py-1.5 rounded bg-surface border border-white/10 hover:bg-surface-container text-on-surface transition-colors">3</button>
            <span className="px-2 py-1.5">...</span>
            <button className="px-3 py-1.5 rounded bg-surface border border-white/10 hover:bg-surface-container text-on-surface transition-colors">Next</button>
          </div>
        </div>
      </div>
    </>
  );
}
