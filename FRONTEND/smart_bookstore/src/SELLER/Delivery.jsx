import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Delivery.css'

const App = () => {
  // State to store fetched bills and form data
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch bills from the backend by email
  useEffect(() => {
    if (email) {  // Only fetch bills when email is entered
      axios.get(`http://localhost:5000/api/bills?email=${email}`)
        .then(response => {
          setBills(response.data); // Set bills specific to the entered email
        })
        .catch(error => console.error('Error fetching bills:', error));
    }
  }, [email]);  // Effect runs when the email state changes

  // Handle selecting a bill to populate the form
  const handleSelectBill = (bill) => {
    setSelectedBill(bill);
    setService(bill.service);
    setTotalAmount(bill.totalAmount);
  };

  // Handle submitting the form
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Submitted Successfully')
    const billData = { email, service, quantity, totalAmount };

    // Save the bill data to the backend
    axios.post('http://localhost:5000/api/bills', billData)
      .then(response => {
        alert('Delivery Confirmed! Your bill has been submitted.');
        // Clear the form after submission
        setEmail('');
        setService('');
        setQuantity(1);
        setTotalAmount(0);
      })
      .catch(error => console.error('Error submitting bill:', error));
  };


  
  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      {/* Sidebar: display list of bills only if email is entered */}
      {email && (
        <div style={{ width: '250px', padding: '10px', borderRight: '1px solid #ccc' }}>
          <h3>Bill Items</h3>
          <ul>
            {bills.map((bill, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                <span>{bill.service} - ${bill.totalAmount}</span>
                <button
                  style={{ marginLeft: '10px', padding: '5px 10px' }}
                  onClick={() => handleSelectBill(bill)}
                >
                  Select
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Form: allow user to submit bill details */}
      <div style={{ padding: '10px', flex: 1 }}>
        <h3>Create Bill</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Service: </label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">Select a service</option>
              <option value="Pathao">Pathao</option>
              <option value="Redx">Redx</option>
              <option value="Steadfast">Steadfast</option>
              <option value="Fedx">Fedx</option>
            </select>
          </div>


          <div style={{ marginBottom: '10px' }}>
            <label>Quantity: </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Total Amount: </label>
            <input
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>

          <button
            type="submit"
            style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
