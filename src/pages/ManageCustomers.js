import React, { useState, useEffect, useCallback } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import * as MdIcons from 'react-icons/md';

const ManageCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);
    const [showEditOverlay, setShowEditOverlay] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [customerToEdit, setCustomerToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [editCustomerData, setEditCustomerData] = useState({
        customerName: '',
        address: '',
        placeOfSupply: '',
        gstNo: ''
    });

    const fetchCustomers = useCallback(async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');  
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        try {
            const response = await fetch(`https://dkengineering-backend.onrender.com/customers/manage/getAllCustomers?page=${currentPage}&searchTerm=${searchTerm}&sortField=${sortField}&sortOrder=${sortOrder}`, {headers});
            const data = await response.json();
            setCustomers(data.customers);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, searchTerm, sortField, sortOrder]);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers, currentPage, searchTerm, sortField, sortOrder]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleSort = (field) => {
        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(order);
        setCurrentPage(1);
    };

    const handleDeleteClick = (customerId) => {
        setCustomerToDelete(customerId);
        setShowDeleteOverlay(true);
    };

    const handleDeleteConfirm = async () => {
        const token = localStorage.getItem('token');  
        try {
            const response = await fetch(`https://dkengineering-backend.onrender.com/customers/manage/deleteCustomer/${customerToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
            });
            if (response.ok) {
                fetchCustomers();
                setShowDeleteOverlay(false);
                setCustomerToDelete(null);
            } else {
                console.error('Failed to delete customer');
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteOverlay(false);
        setCustomerToDelete(null);
    };

    const handleEditClick = (customer) => {
        setCustomerToEdit(customer);
        setEditCustomerData({
            customerName: customer.customerName,
            address: customer.Address,
            placeOfSupply: customer.PlaceOfSupply,
            gstNo: customer.GSTNo
        });
        setShowEditOverlay(true);
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditCustomerData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');  
        try {
            const response = await fetch(`https://dkengineering-backend.onrender.com/customers/manage/updateCustomer/${customerToEdit._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                body: JSON.stringify(editCustomerData)
            });
            if (response.ok) {
                fetchCustomers();
                setShowEditOverlay(false);
                setCustomerToEdit(null);
            } else {
                console.error('Failed to update customer');
            }
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    const filteredCustomers = customers.filter(customer =>
        customer.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
        if (sortField) {
            if (sortOrder === 'asc') {
                return a[sortField] > b[sortField] ? 1 : -1;
            } else {
                return a[sortField] < b[sortField] ? 1 : -1;
            }
        }
        return filteredCustomers;
    });

    return (
        <div>
            {isLoading && (
                <div className="loading-mask">
                    <div className="spinner"></div>
                </div>
            )}
            <h1 className="manage-customers-header">Manage Customers</h1>
            {showDeleteOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Delete Alert!</h2>
                        <p>Are you sure you want to delete this customer completely?</p>
                        <button onClick={handleDeleteConfirm}>Yes</button>
                        <button onClick={handleDeleteCancel}>No</button>
                    </div>
                </div>
            )}
            {showEditOverlay && (
                <div className="manage-customer-overlay">
                    <div className="manage-customer-overlay-content">
                        <h2>Edit Customer</h2>
                        <form onSubmit={handleEditSubmit}>
                            <label>
                                Customer Name:
                                <input
                                    type="text"
                                    name="customerName"
                                    value={editCustomerData.customerName}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Address:
                                <input
                                    type="text"
                                    name="address"
                                    value={editCustomerData.address}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Place of Supply:
                                <input
                                    type="text"
                                    name="placeOfSupply"
                                    value={editCustomerData.placeOfSupply}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                GST No:
                                <input
                                    type="text"
                                    name="gstNo"
                                    value={editCustomerData.gstNo}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setShowEditOverlay(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
            <div className='manage-customer-search-add'>
                <div className='manage-customer-header'>
                    <div className='manage-customer-searchbar'>
                        <input
                            type="text"
                            placeholder="Search by customer name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className='manage-customer-searchbar-input'
                        />
                    </div>
                    <Link to="/customers/add" className='manage-add-customer-box' title="Click to Add customers">
                        <div className="manage-add-customer-icon"><MdIcons.MdOutlineManageAccounts /></div>
                    </Link>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('customerName')}>Customer Name</th>
                        <th onClick={() => handleSort('address')}>Address</th>
                        <th onClick={() => handleSort('placeOfSupply')}>Place of Supply</th>
                        <th onClick={() => handleSort('gstNo')}>GST No</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCustomers.map(customer => (
                        <tr key={customer._id}>
                            <td>{customer.customerName}</td>
                            <td>{customer.Address}</td>
                            <td>{customer.PlaceOfSupply}</td>
                            <td>{customer.GSTNo}</td>
                            <td>
                                <AiOutlineEdit className='edit-customer' onClick={() => handleEditClick(customer)} />
                            </td>
                            <td>
                                <AiOutlineDelete className="delete-customer" onClick={() => handleDeleteClick(customer._id)} />
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

export default ManageCustomers;
