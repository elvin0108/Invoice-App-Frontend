import React from 'react';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
const Products = () => {
  return (
    <div className='invoices-nav'>
      <Link to="/products/add" className='invoice-box'>
      <div className="invoice-icon"><IoIcons.IoIosCreate /></div>
          <div className='invoice-box-text'>Add Product</div>
      </Link>
      <Link to="/products/manage"  className='invoice-box'>
      <div className="invoice-icon"><MdIcons.MdOutlineManageAccounts /></div>
          <div className='invoice-box-text'>Manage Product</div>
      </Link>
      <Link to="/invoices/manage"  className='invoice-box'>
        <div className="invoice-icon"><AiIcons.AiOutlineCloudDownload /></div>
          <div className='invoice-box-text'>Download CSV</div>
      </Link>
    </div>
  );
};

export default Products;