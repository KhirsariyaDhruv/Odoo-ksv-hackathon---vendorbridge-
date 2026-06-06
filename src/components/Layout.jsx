import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen ml-[280px]">
        <Header />
        <main className="flex-1 overflow-y-auto p-container-padding">
          {children}
        </main>
      </div>
    </div>
  );
}
