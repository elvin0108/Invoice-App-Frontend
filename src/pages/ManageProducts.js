import React, { useState, useEffect, useCallback } from 'react';
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import * as MdIcons from 'react-icons/md';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [showDeleteOverlay, setShowDeleteOverlay] = useState(false);
    const [showEditOverlay, setShowEditOverlay] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productToEdit, setProductToEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [editProductData, setEditProductData] = useState({
        productDescription: '',
        hsnCode: '',
        rate: ''
    });

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`https://dkengineering-backend.onrender.com/products/manage/getAllProducts?page=${currentPage}&searchTerm=${searchTerm}&sortField=${sortField}&sortOrder=${sortOrder}`);
            const data = await response.json();
            setProducts(data.products);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, searchTerm, sortField, sortOrder]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts, currentPage, searchTerm, sortField, sortOrder]);

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

    const handleDeleteClick = (productId) => {
        setProductToDelete(productId);
        setShowDeleteOverlay(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`https://dkengineering-backend.onrender.com/products/manage/deleteProduct/${productToDelete}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                fetchProducts();
                setShowDeleteOverlay(false);
                setProductToDelete(null);
            } else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteOverlay(false);
        setProductToDelete(null);
    };

    const handleEditClick = (product) => {
        setProductToEdit(product);
        setEditProductData({
            productDescription: product.productDescription,
            hsnCode: product.hsnCode,
            rate: product.rate
        });
        setShowEditOverlay(true);
    };

    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setEditProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://dkengineering-backend.onrender.com/products/manage/updateProduct/${productToEdit._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editProductData)
            });
            if (response.ok) {
                fetchProducts();
                setShowEditOverlay(false);
                setProductToEdit(null);
            } else {
                console.error('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.productDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortField) {
            if (sortOrder === 'asc') {
                return a[sortField] > b[sortField] ? 1 : -1;
            } else {
                return a[sortField] < b[sortField] ? 1 : -1;
            }
        }
        return filteredProducts;
    });

    return (
        <div>
            {isLoading && (
                <div className="loading-mask">
                    <div className="spinner"></div>
                </div>
            )}
            <h1 className="manage-products-header">Manage Products</h1>
            {showDeleteOverlay && (
                <div className="overlay">
                    <div className="overlay-content">
                        <h2>Delete Alert!</h2>
                        <p>Are you sure you want to delete this product completely?</p>
                        <button onClick={handleDeleteConfirm}>Yes</button>
                        <button onClick={handleDeleteCancel}>No</button>
                    </div>
                </div>
            )}
            {showEditOverlay && (
                <div className="manage-product-overlay">
                    <div className="manage-product-overlay-content">
                        <h2>Edit Product</h2>
                        <form onSubmit={handleEditSubmit}>
                            <label>
                                Product Description:
                                <input
                                    type="text"
                                    name="productDescription"
                                    value={editProductData.productDescription}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                HSN Code:
                                <input
                                    type="text"
                                    name="hsnCode"
                                    value={editProductData.hsnCode}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <label>
                                Rate:
                                <input
                                    type="number"
                                    name="rate"
                                    value={editProductData.rate}
                                    onChange={handleEditChange}
                                />
                            </label>
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setShowEditOverlay(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
            <div className='manage-product-search-add'>
                <div className='manage-product-header'>
                    <div className='manage-product-searchbar'>
                        <input
                            type="text"
                            placeholder="Search by product description"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className='manage-product-searchbar-input'
                        />
                    </div>
                    <Link to="/products/add" className='manage-add-product-box' title="Click to Add products">
                        <div className="manage-add-product-icon"><MdIcons.MdOutlineManageAccounts /></div>
                    </Link>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('description')}>Product Description</th>
                        <th onClick={() => handleSort('hsnCode')}>HSN Code</th>
                        <th onClick={() => handleSort('rate')}>Rate</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedProducts.map(product => (
                        <tr key={product._id}>
                            <td>{product.productDescription}</td>
                            <td>{product.hsnCode}</td>
                            <td>{product.rate}</td>
                            <td>
                                <AiOutlineEdit className='edit-product' onClick={() => handleEditClick(product)} />
                            </td>
                            <td>
                                <AiOutlineDelete className="delete-product" onClick={() => handleDeleteClick(product._id)} />
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

export default ManageProducts;
