import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Overview', icon: 'grid_view', path: '/' },
    { name: 'Vendors', icon: 'group', path: '/vendors' },
    { name: 'RFQs', icon: 'description', path: '/rfqs' },
    { name: 'Quotations', icon: 'article', path: '/quotations' },
    { name: 'Approvals', icon: 'fact_check', path: '/approvals' },
    { name: 'Orders', icon: 'shopping_cart', path: '/orders' },
    { name: 'Invoices', icon: 'receipt_long', path: '/invoices' },
    { name: 'Reports', icon: 'bar_chart', path: '/reports' },
    { name: 'Activity', icon: 'history', path: '/activity' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-surface-container-lowest border-r border-white/5 flex flex-col py-6 px-4 z-50">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center bg-white rounded-lg">
            <span className="material-symbols-outlined text-primary font-bold">domain</span>
          </div>
          <div>
            <div className="font-display-md text-[18px] font-bold text-on-surface leading-none">VendorBridge</div>
            <div className="font-label-caps text-[10px] tracking-wider text-on-surface-variant mt-1">ENTERPRISE SAAS</div>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
        <button onClick={() => navigate('/rfqs')} className="mb-6 w-full bg-surface-container-lowest hover:bg-surface-container-low text-on-surface py-3 rounded-full flex justify-center items-center gap-2 font-display-md text-label-caps border border-white/10 transition-all">
          <span className="material-symbols-outlined text-[18px]">add</span>
          New Request
        </button>
        
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link 
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-display-md text-label-caps transition-all ${
                isActive 
                  ? 'bg-surface-container-high text-on-surface border-l-2 border-on-surface' 
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-1">
        <Link to="/help" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-200 font-display-md text-label-caps scale-95 active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-[20px]">help</span>
          <span>Help</span>
        </Link>
        <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors duration-200 font-display-md text-label-caps scale-95 active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
