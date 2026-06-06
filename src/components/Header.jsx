export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-surface/80 backdrop-blur-xl dark:bg-surface/80 border-b border-white/10 flex justify-between items-center px-gutter-grid h-20">
      <div className="flex-1 max-w-xl relative group">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
        <input 
          className="w-full bg-surface-container/50 border border-white/10 text-on-surface placeholder:text-on-surface-variant/50 rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-body-sm" 
          placeholder="Search vendors, GST, categories..." 
          type="text" 
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 rounded-full bg-surface-container border border-white/5 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100 relative">
          <span className="material-symbols-outlined text-[20px]">notifications</span>
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-error rounded-full shadow-[0_0_8px_rgba(255,180,171,0.6)]"></span>
        </button>
        <button className="w-10 h-10 rounded-full bg-surface-container border border-white/5 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </button>
        <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
        <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="text-right hidden md:block">
            <div className="font-body-sm font-medium text-on-surface leading-tight">Good Evening, Admin</div>
            <div className="font-label-caps text-[10px] text-on-surface-variant">Admin</div>
          </div>
          <div className="w-10 h-10 rounded-full object-cover border-2 border-surface-container-high bg-primary text-on-primary flex items-center justify-center font-display-md font-bold text-lg">
            A
          </div>
        </button>
      </div>
    </header>
  );
}
