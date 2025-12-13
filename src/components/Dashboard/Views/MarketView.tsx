import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, MoreVertical, Star } from 'lucide-react'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

// Mock Data for Market List
const MARKET_DATA = [
    { id: 1, symbol: 'USDT', name: 'Tether', price: 91.1850, change: -0.31, chartData: [91.5, 91.4, 91.2, 91.1, 91.3, 91.18] },
    { id: 2, symbol: 'XRP', name: 'Ripple', price: 185.5303, change: -0.63, chartData: [186, 187, 185, 184, 185, 185.5] },
    { id: 3, symbol: 'ETH', name: 'Ethereum', price: 284541.09, change: -3.96, chartData: [290000, 288000, 285000, 282000, 284000, 284541] },
    { id: 4, symbol: 'BTC', name: 'Bitcoin', price: 8174252.66, change: -2.35, chartData: [8300000, 8250000, 8200000, 8150000, 8160000, 8174252] },
    { id: 5, symbol: 'SOL', name: 'Solana', price: 12095.63, change: -5.03, chartData: [12800, 12600, 12200, 12000, 12050, 12095] },
    { id: 6, symbol: 'TRX', name: 'TRON', price: 24.9285, change: -1.37, chartData: [25.2, 25.1, 24.9, 24.8, 24.9, 24.92] },
    { id: 7, symbol: 'BNB', name: 'Binance Coin', price: 81059.43, change: 0.88, chartData: [80000, 80500, 80800, 81200, 81100, 81059] },
    { id: 8, symbol: 'DOGE', name: 'Dogecoin', price: 12.6452, change: -0.31, chartData: [12.8, 12.7, 12.6, 12.5, 12.6, 12.64] },
    { id: 9, symbol: 'POL', name: 'Polygon', price: 11.0633, change: 1.14, chartData: [10.8, 10.9, 11.0, 11.1, 11.05, 11.06] },
]

import { useDashboardStore } from '../../../store/dashboardStore'

export default function MarketView() {
    const { setView, setPair } = useDashboardStore()
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState('INR')

    // Filter logic
    const filteredData = MARKET_DATA.filter(coin =>
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleTrade = (symbol: string) => {
        setPair(`${symbol}/USDT`)
        setView('EXCHANGE')
    }

    return (
        <div className="flex flex-col h-full bg-[#0b0e14] p-6 overflow-hidden">
            {/* ... (Keep existing Toolbar & Header) ... */}

            {/* Top Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
                {/* Search */}
                <div className="relative w-full max-w-sm group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search coin"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#151926] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                {/* Currency Tabs */}
                <div className="flex bg-[#151926] p-1 rounded-xl border border-white/5">
                    {['INR', 'USDT'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500 hover:text-white'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-bold text-slate-500 uppercase border-b border-white/5">
                <div className="col-span-3">Coins</div>
                <div className="col-span-3 text-right">Price</div>
                <div className="col-span-2 text-right">24 Hr Change</div>
                <div className="col-span-2 text-center">Chart</div>
                <div className="col-span-2 text-right">Options</div>
            </div>

            {/* Table Content */}
            <div className="flex-1 overflow-y-auto">
                {filteredData.map((coin) => (
                    <div
                        key={coin.id}
                        className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-white/5 border-b border-white/5 transition-colors group"
                    >
                        {/* Coin Info */}
                        <div className="col-span-3 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white/5">
                                {coin.symbol[0]}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-white text-base">{coin.symbol}</span>
                                    <span className="text-xs text-slate-500 border border-white/10 px-1 rounded">INR</span>
                                </div>
                                <div className="text-xs text-slate-500">{coin.name}</div>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-3 text-right">
                            <div className="font-mono text-white text-base font-medium">{coin.price.toLocaleString('en-IN', { minimumFractionDigits: 4 })} <span className="text-slate-500 text-xs">INR</span></div>
                        </div>

                        {/* Change */}
                        <div className="col-span-2 text-right">
                            <div className={`font-mono font-medium ${coin.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {coin.change > 0 ? '↑' : '↓'} {Math.abs(coin.change).toFixed(2)}%
                            </div>
                        </div>

                        {/* Sparkline Chart */}
                        <div className="col-span-2 h-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={coin.chartData.map((val, i) => ({ i, val }))}>
                                    <Line
                                        type="monotone"
                                        dataKey="val"
                                        stroke={coin.change >= 0 ? '#10b981' : '#f43f5e'}
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Options */}
                        <div className="col-span-2 flex items-center justify-end gap-2">
                            <button
                                onClick={() => handleTrade(coin.symbol)}
                                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-6 py-2 rounded-lg transition-colors shadow-lg shadow-blue-600/20"
                            >
                                TRADE
                            </button>
                            <button className="text-slate-500 hover:text-white p-2">
                                <MoreVertical size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Empty State */}
                {filteredData.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                        <Search size={48} className="mb-4 opacity-20" />
                        <div>No coins found matching "{searchTerm}"</div>
                    </div>
                )}
            </div>
        </div>
    )
}
