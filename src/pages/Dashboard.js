import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import * as HiIcons from 'react-icons/hi2';

const Dashboard = () => {
  return (
    <div className='home'>
      <div className='container'>
        <div className='box'>
          <div className='box-head'>
          <div className='num'>100</div>
          <FaIcons.FaRupeeSign />
          </div>
          <div className='text'>Sales Amount</div>
        </div>
        <div className='box'>
          <div className='box-head'>
          <div className='num'>6</div>
          <FaIcons.FaFileInvoice />
          </div>
          <div className='text'>Total Invoices</div>
        </div>
        <div className='box'>
        <div className='box-head'>
          <div className='num'>3</div>
          <MdIcons.MdPendingActions />
          </div>
          <div className='text'>Pending Bills</div>
          
        </div>
        <div className='box'>
        <div className='box-head'>
          <div className='num'>1209</div>
          <RiIcons.RiPassPendingLine />
          </div>
          <div className='text'>Due Amount</div>
          
        </div>
        <div className='box'>
        <div className='box-head'>
          <div className='num'>8</div>
          <BsIcons.BsFillHouseGearFill />
          </div>
          <div className='text'>Total Products</div>
         
        </div>
        <div className='box'>
        <div className='box-head'>
          <div className='num'>10</div>
          <FaIcons.FaUsersCog />
          </div>
          <div className='text'>Total Customers</div>
          
        </div>
        <div className='box'>
        <div className='box-head'>
          <div className='num'>3</div>
          <HiIcons.HiClipboardDocumentCheck />
          </div>
          <div className='text'>Paid Bills</div> 
        </div>
      </div>
    </div>
  );
};

export default Dashboard;