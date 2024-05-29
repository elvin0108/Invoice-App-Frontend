import React from 'react';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
const Invoices = () => {
  return (
    <div className='invoices-nav'>
      <Link to="/invoices/create" className='invoice-box'>
      <div className="invoice-icon"><IoIcons.IoIosCreate /></div>
          <div className='invoice-box-text'>Create Invoice</div>
      </Link>
      <Link to="/invoices/manage"  className='invoice-box'>
      <div className="invoice-icon"><MdIcons.MdOutlineManageAccounts /></div>
          <div className='invoice-box-text'>Manage Invoice</div>
      </Link>
      <Link to="/invoices/manage"  className='invoice-box'>
        <div className="invoice-icon"><AiIcons.AiOutlineCloudDownload /></div>
          <div className='invoice-box-text'>Download CSV</div>
      </Link>
    </div>
  );
};

export default Invoices;