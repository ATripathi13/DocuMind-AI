import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ApiKeyModal from './components/ApiKeyModal';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex font-sans text-slate-200">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          {/* Catch-all to handle legacy /document, /analysis routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ApiKeyModal />
      </div>
    </Router>
  );
}

export default App;
