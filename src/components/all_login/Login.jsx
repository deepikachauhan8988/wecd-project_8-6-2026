import React, { useState } from 'react';
import './../../assets/css/hcmData.css';

const Login = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // State for form inputs
  const [formData, setFormData] = useState({
    project_id: '1876',
    month: '4',
    year: '2026'
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission (POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData([]); // Clear previous data

    try {
      const response = await fetch('https://apisetu.gov.in/pt/5/srv/v1/hcm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-APISETU-CLIENTID': 'in.gov.uk.wecd',
          'X-APISETU-APIKEY': '4e29fb6ab061d4ef8665a90660ffe3963db7a55039d36e031f18298ad62adb14'
        },
        body: JSON.stringify(formData) // Send the current form data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // Handle response structure
      let hcmData = [];
      if (result && Array.isArray(result.data)) {
        hcmData = result.data;
      } else if (Array.isArray(result)) {
        hcmData = result;
      }
      setData(hcmData);
    } catch (err) {
      console.error('Error fetching HCM data:', err);
      setError(err.message || 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  // Check if we have valid data to display
  const hasValidData = Array.isArray(data) && data.length > 0 && 
                      data.some(item => item && typeof item === 'object');

  return (
    <div className="hcm-data-container">
      <h2>HCM Beneficiary Data</h2>
      
      {/* Form to trigger POST request */}
      <form onSubmit={handleSubmit} className="hcm-form">
        <div className="form-group">
          <label>Project ID:</label>
          <input 
            type="number" 
            name="project_id" 
            value={formData.project_id} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Month:</label>
          <input 
            type="text" 
            name="month" 
            value={formData.month} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Year:</label>
          <input 
            type="text" 
            name="year" 
            value={formData.year} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="submit-btn">Get Data</button>
      </form>

      {/* Data Table */}
      {!hasValidData ? (
        data.length === 0 && !loading ? <p>No data available</p> : null
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              {/* Generate table headers dynamically */}
              {data
                .filter(item => item && typeof item === 'object')
                .slice(0, 1)
                .map(item => 
                  Object.keys(item).map(key => (
                    <th key={key}>{key.replace(/_/g, ' ').toUpperCase()}</th>
                  ))
                )[0] || []}
            </tr>
          </thead>
          <tbody>
            {data
              .filter(item => item && typeof item === 'object')
              .map((item, index) => (
                <tr key={index}>
                  {Object.values(item).map((value, valIndex) => (
                    <td key={valIndex}>{value !== null && value !== undefined ? value : ''}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Login;