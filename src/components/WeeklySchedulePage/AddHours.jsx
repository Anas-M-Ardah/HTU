// AddHours.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import '../../css/WeeklySchedulePage/AddHours.css';

const AddHours = ({ course }) => {
  const [hours, setHours] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      const response = await fetch('https://htu-zb7c.onrender.com/api/courses/add-hours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          courseName: course, 
          hours: Number(hours) 
        })
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/signin');
        return;
      }

      if (response.ok) {
        setModalInfo({
          type: 'success',
          message: `Successfully added ${hours} hours to ${course}`
        });
        setHours('');
      } else {
        setModalInfo({
          type: 'error',
          message: data.message || 'Failed to add hours'
        });
      }
    } catch (error) {
      setModalInfo({
        type: 'error',
        message: 'Network error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
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
            min="0"
            step="1"
            required
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100"
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

      <Modal
        show={showModal}
        type={modalInfo.type}
        message={modalInfo.message}
        onClose={closeModal}
      />
    </section>
  );
};

export default AddHours;