import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
  
  {
    title: 'Dashboard',
    path: '/',
    icon: <AiIcons.AiFillDashboard />
  },
  {
    title: 'Invoices',
    path: '/invoices',
    icon: <FaIcons.FaFileInvoice />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Create Invoice',
        path: '/invoices/create',
        icon: <IoIcons.IoIosCreate />
      },
      {
        title: 'Manage Invoices',
        path: '/invoices/manage',
        icon: <MdIcons.MdOutlineManageAccounts />
      },
      {
        title: 'Download CSV',
        path: '/invoices/download',
        icon: <AiIcons.AiOutlineCloudDownload />
      }
    ]
  },
  {
    title: 'Products',
    path: '/',
    icon: <BsIcons.BsFillHouseGearFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add Products',
        path: '/products/add',
        icon: <AiIcons.AiOutlineAppstoreAdd />,
        cName: 'sub-nav'
      },
      {
        title: 'Manage Products',
        path: '/products/manage',
        icon: <MdIcons.MdOutlineManageAccounts />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Customers',
    path: '/',
    icon: <FaIcons.FaUsersCog />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Add Customers',
        path: '/customers/add',
        icon: <AiIcons.AiOutlineUsergroupAdd/>
      },
      {
        title: 'Manage Customers',
        path: '/customers/manage',
        icon: <MdIcons.MdOutlineManageAccounts  />
      }
    ]
  },
  {
    title: 'Support',
    path: '/support',
    icon: <RiIcons.RiCustomerService2Fill />
  }
];