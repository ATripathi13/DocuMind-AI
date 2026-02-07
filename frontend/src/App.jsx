import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ApiKeyModal from './components/ApiKeyModal';

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
