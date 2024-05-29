import React, { useState, useEffect, useCallback } from 'react';
import { FaRegEye } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineClose } from "react-icons/ai";
import { IoMdDownload } from "react-icons/io";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageInvoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [showOverlay, setShowOverlay] = useState(false);
    const [invoiceToDelete, setInvoiceToDelete] = useState(null);
    const [iframeSrc, setIframeSrc] = useState('');
    const [showInvoiceOverlay, setShowInvoiceOverlay] = useState(false);

    const fetchInvoices = useCallback(async () => {
        try {
            const response = await fetch(`https://dkengineering-backend.onrender.com/invoices/manage/getAllInvoices?page=${currentPage}&searchTerm=${searchTerm}&sortField=${sortField}&sortOrder=${sortOrder}`);
            const data = await response.json();
            setInvoices(data.invoices);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching invoices:', error);
        }
    }, [currentPage, searchTerm, sortField, sortOrder]);
    

    useEffect(() => {
        fetchInvoices();
    }, [fetchInvoices, currentPage, searchTerm, sortField, sortOrder]);
    

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to the first page
    };
    
    const handleSort = (field) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
        setCurrentPage(1); // Reset to the first page
    };

    const handleDeleteClick = (invoiceId) => {
        setInvoiceToDelete(invoiceId);
        setShowOverlay(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`https://dkengineering-backend.onrender.com/invoices/manage/deleteInvoice/${invoiceToDelete}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Fetch invoices again after deletion
                fetchInvoices();
                setShowOverlay(false);
                setInvoiceToDelete(null);
            } else {
                console.error('Failed to delete invoice');
            }
        } catch (error) {
            console.error('Error deleting invoice:', error);
        }
    };

    const handleDeleteCancel = () => {
        setShowOverlay(false);
        setInvoiceToDelete(null);
    };

    const handleViewClick = async (invoiceId) => {
        try {
            const response = await fetch(`https://dkengineering-backend.onrender.com/invoices/manage/viewInvoice/${invoiceId}`);
            const htmlContent = await response.text();
            const blob = new Blob([htmlContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            setIframeSrc(url);
            setShowInvoiceOverlay(true);
        } catch (error) {
            console.error('Error fetching invoice:', error);
        }
    };

    const handleInvoiceOverlayClose = () => {
        setShowInvoiceOverlay(false);
        setIframeSrc('');
    };

    const handleDownload = async (invoiceId) => {
        toast.success("Downloading the invoice", {
          position: toast.POSITION.TOP_RIGHT,
        });
      
        try {
          const response = await fetch(`https://dkengineering-backend.onrender.com/invoice/download/${invoiceId}`, { //https://dkengineering-backend.onrender.com
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = invoiceId+'.pdf';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
      
          toast.success("Invoice download successful", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } catch (error) {
          console.error('API error:', error);
          toast.error("Error in Downloading Invoice", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      };

      const filteredInvoices = invoices.filter(invoice => 
        invoice.CustomerDetail.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const sortedInvoices = [...filteredInvoices].sort((a, b) => {
        if (sortField) {
            if (sortOrder === 'asc') {
                return a[sortField] > b[sortField] ? 1 : -1;
            } else {
                return a[sortField] < b[sortField] ? 1 : -1;
            }
        }
        return filteredInvoices;
    });

    return (
        <div>
            <h1>Invoices</h1>
            {showOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Delete Alert!</h2>
                        <p>Are you sure you want to delete this invoice completely?</p>
                        <button onClick={handleDeleteConfirm}>Yes</button>
                        <button onClick={handleDeleteCancel}>No</button>
                    </div>
                </div>
            )}
            {showInvoiceOverlay && (
                <div className="invoice-overlay">
                    <div className="invoice-overlay-content">
                        <AiOutlineClose className="close-button" onClick={handleInvoiceOverlayClose} />
                        <iframe src={iframeSrc} title="Invoice" className="invoice-iframe"></iframe>
                    </div>
                </div>
            )}
            <div className='searchbar'>
                <input 
                    type="text" 
                    placeholder="Search by customer name" 
                    value={searchTerm} 
                    onChange={handleSearchChange}
                    className='searchbar-input' 
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('CustomerDetail.customerName')}>Customer Name</th>
                        <th onClick={() => handleSort('BillingDetails.TaxableAmount')}>Amount</th>
                        <th onClick={() => handleSort('createdAt')}>Date</th>
                        <th>View</th>
                        <th>Download</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedInvoices.map(invoice => (
                        <tr key={invoice._id}>
                            <td>{invoice.CustomerDetail.customerName}</td>
                            <td>{invoice.BillingDetails.TaxableAmount}</td>
                            <td>{new Date(invoice.createdAt).toLocaleDateString("en-IN")}</td>
                            <td>
                                <FaRegEye className='view-invoice' onClick={() => handleViewClick(invoice._id)}/>
                            </td>
                            <td>
                                <IoMdDownload className="download-invoice" onClick={() => handleDownload(invoice.id)} />
                            </td>
                            <td>
                                <AiOutlineDelete className="delete-invoice" onClick={() => handleDeleteClick(invoice._id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='pagination'>
                <div className='pagination-btns'>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            disabled={index + 1 === currentPage}
                            className={`pagination-button ${index + 1 === currentPage ? 'pagination-button-active' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManageInvoices;
