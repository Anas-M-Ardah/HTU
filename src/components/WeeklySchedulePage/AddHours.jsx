// AddHours.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../css/WeeklySchedulePage/AddHours.css';

const AddHours = () => {
  const [hours, setHours] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const { courseName } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://htu-zb7c.onrender.com/api/courses/add-hours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseName, hours })
      });

      if (response.status === 401) {
        navigate('/signin');
        return;
      }

      if (response.ok) {
        setMessage({ type: 'success', text: `Successfully added ${hours} hours to ${courseName}` });
        setHours('');
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.message });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="add-hours-section">
      <h2>Add Hours Completed</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="hours">Hours:</label>
          <input
            type="number"
            id="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="form-control"
            required
          />
        </div>
        {message.text && (
          <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
            {message.text}
          </div>
        )}
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <span>
              <span className="spinner-border spinner-border-sm me-2" />
              Adding...
            </span>
          ) : (
            'Add Hours'
          )}
        </button>
      </form>
    </section>
  );
};

export default AddHours;