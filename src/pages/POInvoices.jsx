export function POInvoices() {
  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-stack-md">
        <div>
          <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-label-caps mb-2">
            <a className="hover:text-primary transition-colors" href="#">Invoices</a>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-primary">INV-2023-0892</span>
          </div>
          <h1 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface">Invoice Details</h1>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button className="px-4 py-2 rounded-xl bg-transparent border border-white/10 text-on-surface hover:bg-surface-container-high font-label-caps transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download PDF
          </button>
          <button className="px-4 py-2 rounded-xl bg-transparent border border-white/10 text-on-surface hover:bg-surface-container-high font-label-caps transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">print</span>
            Print
          </button>
          <button className="px-4 py-2 rounded-xl bg-transparent border border-white/10 text-on-surface hover:bg-surface-container-high font-label-caps transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">mail</span>
            Email
          </button>
          <button className="px-5 py-2 rounded-xl bg-primary text-on-primary font-label-caps hover:bg-primary-fixed transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(196,192,255,0.2)]">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Mark as Paid
          </button>
        </div>
      </div>

      {/* Document Container (The Glass Card) */}
      <div className="glass-panel rounded-[24px] p-6 md:p-10 relative overflow-hidden">
        {/* Decorative Top Border Glow */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2 bg-secondary-container/20 border border-secondary-container/30 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-[#ffa17c] shadow-[0_0_8px_#ffa17c]"></div>
          <span className="font-label-caps text-[#ffa17c]">Pending Payment</span>
        </div>

        {/* Header Info */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12 border-b border-white/5 pb-8">
          {/* Vendor Info */}
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center border border-white/10 shrink-0">
              <span className="material-symbols-outlined text-3xl text-primary opacity-80">precision_manufacturing</span>
            </div>
            <div>
              <h2 className="font-display-md text-headline-lg-mobile text-on-surface mb-1">Nexus Tech Solutions</h2>
              <p className="font-mono-data text-body-sm text-on-surface-variant">Vendor ID: V-8834</p>
              <div className="mt-3 font-body-sm text-body-sm text-on-surface-variant/80">
                445 Innovation Blvd, Suite 200<br/>
                San Jose, CA 95110<br/>
                accounts@nexustech.io
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 md:text-right">
            <div>
              <div className="font-label-caps text-on-surface-variant mb-1">Invoice Number</div>
              <div className="font-mono-data text-body-md text-on-surface">INV-2023-0892</div>
            </div>
            <div>
              <div className="font-label-caps text-on-surface-variant mb-1">PO Number</div>
              <div className="font-mono-data text-body-md text-on-surface hover:text-primary cursor-pointer transition-colors">PO-44-091A</div>
            </div>
            <div>
              <div className="font-label-caps text-on-surface-variant mb-1">Issue Date</div>
              <div className="font-mono-data text-body-md text-on-surface">Oct 24, 2023</div>
            </div>
            <div>
              <div className="font-label-caps text-on-surface-variant mb-1">Due Date</div>
              <div className="font-mono-data text-body-md text-[#ffa17c] font-medium">Nov 23, 2023</div>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="mb-10">
          <div className="font-label-caps text-on-surface-variant mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">domain</span>
            Bill To
          </div>
          <h3 className="font-display-md text-body-lg font-medium text-on-surface">VendorBridge Corporate HQ</h3>
          <div className="font-body-sm text-body-sm text-on-surface-variant/80 mt-1">
            100 Enterprise Way, Floor 14<br/>
            New York, NY 10001<br/>
            United States
          </div>
        </div>

        {/* Line Items Table */}
        <div className="bg-surface-container-low/50 rounded-xl border border-white/5 overflow-x-auto mb-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-surface-container-high/30">
                <th className="py-4 px-6 font-label-caps text-on-surface-variant font-medium">Item Description</th>
                <th className="py-4 px-6 font-label-caps text-on-surface-variant font-medium text-right">Qty</th>
                <th className="py-4 px-6 font-label-caps text-on-surface-variant font-medium text-right">Rate</th>
                <th className="py-4 px-6 font-label-caps text-on-surface-variant font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="font-mono-data text-body-sm">
              <tr className="border-b border-white/5 hover:bg-surface-container-high/20 transition-colors">
                <td className="py-4 px-6 text-on-surface">
                  <div className="font-medium mb-1">Enterprise Server Racks (42U)</div>
                  <div className="text-[12px] text-on-surface-variant/60 font-body-sm">SKU: SR-42U-BLK-01</div>
                </td>
                <td className="py-4 px-6 text-right text-on-surface-variant">12</td>
                <td className="py-4 px-6 text-right text-on-surface-variant">$1,250.00</td>
                <td className="py-4 px-6 text-right text-on-surface">$15,000.00</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-surface-container-high/20 transition-colors">
                <td className="py-4 px-6 text-on-surface">
                  <div className="font-medium mb-1">Cisco Catalyst 9300 Switches</div>
                  <div className="text-[12px] text-on-surface-variant/60 font-body-sm">SKU: CS-9300-48P-E</div>
                </td>
                <td className="py-4 px-6 text-right text-on-surface-variant">4</td>
                <td className="py-4 px-6 text-right text-on-surface-variant">$4,800.00</td>
                <td className="py-4 px-6 text-right text-on-surface">$19,200.00</td>
              </tr>
              <tr className="hover:bg-surface-container-high/20 transition-colors">
                <td className="py-4 px-6 text-on-surface">
                  <div className="font-medium mb-1">On-site Installation & Configuration</div>
                  <div className="text-[12px] text-on-surface-variant/60 font-body-sm">Service ID: SVC-INSTALL-L2</div>
                </td>
                <td className="py-4 px-6 text-right text-on-surface-variant">40 <span className="text-[10px]">hrs</span></td>
                <td className="py-4 px-6 text-right text-on-surface-variant">$150.00</td>
                <td className="py-4 px-6 text-right text-on-surface">$6,000.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex flex-col md:flex-row justify-end border-t border-white/5 pt-8">
          <div className="w-full md:w-[350px]">
            <div className="space-y-3 font-mono-data text-body-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span className="">Subtotal</span>
                <span className="">$40,200.00</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span className="">CGST (9%)</span>
                <span className="">$3,618.00</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span className="">SGST (9%)</span>
                <span className="">$3,618.00</span>
              </div>
              <div className="h-px bg-white/10 my-4"></div>
              <div className="flex justify-between items-center bg-primary/10 p-4 rounded-xl border border-primary/20">
                <span className="font-label-caps text-primary">Grand Total</span>
                <span className="font-display-md text-headline-lg-mobile text-primary font-bold tracking-tight">$47,436.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-12 pt-8 border-t border-white/5 text-center md:text-left">
          <div className="font-label-caps text-on-surface-variant mb-2">Payment Instructions</div>
          <p className="font-body-sm text-body-sm text-on-surface-variant/70 max-w-2xl">
            Please remit payment to Nexus Tech Solutions via ACH or Wire Transfer within 30 days of invoice date. Bank details are attached to the PDF version of this document. Late payments are subject to a 1.5% monthly penalty fee.
          </p>
        </div>
      </div>
    </>
  );
}
