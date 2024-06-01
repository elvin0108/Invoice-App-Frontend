import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import * as HiIcons from 'react-icons/hi2';

const Dashboard = () => {
  const [salesAmount, setSalesAmount] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState(0);
  // const [pendingBills, setPendingBills] = useState(0);
  // const [dueAmount, setDueAmount] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  // const [paidBills, setPaidBills] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const invoicesRes = await fetch('https://dkengineering-backend.onrender.com/invoices/total');
        const invoicesData = await invoicesRes.json();
        setTotalInvoices(invoicesData.totalInvoices);
        setSalesAmount(invoicesData.salesAmount);

        // Fetch other data
        const customersRes = await fetch('https://dkengineering-backend.onrender.com/customers/total');
        const customersData = await customersRes.json();
        setTotalCustomers(customersData);

        const productsRes = await fetch('https://dkengineering-backend.onrender.com/products/total');
        const productsData = await productsRes.json();
        setTotalProducts(productsData);

        // Pending bills and due amount will be handled later
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className='home'>
      <div className='container'>
        <div className='box'>
          <div className='box-head'>
            <div className='num'>{salesAmount}</div>
            <FaIcons.FaRupeeSign />
          </div>
          <div className='text'>Sales Amount</div>
        </div>
        <div className='box'>
          <div className='box-head'>
            <div className='num'>{totalInvoices}</div>
            <FaIcons.FaFileInvoice />
          </div>
          <div className='text'>Total Invoices</div>
        </div>
        <div className='box'>
          <div className='box-head'>
            <div className='num'>NA</div>
            <MdIcons.MdPendingActions />
          </div>
          <div className='text'>Pending Bills</div>
        </div>
        <div className='box'>
          <div className='box-head'>
            <div className='num'>NA</div>
            <RiIcons.RiPassPendingLine />
          </div>
          <div className='text'>Due Amount</div>
        </div>
        <div className='box'>
          <div className='box-head'>
            <div className='num'>{totalProducts}</div>
            <BsIcons.BsFillHouseGearFill />
          </div>
          <div className='text'>Total Products</div>
        </div>
        <div className='box'>
          <div className='box-head'>
            <div className='num'>{totalCustomers}</div>
            <FaIcons.FaUsersCog />
          </div>
          <div className='text'>Total Customers</div>
        </div>
        <div className='box'>
          <div className='box-head'>
            <div className='num'>{totalInvoices}</div>
            <HiIcons.HiClipboardDocumentCheck />
          </div>
          <div className='text'>Paid Bills</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
