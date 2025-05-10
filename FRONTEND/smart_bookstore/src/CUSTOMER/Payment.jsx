import React, { useState } from 'react';
import '../CSS/Payment.css'; 
function PaymentPage() {
  const [form, setForm] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    address: '',
    zip: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment submitted:', form);
  };

  return (
    <div className="page-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <h2 className="form-title">Payment Details</h2>

        <div className="form-group">
          <label>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" />
        </div>

        <div className="form-group">
          <label>Card Number</label>
          <input name="cardNumber" value={form.cardNumber} onChange={handleChange} required placeholder="1234 5678 9012 3456" />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Expiry</label>
            <input name="expiry" value={form.expiry} onChange={handleChange} required placeholder="MM/YY" />
          </div>
          <div className="form-group">
            <label>CVC</label>
            <input name="cvc" value={form.cvc} onChange={handleChange} required placeholder="123" />
          </div>
        </div>

        <div className="form-group">
          <label>Billing Address</label>
          <input name="address" value={form.address} onChange={handleChange} required placeholder="123 Main St" />
        </div>

        <div className="form-group">
          <label>ZIP Code</label>
          <input name="zip" value={form.zip} onChange={handleChange} required placeholder="12345" />
        </div>

        <button type="submit" className="submit-button">Pay Now</button>
      </form>
    </div>
  );
}
export default PaymentPage