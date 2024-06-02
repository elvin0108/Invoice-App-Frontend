import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import * as MdIcons from 'react-icons/md';

const AddProducts = () => {
    const [productDescription, setProductDescription] = useState("");
    const [hsnCode, setHsnCode] = useState("");
    const [rate, setRate] = useState("");

    const handleAddProduct = async (event) => {
        event.preventDefault();

        const productData = {
            productDescription,
            hsnCode,
            rate
        };

        try {
            toast.success('Adding Product', {
                position: toast.POSITION.TOP_RIGHT,
              });
              const token = localStorage.getItem('token');  
            const response = await fetch('https://dkengineering-backend.onrender.com/products/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  },
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                toast.error('Error in Adding Product', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                throw new Error('Failed to add product');
            }

            const productId = await response.json();
            console.log('Product added with ID:', productId);
            // Reset form fields after successful submission
            setProductDescription("");
            setHsnCode("");
            setRate("");
            toast.success('Product added successfuly', {
                position: toast.POSITION.TOP_RIGHT,
              });
        } catch (error) {
            toast.error('Error in Adding Invoice', {
                position: toast.POSITION.TOP_RIGHT,
              });
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="add-product-page">
            <ToastContainer />
            <h1>Add Products</h1>
            <div className="add-product-page-bill-box">
                <div className="add-product-page-bill-box-header">
                    <h3>Products information</h3>
                    <Link to="/products/manage" className='add-product-box'>
                            <div className="add-product-icon"><MdIcons.MdOutlineManageAccounts /></div>
                            <div className='add-product-box-text'>Manage Product</div>
                        </Link>
                </div>
                <hr />
                <Form onSubmit={handleAddProduct}>
                    <Form.Group className="form-group">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label>HSN Code</Form.Label>
                        <Form.Control
                            type="text"
                            value={hsnCode}
                            onChange={(e) => setHsnCode(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label>Rate</Form.Label>
                        <Form.Control
                            type="number"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            required
                        />
                    </Form.Group>

                        <Button type="submit" className="add-product-page-add-button" variant="success">
                            Add Product
                        </Button>
                </Form>
            </div>
        </div>
    );
};

export default AddProducts;
