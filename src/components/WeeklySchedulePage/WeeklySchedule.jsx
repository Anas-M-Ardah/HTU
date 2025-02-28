// WeeklySchedule.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import '../../css/WeeklySchedulePage/WeeklySchedule.css';

const WeeklySchedule = ({ course, isRamadan }) => {
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const getWeeklySchedule = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      console.log('Fetching schedule for:', course);
      const link = isRamadan ? 'https://htu-zb7c.onrender.com/api/weekly-schedule-ramadan' : 'https://htu-zb7c.onrender.com/api/weekly-schedule';
      const response = await fetch(`${link}/${course}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/signin');
        return;
      }

      if (response.ok) {
        console.log('Schedule data:', data);
        setSchedule(data);
      } else {
        setError(data.message || 'Failed to fetch schedule');
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
      setError('Failed to fetch schedule. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (course) {
      getWeeklySchedule();
    }
  }, [course]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  if (!schedule || schedule.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No schedule available for this course.
      </div>
    );
  }

  return (
    <section className="weekly-schedule">
      <h2>Weekly Schedule - {course} {isRamadan ? ' - Ramadan' : ''}</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Place</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((day, index) => (
              <tr key={index}>
                <td>{day.dayName}</td>
                <td>{formatTime(day.startTime)}</td>
                <td>{formatTime(day.endTime)}</td>
                <td>{day.place}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default WeeklySchedule;