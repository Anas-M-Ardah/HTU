// CourseTable.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader'; // Import the Loader component
import '../../css/HomePage/ProgressTable.css';

const ProgressTable = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }

      const response = await fetch('https://htu-zb7c.onrender.com/api/courses/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/signin');
        return;
      }

      if (response.ok) {
        setCourses(data);
      } else {
        setError(data.message || 'Failed to fetch courses');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to fetch courses. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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

  if (!courses || courses.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        No courses available.
      </div>
    );
  }

  return (
    <div className="container mt-5 parent-container">
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr className="table-header">
              <th>Course</th>
              <th>Hours Taken</th>
              <th>Hours Remaining</th>
              <th>Total Hours</th>
              <th>Progress Bar</th>
              <th>Last Updated On</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className={index % 2 === 1 ? 'pink-row' : ''}>
                <td>{course.courseName}</td>
                <td>{course.hoursTaken}</td>
                <td>{course.hoursRemaining}</td>
                <td>{course.totalHours}</td>
                <td>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${course.progressBar}%` }}
                      aria-valuenow={course.progressBar}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {course.progressBar}%
                    </div>
                  </div>
                </td>
                <td>
                  {course.updatedAt.split('T')[0]} (added {course.lastHoursAdded})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgressTable;