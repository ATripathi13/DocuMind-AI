import React from 'react';
import { Layout, BrainCircuit, Activity, BarChart3 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-primary-dark border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="bg-accent p-2 rounded-lg">
                    <BrainCircuit className="text-primary-dark" size={24} />
                </div>
                <span className="text-xl font-bold font-display tracking-tight text-white">DocuMind <span className="text-accent">AI</span></span>
            </div>

            <div className="flex items-center gap-6">
                <NavLink to="/" className={({ isActive }) => `flex items-center gap-2 hover:text-accent transition-colors ${isActive ? 'text-accent' : 'text-slate-400'}`}>
                    <Layout size={18} />
                    <span>Workspace</span>
                </NavLink>
                <NavLink to="/analysis" className={({ isActive }) => `flex items-center gap-2 hover:text-accent transition-colors ${isActive ? 'text-accent' : 'text-slate-400'}`}>
                    <Activity size={18} />
                    <span>Analysis</span>
                </NavLink>
                <NavLink to="/evaluation" className={({ isActive }) => `flex items-center gap-2 hover:text-accent transition-colors ${isActive ? 'text-accent' : 'text-slate-400'}`}>
                    <BarChart3 size={18} />
                    <span>Evaluation</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
