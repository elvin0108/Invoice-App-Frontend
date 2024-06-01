import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import * as MdIcons from 'react-icons/md';

const AddCustomer = () => {
    const [customerName, setCustomerName] = useState("");
    const [placeOfSupply, setPlaceOfSupply] = useState("");
    const [gstNo, setGstNo] = useState("");
    const [address, setAddress] = useState("");

    const handleAddCustomer = async (event) => {
        event.preventDefault();

        const customerData = {
            customerName,
            address,
            placeOfSupply,
            gstNo
        };

        try {
            toast.success('Adding Customer', {
                position: toast.POSITION.TOP_RIGHT,
            });
            const response = await fetch('https://dkengineering-backend.onrender.com/customers/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(customerData)
            });

            if (!response.ok) {
                toast.error('Error in Adding Customer', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                throw new Error('Failed to add customer');
            }

            const customerId = await response.json();
            console.log('Customer added with ID:', customerId);
            // Reset form fields after successful submission
            setCustomerName("");
            setAddress("");
            setPlaceOfSupply("");
            setGstNo("");
            toast.success('Customer added successfully', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } catch (error) {
            toast.error('Error in Adding Customer', {
                position: toast.POSITION.TOP_RIGHT,
            });
            console.error('Error adding customer:', error);
        }
    };

    return (
        <div className="add-customer-page">
            <ToastContainer />
            <h1>Add Customer</h1>
            <div className="add-customer-page-bill-box">
                <div className="add-customer-page-bill-box-header">
                    <h3>Customer Information</h3>
                    <Link to="/customers/manage" className='add-customer-box'>
                        <div className="add-customer-icon"><MdIcons.MdOutlineManageAccounts /></div>
                        <div className='add-customer-box-text'>Manage Customers</div>
                    </Link>
                </div>
                <hr />
                <Form onSubmit={handleAddCustomer}>
                    <Form.Group className="form-group">
                        <Form.Label>Customer Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label>Place of Supply</Form.Label>
                        <Form.Control
                            type="text"
                            value={placeOfSupply}
                            onChange={(e) => setPlaceOfSupply(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="form-group">
                        <Form.Label>GST No.</Form.Label>
                        <Form.Control
                            type="text"
                            value={gstNo}
                            onChange={(e) => setGstNo(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button type="submit" className="add-customer-page-add-button" variant="success">
                        Add Customer
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AddCustomer;
