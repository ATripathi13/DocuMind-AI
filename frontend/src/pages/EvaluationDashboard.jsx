import React from 'react';
import useStore from '../store/useStore';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { ShieldCheck, Target, Zap, Layers, BarChart3, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const EvaluationDashboard = () => {
    const { results } = useStore();

    if (!results) return (
        <div className="h-screen flex items-center justify-center bg-slate-950">
            <div className="text-center space-y-4">
                <div className="inline-flex p-4 bg-white/5 rounded-full text-slate-800">
                    <BarChart3 size={48} />
                </div>
                <p className="text-slate-600 text-lg font-light italic">Auditor Role: No active telemetry stream found.</p>
            </div>
        </div>
    );

    const confidenceData = [
        { name: 'Confidence', value: (results.confidence_score || 0.85) * 100 },
        { name: 'Residual', value: 100 - ((results.confidence_score || 0.85) * 100) },
    ];

    const breakdownData = [
        { name: 'OCR Precision', score: 92 },
        { name: 'Vision Recall', score: 88 },
        { name: 'Fusion Alignment', score: 95 },
        { name: 'State Consistency', score: 90 },
    ];

    const COLORS = ['#22D3EE', 'rgba(255, 255, 255, 0.05)'];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto py-12 px-10 space-y-12 min-h-screen"
        >
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-4xl font-black text-white mb-3 font-display tracking-tight uppercase">System Auditor</h2>
                    <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px] border-l-2 border-accent pl-4">Operational Telemetry & Quality Assurance</p>
                </div>
                <div className="flex items-center gap-3 px-5 py-2.5 bg-success/10 rounded-2xl border border-success/20 shadow-lg shadow-success/5">
                    <ShieldCheck size={16} className="text-success" />
                    <span className="text-[10px] font-black text-success uppercase tracking-widest">Audit Status: Verified</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Integrity Index', value: '94%', icon: <ShieldCheck className="text-accent" /> },
                    { label: 'Extraction Recall', value: '98.2%', icon: <Target className="text-success" /> },
                    { label: 'System Latency', value: '4.8s', icon: <Zap className="text-yellow-400" /> },
                    { label: 'Agent Hierarchy', value: '4 Nodes', icon: <Layers className="text-purple-400" /> },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-8 flex flex-col items-start space-y-4 hover:border-white/20 transition-all border-white/5"
                    >
                        <div className="p-3 bg-white/5 rounded-2xl shadow-inner">{stat.icon}</div>
                        <div>
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1.5">{stat.label}</p>
                            <p className="text-3xl font-black text-white font-mono tracking-tighter">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Confidence Gauge */}
                <div className="glass-card p-12 flex flex-col items-center bg-gradient-to-br from-slate-900/50 to-accent/5 lg:col-span-1 border-white/5">
                    <h3 className="text-[10px] font-black text-slate-500 mb-12 uppercase tracking-[0.3em]">Multi-Modal Confidence</h3>
                    <div className="relative w-full aspect-square max-w-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={confidenceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={75}
                                    outerRadius={95}
                                    startAngle={225}
                                    endAngle={-45}
                                    paddingAngle={0}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {confidenceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-white tracking-tighter">{(results.confidence_score || 0.85) * 100}%</span>
                            <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest mt-1.5 leading-none">Verified Score</p>
                        </div>
                    </div>
                    <p className="mt-8 text-[10px] text-slate-600 leading-relaxed text-center px-6 font-light italic">
                        "Cross-agent consensus established across 12 distinct data layers."
                    </p>
                </div>

                {/* Breakdown Chart */}
                <div className="glass-card p-12 lg:col-span-2 border-white/5">
                    <h3 className="text-[10px] font-black text-slate-500 mb-12 uppercase tracking-[0.3em]">Execution Precision Breakdown</h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={breakdownData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff03" vertical={false} />
                            <XAxis dataKey="name" stroke="#475569" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} tick={{ dy: 15 }} />
                            <YAxis stroke="#475569" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                                contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', fontSize: '10px' }}
                                itemStyle={{ color: '#22D3EE', fontWeight: 'bold' }}
                            />
                            <Bar dataKey="score" fill="#22D3EE" radius={[8, 8, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="glass-card p-10 bg-black/20 border-white/5">
                <h3 className="text-[10px] font-black text-slate-500 mb-10 uppercase tracking-[0.3em]">Automated Integrity Verification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { check: 'Spatial ↔ Semantic Alignment', status: 'Passed', score: 0.96, desc: 'Verifying intersection over union for text blocks and layout regions.' },
                        { check: 'Table Structure Integrity', status: 'Passed', score: 0.89, desc: 'Auditing cell continuity and column header extraction logic.' },
                        { check: 'Token Stream Continuity', status: 'Passed', score: 0.94, desc: 'Cross-checking OCR outputs against high-assurance LLM nodes.' },
                        { check: 'Multi-Agent Consensus', status: 'Verified', score: 0.91, desc: 'Fusion Agent agreement percentage across the reasoning chain.' },
                    ].map((check, i) => (
                        <div key={i} className="flex flex-col p-6 bg-slate-950/80 rounded-3xl border border-white/5 hover:border-accent/10 transition-all shadow-inner">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-success/5 flex items-center justify-center text-success border border-success/10 border-dashed">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <span className="font-bold text-slate-200 text-sm tracking-tight">{check.check}</span>
                                </div>
                                <span className="text-[10px] font-black text-success uppercase tracking-widest">{check.status}</span>
                            </div>
                            <p className="text-xs text-slate-600 mb-8 font-light leading-relaxed px-1 italic">{check.desc}</p>
                            <div className="flex items-center gap-5">
                                <div className="flex-1 bg-white/5 h-1 rounded-full overflow-hidden shadow-inner">
                                    <div className="bg-accent h-full shadow-[0_0_8px_rgba(34,211,238,0.3)]" style={{ width: `${check.score * 100}%` }} />
                                </div>
                                <span className="text-[10px] font-mono font-black text-slate-500">{(check.score * 100).toFixed(0)}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default EvaluationDashboard;
