import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import DocumentView from './pages/DocumentView';
import AnalysisConsole from './pages/AnalysisConsole';
import EvaluationDashboard from './pages/EvaluationDashboard';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import ApiKeyModal from './components/ApiKeyModal';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex font-sans">
        <Sidebar />
        <main className="flex-1 ml-72 min-h-screen overflow-y-auto">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/document" element={<DocumentView />} />
              <Route path="/analysis" element={<AnalysisConsole />} />
              <Route path="/evaluation" element={<EvaluationDashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AnimatePresence>
        </main>
        <ApiKeyModal />
      </div>
    </Router>
  );
}

export default App;
