import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    Box,
    Search,
    BarChart3,
    ShieldCheck,
    Settings,
    LayoutDashboard,
    BrainCircuit,
    FileSearch,
    Users
} from 'lucide-react';

const Sidebar = () => {
    const roles = [
        { name: 'Researcher', icon: <FileSearch size={22} />, path: '/document', desc: 'Document Analysis' },
        { name: 'Analyst', icon: <BrainCircuit size={22} />, path: '/analysis', desc: 'Agent Reasoning' },
        { name: 'Auditor', icon: <ShieldCheck size={22} />, path: '/evaluation', desc: 'System Quality' },
    ];

    return (
        <aside className="w-72 h-screen glass-panel fixed left-0 top-0 flex flex-col z-50">
            <div className="p-8 pb-4">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-accent p-2 rounded-xl text-slate-950 shadow-lg shadow-accent/30">
                        <Box size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight">DocuMind <span className="text-accent italic">AI</span></h1>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">Enterprise Intelligence</p>
                    </div>
                </div>

                <nav className="space-y-6">
                    <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4 ml-4">Main</p>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
                        >
                            <LayoutDashboard size={22} />
                            <span>Workspace</span>
                        </NavLink>
                    </div>

                    <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4 ml-4">Deployment Roles</p>
                        <div className="space-y-2">
                            {roles.map((role) => (
                                <NavLink
                                    key={role.path}
                                    to={role.path}
                                    className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
                                >
                                    {role.icon}
                                    <div className="flex flex-col">
                                        <span className="leading-none">{role.name}</span>
                                        <span className="text-[10px] text-slate-500 font-normal mt-1">{role.desc}</span>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </nav>
            </div>

            <div className="mt-auto p-8 pt-4 border-t border-white/5 bg-black/10">
                <NavLink
                    to="/settings"
                    className={({ isActive }) => isActive ? 'nav-link-active' : 'nav-link'}
                >
                    <Settings size={22} />
                    <span>Settings</span>
                </NavLink>
                <div className="mt-6 flex items-center gap-3 px-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-purple-500 p-[1px]">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-xs text-white">JD</div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white">Evaluator</span>
                        <span className="text-[10px] text-success font-bold uppercase tracking-tighter flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Deployment Active
                        </span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
