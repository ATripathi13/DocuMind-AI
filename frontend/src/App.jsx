import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DocumentView from './pages/DocumentView';
import AnalysisConsole from './pages/AnalysisConsole';
import EvaluationDashboard from './pages/EvaluationDashboard';
import ApiKeyModal from './components/ApiKeyModal';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary">
        <Navbar />
        <ApiKeyModal />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/document" element={<DocumentView />} />
            <Route path="/analysis" element={<AnalysisConsole />} />
            <Route path="/evaluation" element={<EvaluationDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
