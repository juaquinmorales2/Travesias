import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import EventsPage from './pages/admin/EventsPage';
import AnnouncementsPage from './pages/admin/AnnouncementsPage';
import LinksPage from './pages/admin/LinksPage';
import SponsorsPage from './pages/admin/SponsorsPage';
import ModalsPage from './pages/admin/ModalsPage';
import MigrationPage from './pages/admin/MigrationPage';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white w-full">
                <Header />
                <main>
                  <HomePage />
                </main>
                <Footer />
              </div>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute>
                <EventsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/announcements"
            element={
              <ProtectedRoute>
                <AnnouncementsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/links"
            element={
              <ProtectedRoute>
                <LinksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sponsors"
            element={
              <ProtectedRoute>
                <SponsorsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/modals"
            element={
              <ProtectedRoute>
                <ModalsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/migrate"
            element={
              <ProtectedRoute>
                <MigrationPage />
              </ProtectedRoute>
            }
          />

          {/* Redirect /admin to /admin/dashboard */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          {/* 404 - Redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;