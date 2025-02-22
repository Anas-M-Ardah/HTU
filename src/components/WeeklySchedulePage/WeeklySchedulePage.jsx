// WeeklySchedulePage.jsx
import React from 'react';
import Header from '../Header'
import WeeklySchedule from '../WeeklySchedulePage/WeeklySchedule';
import AddHours from '../WeeklySchedulePage/AddHours';
import Footer from '../Footer';
import '../../css/WeeklySchedulePage/WeeklySchedulePage.css';

const WeeklySchedulePage = ({ courseName }) => {
  return (


    <div className="weekly-page-container">
      <Header />
      <main className="main-content">
        <WeeklySchedule course={courseName} />
        <AddHours course={courseName} />
      </main>
      <Footer />
    </div>
  );
};

export default WeeklySchedulePage;