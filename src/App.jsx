// App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/HomePage/HomePage';
import SignInPage from './components/SignInPage/SignInPage';
import WeeklySchedulePage from './components/WeeklySchedulePage/WeeklySchedulePage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignInPage />} />
        
        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Navigate to="/home" replace />
          </ProtectedRoute>
        } />
        
        <Route path="/home" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />

        {/* Course Schedule Routes */}
        <Route path="/technical" element={
          <ProtectedRoute>
            <WeeklySchedulePage courseName="ASP.NET" />
          </ProtectedRoute>
        } />
        
        <Route path="/english" element={
          <ProtectedRoute>
            <WeeklySchedulePage courseName="English" />
          </ProtectedRoute>
        } />
        
        <Route path="/softskill" element={
          <ProtectedRoute>
            <WeeklySchedulePage courseName="Softskills" />
          </ProtectedRoute>
        } />

        {/* Catch all route for 404 */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;