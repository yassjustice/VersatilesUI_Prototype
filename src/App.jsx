import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ShowroomPage from './pages/ShowroomPage';
import ControlCenterPage from './pages/ControlCenterPage';
import './App.css';

// Import i18n (must be imported before components that use translation)
import './i18n/i18n';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="showroom" element={<ShowroomPage />} />
            <Route path="control-center" element={<ControlCenterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
