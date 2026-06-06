import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Vendors } from './pages/Vendors';
import { CreateRFQ } from './pages/CreateRFQ';
import { RFQs } from './pages/RFQs';
import { Quotations } from './pages/Quotations';
import { Approvals } from './pages/Approvals';
import { Orders } from './pages/Orders';
import { POInvoices } from './pages/POInvoices';
import { Invoices } from './pages/Invoices';
import { Reports } from './pages/Reports';
import { Activity } from './pages/Activity';
import { Help } from './pages/Help';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  if (isAuthPage) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/rfqs/create" element={<CreateRFQ />} />
        <Route path="/rfqs" element={<RFQs />} />
        <Route path="/quotations" element={<Quotations />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/invoices/:id" element={<POInvoices />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/help" element={<Help />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
