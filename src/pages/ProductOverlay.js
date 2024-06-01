import React, { useState, useEffect, useCallback } from 'react';
import {AiOutlineClose } from "react-icons/ai";

const ProductOverlay = ({ show, onClose, onSelect }) => {
  const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isLoading, setIsLoading] = useState(false);

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
    if (show) {
    fetchProducts();
    }
}, [fetchProducts, currentPage, searchTerm, sortField, sortOrder, show]);

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

  if (!show) {
    return null;
  }

  return (
    <div className="products-list-overlay">
      {isLoading && (
                <div className="loading-mask">
                    <div className="spinner"></div>
                </div>
            )}
      <div className="products-list-overlay-content">
      <AiOutlineClose className="products-list-close-button" onClick={onClose}/>
        <h3>Select Existing Product</h3>
        <div className='searchbar'>
                <input 
                    type="text" 
                    placeholder="Search by product description" 
                    value={searchTerm} 
                    onChange={handleSearchChange}
                    className='product-overlay-searchbar-input' 
                />
            </div>
        <table>
                <thead>
                    <tr>
                    <th onClick={() => handleSort('description')}>Product Description</th>
                        <th onClick={() => handleSort('hsnCode')}>HSN Code</th>
                        <th onClick={() => handleSort('rate')}>Rate</th>
                    </tr>
                </thead>
                <tbody>
                {sortedProducts.map(product => (
                        <tr key={product.id} onClick={() => onSelect(product)}>
                            <td>{product.productDescription}</td>
                            <td>{product.hsnCode}</td>
                            <td>{product.rate}</td>
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
    </div>
  );
};

export default ProductOverlay;
