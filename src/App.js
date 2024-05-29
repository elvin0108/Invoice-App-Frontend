import './App.css';
import Layout from './Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import CreateInvoices from './pages/CreateInvoices'
import Products from './pages/Products';
import Customers from './pages/Customers';
import ManageInvoices from './pages/ManageInvoices';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path={'/invoices/'} element={<Invoices />} />
          <Route path={'/invoices/create'} element={<CreateInvoices />} />
          <Route path={'/invoices/manage'} element={<ManageInvoices />} />
          <Route path={'/products'} element={<Products />} />
          <Route path={'/customers'} element={<Customers />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;