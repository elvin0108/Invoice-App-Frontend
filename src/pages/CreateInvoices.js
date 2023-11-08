import React, { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { toast,ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [placeOfSupply, setPlaceOfSupply] = useState('');
  const [gstInNo, setGstInNo] = useState('');

  const [products, setProducts] = useState([]);
  const [productDescription, setProductDescription] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rate, setRate] = useState('');

  const [amount, setAmount] = useState(0);
  const [centralTax, setCentralTax] = useState(0);
  const [centralTaxAmount, setCentralTaxAmount] = useState(0);
  const [stateTax, setStateTax] = useState(0);
  const [stateTaxAmount, setStateTaxAmount] = useState(0);
  const [roundOff, setRoundOff] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  const [invoiceId, setInvoiceID] = useState('');

  const updateTaxableAmount = (products) => {
    const taxableAmount = products.reduce((total, product) => total + parseFloat(product.amount), 0);
    setAmount(taxableAmount);
  };

  const updateCentralTaxAmount = (amount,tax) =>{
    const centralTaxAmount = (amount*tax)/100;
    setCentralTaxAmount(centralTaxAmount);
    updateGrandTotal(amount,centralTaxAmount,stateTaxAmount,0);
  }

  const updateStateTaxAmount = (amount,tax) => {
    const stateTaxAmount = (amount*tax)/100;
    setStateTaxAmount(stateTaxAmount);
    updateGrandTotal(amount,centralTaxAmount,stateTaxAmount,0);
  }

  const updateGrandTotal = (amount,centralTaxAmount, stateTaxAmount, roundoff) => {
    const total = parseFloat(amount) + parseFloat(centralTaxAmount) + parseFloat(stateTaxAmount) + parseFloat(roundoff);
    setGrandTotal(total);
  };

  const addProduct = () => {
    const newProduct = {
      productDescription,
      hsnCode,
      quantity,
      rate,
      amount: (quantity * rate).toFixed(2),
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    updateTaxableAmount(updatedProducts);
    setProductDescription('');
    setHsnCode('');
    setQuantity('');
    setRate('');
  };

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    updateTaxableAmount(updatedProducts);
  };

  const resetData = () => {
    setCentralTax(0);
    setCentralTaxAmount(0);
    setStateTax(0);
    setStateTaxAmount(0);
    setGrandTotal(0);
    setRoundOff(0);
  }

  const handleSave = () => {
    toast.success("Saving the invoice",{
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    })
    const formData = {
      customerName,
      address,
      placeOfSupply,
      gstInNo,
      products,
      amount,
      centralTax,
      stateTax,
      centralTaxAmount,
      stateTaxAmount,
      grandTotal,
      roundOff
    };

    fetch('https://invoice-app-backend-delta.vercel.app/invoice/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here if needed
        setInvoiceID(data);
        console.log(`Bill of ${data} created successfully`);
      })
      .catch((error) => {
        // Handle errors here
        console.error('API error:', error);
      });
  };

  const handleDownload = async () => {
    toast.success("Downloading the invoice", {
      position: toast.POSITION.TOP_RIGHT,
    });
  
    try {
      const response = await fetch(`https://invoice-app-backend-delta.vercel.app/invoice/download/${invoiceId}`, {
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
  

  return (
    <div class="create-invoice">
      <ToastContainer/>
      <div class="invoice-container">
        <h1>Create Invoice</h1>
        <hr />

        <div class="bill-box1">
          <div class="bill-box-header">
            <h3>Customer information</h3>
            <Button class="select">
              Select Existing Customer
            </Button>
          </div>
          <hr />
          <Form>
            <Form.Group class="form-group">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control class="form-input"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </Form.Group>

            <Form.Group class="form-group">
              <Form.Label>Address</Form.Label>
              <Form.Control class="form-input"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group class="form-group">
              <Form.Label>Place of Supply</Form.Label>
              <Form.Control class="form-input"
                type="text"
                value={placeOfSupply}
                onChange={(e) => setPlaceOfSupply(e.target.value)}
              />
            </Form.Group>

            <Form.Group class="form-group">
              <Form.Label>GST IN No.</Form.Label>
              <Form.Control
                class="form-input"
                type="text"
                value={gstInNo}
                onChange={(e) => setGstInNo(e.target.value)}
              />
            </Form.Group>
          </Form>
        </div>

        <div class="bill-box2">
          <div class="bill-box-header">
            <h3>Products information</h3>
            <Button class="select">
              Select Existing Customer
            </Button>
          </div>
          <hr />
          <Form>
            <Form.Group class="form-group">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group class="form-group">
              <Form.Label>HSN Code</Form.Label>
              <Form.Control
                type="text"
                value={hsnCode}
                onChange={(e) => setHsnCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group class="form-group">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>

            <Form.Group class="form-group">
              <Form.Label>Rate</Form.Label>
              <Form.Control
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </Form.Group>

            <Button class="add-button" variant="success" onClick={addProduct}>
              Add Product
            </Button>
          </Form>
        </div>

        <div class="table-resp">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Description</th>
                <th>HSN Code</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{product.productDescription}</td>
                  <td>{product.hsnCode}</td>
                  <td>{product.quantity}</td>
                  <td>{product.rate}</td>
                  <td>{product.amount}</td>
                  <td>
                    <Button class="delete" variant="danger" onClick={() => deleteProduct(index)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div class="bill-box3">
        <div class="bill-box-header">
            <h3 class="bill-details">Billing Details</h3>
            <Button id="reset" onClick={resetData}>
              Reset
            </Button>
          </div>

          <hr />
          <Form>
            <Form.Group class="form-group">
              <Form.Label>Taxable Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                readOnly
              />
            </Form.Group>

            <Form.Group class="form-group">
              <Form.Label>Central Tax</Form.Label>
              <div class="cent-tax">
              <Form.Control id="cent-tax"
                type="number"
                value={centralTax}
                onChange={(e) => {
                  setCentralTax(e.target.value);
                  updateCentralTaxAmount(amount,e.target.value);
                }}
                
              />
              <Form.Control id="cent-tax-amount"
                type="number"
                value={centralTaxAmount}
                readOnly
              />
              </div>
            </Form.Group>

            <Form.Group class="form-group">
              <Form.Label>Sate/UT Tax</Form.Label>
              <div class="state-tax">
              <Form.Control
                id="state-tax"
                type="number"
                value={stateTax}
                onChange={(e) => {
                  setStateTax(e.target.value);
                  updateStateTaxAmount(amount,e.target.value);
                }}
                
              />
              <Form.Control
                id="state-tax-amount"
                type="number"
                value={stateTaxAmount}
                readOnly
              />
              </div>
            </Form.Group>

            <Form.Group class="form-group">
              <Form.Label>Grand Total</Form.Label>
              <Form.Control
                type="number"
                value={grandTotal}
                readOnly
              />
            </Form.Group>

            <Form.Group class="form-group">
              <Form.Label>Round off.</Form.Label>
              <Form.Control
                type="number"
                value={roundOff}
                onChange={(e) => {
                  setRoundOff(e.target.value);
                  updateGrandTotal(amount,centralTaxAmount,stateTaxAmount,e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </div>

        <div class="buttons">
          <Button class="save" variant="primary" onClick={handleSave}>Save</Button>
          <Button class="download" variant="info" onClick={handleDownload}>Download</Button>
          <Button class="print" variant="secondary">Print</Button>
        </div>



      </div>
    </div>
  );
};

export default OrderForm;
