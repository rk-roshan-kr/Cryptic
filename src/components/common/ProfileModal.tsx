import { useState } from 'react'
import { useUIStore } from '../../state/uiStore'
import { Modal } from './Modal'
import {
    User, Mail, Shield, Smartphone, Key, LayoutDashboard, Settings,
    Activity, HelpCircle, LogOut, Copy, Eye, EyeOff, ChevronRight,
    CreditCard, Bell, Moon, Languages, AlertTriangle, FileText, ExternalLink,
    PieChart as PieChartIcon, Check
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'

// --- Mock Data ---
const LOGIN_HISTORY = [
    { id: 1, date: '2024-12-12 10:45 AM', device: 'Chrome (Win10)', ip: '192.168.1.1', location: 'New York, USA' },
    { id: 2, date: '2024-12-10 08:30 PM', device: 'iPhone 13', ip: '45.22.19.112', location: 'New York, USA' },
    { id: 3, date: '2024-12-08 09:15 AM', device: 'Chrome (Win10)', ip: '192.168.1.1', location: 'New York, USA' },
]

const ASSET_DATA = [
    { name: 'Bitcoin', value: 60, color: '#f7931a' },
    { name: 'Ethereum', value: 25, color: '#627eea' },
    { name: 'USDT', value: 10, color: '#26a17b' },
    { name: 'Altcoins', value: 5, color: '#e9ecff' },
]

type Tab = 'overview' | 'security' | 'preferences' | 'activity' | 'support'

export const ProfileModal = () => {
    const { isProfileOpen, toggleProfile } = useUIStore()
    const [activeTab, setActiveTab] = useState<Tab>('overview')
    const [hideBalance, setHideBalance] = useState(false)
    const [notifications, setNotifications] = useState({ email: true, push: false, price: true })

    // Derived state
    const tabs: { id: Tab; label: string; icon: any }[] = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'preferences', label: 'Preferences', icon: Settings },
        { id: 'activity', label: 'Activity', icon: Activity },
        { id: 'support', label: 'Support', icon: HelpCircle },
    ]

    const Content = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                        {/* Profile Header Card */}
                        <div className="relative mb-6 p-6 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                                <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-blue-400 to-purple-500 shadow-xl shadow-blue-500/20">
                                    <div className="w-full h-full rounded-full bg-[#13141b] flex items-center justify-center overflow-hidden">
                                        <User size={40} className="text-slate-200" />
                                    </div>
                                </div>
                                <div className="text-center md:text-left flex-1">
                                    <h2 className="text-2xl font-bold text-white mb-1">Guest Manager</h2>
                                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-sm text-slate-400 mb-4">
                                        <span className="flex items-center gap-1"><Mail size={14} /> guest@cryptic.com</span>
                                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                                        <span>UID: 88291039</span>
                                    </div>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase rounded-lg border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]">VIP Tier 1</span>
                                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase rounded-lg border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Identity & Limits */}
                            <div className="space-y-6">
                                <div className="bg-[#13141b] border border-white/5 p-5 rounded-2xl">
                                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                        <Shield size={18} className="text-blue-400" /> Verification Status
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                                    <Check size={14} strokeWidth={3} />
                                                </div>
                                                <div>
                                                    <p className="text-white text-sm font-medium">Identity Verified</p>
                                                    <p className="text-slate-500 text-xs">Level 2 (Fiat & Crypto)</p>
                                                </div>
                                            </div>
                                            <span className="text-green-400 text-xs font-bold">ACTIVE</span>
                                        </div>

                                        <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-slate-400">Daily Withdrawal Limit</span>
                                                <span className="text-white font-bold">100 BTC</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-400">P2P Trading</span>
                                                <span className="text-green-400 font-bold">Enabled</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Snapshot */}
                            <div className="bg-[#13141b] border border-white/5 p-5 rounded-2xl flex flex-col">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <Activity size={18} className="text-purple-400" /> Security Score
                                </h3>
                                <div className="flex-1 flex flex-col items-center justify-center py-6">
                                    <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                                        {/* Simple CSS Donut for Score */}
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="64" cy="64" r="56" stroke="#1f2937" strokeWidth="12" fill="none" />
                                            {/* 85% stroke */}
                                            <circle cx="64" cy="64" r="56" stroke="#10b981" strokeWidth="12" fill="none" strokeDasharray="351" strokeDashoffset="52" strokeLinecap="round" />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-bold text-white">85</span>
                                            <span className="text-xs text-green-400 font-medium">Strong</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-center text-sm">
                                        Your account is highly secure. <br />
                                        Enable <span className="text-white">Anti-Phishing Code</span> to reach 100%.
                                    </p>
                                    <button onClick={() => setActiveTab('security')} className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-white transition-colors">
                                        Improve Security
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'security':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <h2 className="text-xl font-bold text-white mb-4">Security Center</h2>

                        {/* 2FA */}
                        <div className="bg-[#1a1c2e] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg">
                                    <Smartphone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Two-Factor Authentication (2FA)</h4>
                                    <p className="text-slate-400 text-xs">Protect your account with Google Authenticator.</p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-green-500/20 text-green-400 text-sm font-bold rounded-lg border border-green-500/20">Enabled</button>
                        </div>

                        {/* Anti-Phishing */}
                        <div className="bg-[#1a1c2e] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-amber-500/20 text-amber-400 rounded-lg">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold">Anti-Phishing Code</h4>
                                    <p className="text-slate-400 text-xs">Verify official emails with your custom code.</p>
                                </div>
                            </div>
                            <button className="text-slate-300 hover:text-white text-sm font-medium">Configure</button>
                        </div>

                        {/* Login History */}
                        <div>
                            <h3 className="text-white font-bold mb-3 flex items-center gap-2 mt-6">
                                <Key size={16} className="text-slate-400" /> Recent Logins
                            </h3>
                            <div className="bg-[#13141b] rounded-xl border border-white/5 overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-white/5 text-slate-400 text-left">
                                        <tr>
                                            <th className="p-3 font-medium">Time</th>
                                            <th className="p-3 font-medium">Device</th>
                                            <th className="p-3 font-medium">Location</th>
                                            <th className="p-3 font-medium">IP</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-slate-300">
                                        {LOGIN_HISTORY.map(log => (
                                            <tr key={log.id}>
                                                <td className="p-3">{log.date}</td>
                                                <td className="p-3">{log.device}</td>
                                                <td className="p-3">{log.location}</td>
                                                <td className="p-3 font-mono text-xs text-slate-500">{log.ip}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 text-right">
                                <button className="text-red-400 text-sm font-bold hover:text-red-300 transition-colors">Logout All Devices</button>
                            </div>
                        </div>
                    </div>
                )

            case 'preferences':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <h2 className="text-xl font-bold text-white mb-4">Preferences</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-[#1a1c2e] rounded-xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <Languages className="text-slate-400" />
                                    <div>
                                        <p className="text-white font-medium">Language</p>
                                        <p className="text-xs text-slate-500">English (US)</p>
                                    </div>
                                </div>
                                <ChevronRight className="text-slate-500" />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-[#1a1c2e] rounded-xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <CreditCard className="text-slate-400" />
                                    <div>
                                        <p className="text-white font-medium">Currency</p>
                                        <p className="text-xs text-slate-500">USD ($)</p>
                                    </div>
                                </div>
                                <ChevronRight className="text-slate-500" />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-[#1a1c2e] rounded-xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <Moon className="text-slate-400" />
                                    <div>
                                        <p className="text-white font-medium">Theme</p>
                                        <p className="text-xs text-slate-500">Dark Mode</p>
                                    </div>
                                </div>
                                <div className="w-10 h-6 bg-[#6a7bff] rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <h3 className="text-white font-bold mb-3">Notifications</h3>
                                <div className="space-y-3">
                                    {Object.entries(notifications).map(([key, val]) => (
                                        <div key={key} className="flex items-center justify-between">
                                            <span className="text-slate-300 capitalize">{key} Notifications</span>
                                            <button
                                                onClick={() => setNotifications(p => ({ ...p, [key]: !p[key as keyof typeof p] }))}
                                                className={`w-10 h-6 rounded-full relative transition-colors ${val ? 'bg-green-500' : 'bg-slate-600'}`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${val ? 'left-[calc(100%-20px)]' : 'left-1'}`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'activity':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">Activity Log</h2>
                            <button className="text-blue-400 text-sm hover:underline">Download CSV</button>
                        </div>
                        <div className="p-12 text-center border-2 border-dashed border-white/10 rounded-xl text-slate-500">
                            <Activity size={48} className="mx-auto mb-4 opacity-20" />
                            <p>No recent activity found in the last 24h.</p>
                            <button className="mt-4 px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors">
                                View Full History
                            </button>
                        </div>

                        <div className="bg-[#1a1c2e] p-5 rounded-xl border border-white/5 mt-6">
                            <h3 className="text-white font-bold mb-4">Referral Stats</h3>
                            <div className="flex justify-between items-center bg-[#13141b] p-4 rounded-lg">
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest">Referral ID</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-lg font-mono text-white tracking-widest">REF-8892</span>
                                        <Copy size={16} className="text-slate-500 cursor-pointer hover:text-white" />
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-emerald-400">$1,250.00</p>
                                    <p className="text-xs text-slate-500">Total Commissions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'support':
                return (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <h2 className="text-xl font-bold text-white mb-4">Support & Legal</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#1a1c2e] p-5 rounded-xl border border-white/5 hover:border-blue-500/50 transition-colors cursor-pointer group">
                                <HelpCircle size={32} className="text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                                <h3 className="text-white font-bold">Help Center</h3>
                                <p className="text-slate-400 text-sm mt-1">Browse guides and tutorials.</p>
                            </div>
                            <div className="bg-[#1a1c2e] p-5 rounded-xl border border-white/5 hover:border-purple-500/50 transition-colors cursor-pointer group">
                                <FileText size={32} className="text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                                <h3 className="text-white font-bold">Submit Ticket</h3>
                                <p className="text-slate-400 text-sm mt-1">Contact our support team.</p>
                            </div>
                        </div>

                        <div className="space-y-2 mt-6">
                            <a href="#" className="block p-3 rounded-lg hover:bg-white/5 text-slate-300 text-sm flex justify-between items-center group">
                                Terms of Service <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="#" className="block p-3 rounded-lg hover:bg-white/5 text-slate-300 text-sm flex justify-between items-center group">
                                Privacy Policy <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>

                        <div className="pt-6 mt-6 border-t border-white/10">
                            <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                                <AlertTriangle size={18} /> Danger Zone
                            </h3>
                            <button className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-sm font-bold transition-colors">
                                Delete Account
                            </button>
                        </div>
                    </div>
                )
        }
    }

    return (
        <Modal
            isOpen={isProfileOpen}
            onClose={toggleProfile}
            className="h-[90vh] md:h-[85vh] flex overflow-hidden lg:rounded-2xl rounded-xl"
            hideHeader
            noPadding
            maxWidth="w-[95vw] md:w-full max-w-5xl"
        >
            <div className="flex flex-col md:flex-row h-full w-full">
                {/* Sidebar */}
                <div className="w-full md:w-64 bg-[#0f1016] border-b md:border-b-0 md:border-r border-white/5 flex flex-row md:flex-col shrink-0 overflow-x-auto md:overflow-visible no-scrollbar">

                    {/* Navigation */}
                    <nav className="flex-1 p-2 md:p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto no-scrollbar items-center md:items-stretch">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-4 py-2 md:py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-[#6a7bff] text-white shadow-lg shadow-blue-500/25'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <tab.icon size={18} />
                                <span className="hidden md:inline">{tab.label}</span>
                                <span className="md:hidden">{tab.label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Footer Actions */}
                    <div className="hidden md:block p-4 border-t border-white/5">
                        <button
                            onClick={toggleProfile}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                        >
                            <LogOut size={16} /> Sign Out
                        </button>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-[#13141b] overflow-y-auto custom-scrollbar relative">
                    {/* Decorative Background Glow */}
                    <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#1a1c2e] to-transparent pointer-events-none" />

                    <div className="p-4 md:p-8 relative z-10 pb-20 md:pb-8">
                        {/* Close Button Mobile Overlay? Or just rely on backdrop/swipe. Modal has close button usually? */}
                        {/* We hid the header, so we need a Close button for Mobile inside the content if needed.
                             But 'toggleProfile' on backdrop click works. Let's add a small desktop close button absolute positioned?
                             Or rely on standard UI. Let's keep it clean. */}
                        {Content()}
                    </div>
                </div>
            </div>
        </Modal>
    )
}
