import './App.css';
import Layout from './Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Invoices from './pages/Invoices';
import CreateInvoices from './pages/CreateInvoices';
import Products from './pages/Products';
import AddProducts from './pages/AddProducts';
import Customers from './pages/Customers';
import ManageInvoices from './pages/ManageInvoices';
import ManageProducts from './pages/ManageProducts';
import AddCustomer from './pages/AddCustomers';
import ManageCustomers from './pages/ManageCustomers';
import Login from './pages/LoginPage';
import PrivateRoute from './pages/PrivateRoute';
import SignUp from './pages/SignupPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/invoices" element={<PrivateRoute><Invoices /></PrivateRoute>} />
          <Route path="/invoices/create" element={<PrivateRoute><CreateInvoices /></PrivateRoute>} />
          <Route path="/invoices/manage" element={<PrivateRoute><ManageInvoices /></PrivateRoute>} />
          <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="/products/add" element={<PrivateRoute><AddProducts /></PrivateRoute>} />
          <Route path="/products/manage" element={<PrivateRoute><ManageProducts /></PrivateRoute>} />
          <Route path="/customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
          <Route path="/customers/add" element={<PrivateRoute><AddCustomer /></PrivateRoute>} />
          <Route path="/customers/manage" element={<PrivateRoute><ManageCustomers /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/elvin/authentication/khunt/password" element={<SignUp/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
