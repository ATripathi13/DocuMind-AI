import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import DocumentView from './pages/DocumentView';
import AnalysisConsole from './pages/AnalysisConsole';
import EvaluationDashboard from './pages/EvaluationDashboard';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex font-sans">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        <ApiKeyModal />
      </div>
    </Router>
  );
}

export default App;
