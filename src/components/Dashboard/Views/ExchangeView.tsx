import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Globe, Maximize2, Lock, Unlock } from 'lucide-react'
import OrderBook from '../Components/OrderBook'
import TradeForm from '../Components/TradeForm'
import CustomChart from '../Components/CustomChart'

import { useChartData } from '../../../hooks/useChartData'
import GridWrapper from '../Layout/GridWrapper'
import { useDashboardStore } from '../../../store/dashboardStore'

// --- Mock Stats Header ---
const MarketHeader = ({ stats }: { stats: any }) => {
    const { isLayoutLocked, toggleLayoutLock } = useDashboardStore()

    if (!stats) return null
    return (
        <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#0b0e14]">
            {/* Pair Selector */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors group">
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-[#f7931a] flex items-center justify-center text-white font-bold text-[10px] ring-2 ring-[#0b0e14]">B</div>
                        <div className="w-8 h-8 rounded-full bg-[#26a17b] flex items-center justify-center text-white font-bold text-[10px] ring-2 ring-[#0b0e14]">T</div>
                    </div>
                    <div>
                        <div className="flex items-center gap-1 font-bold text-lg text-white">
                            BTC/USDT <ChevronDown size={14} className="text-slate-500 group-hover:text-white" />
                        </div>
                        <div className="text-xs text-[#3b82f6] underline decoration-dashed decoration-slate-600">Bitcoin Price</div>
                    </div>
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-8 px-4 border-l border-white/5">
                    <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Mark Price</div>
                        <div className={`headers-price font-mono font-medium text-lg ${stats.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {stats.price?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '---'}
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">24h Change</div>
                        <div className={`time-change font-mono font-medium ${stats.change >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {stats.change?.toFixed(2) || '0.00'}%
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">24h High</div>
                        <div className="font-mono text-slate-300 font-medium">
                            {isFinite(stats.high) ? stats.high.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '---'}
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">24h Volume</div>
                        <div className="font-mono text-slate-300 font-medium">
                            {stats.volume ? (stats.volume / 1000).toFixed(1) + 'K' : '---'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tools */}
            <div className="flex items-center gap-2">
                {/* Layout Toggle - Moved here */}
                <button
                    onClick={toggleLayoutLock}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border
                    ${isLayoutLocked
                            ? 'bg-[#151926] text-slate-400 border-white/5 hover:text-white'
                            : 'bg-orange-500/20 text-orange-400 border-orange-500/50'}`}
                >
                    {isLayoutLocked ? <Lock size={14} /> : <Unlock size={14} />}
                    {isLayoutLocked ? 'Locked' : 'Edit Layout'}
                </button>

                <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors">
                    <Globe size={18} />
                </button>
                <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors">
                    <Maximize2 size={18} />
                </button>
            </div>
        </div>
    )
}



export default function ExchangeView() {
    const { data, stats } = useChartData('BTC/USDT')
    const { isLayoutLocked } = useDashboardStore()

    // Helper to wrap widgets with standard styles
    const Widget = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
        <div className={`h-full w-full bg-[#151926] rounded-xl border border-white/5 overflow-hidden flex flex-col relative group ${className}`}>
            {/* Drag Handle Overlay - Only visible in Edit Mode */}
            {!isLayoutLocked && (
                <>
                    <div className="drag-handle absolute inset-0 z-50 bg-blue-500/5 border-2 border-blue-500/30 rounded-xl cursor-move flex items-center justify-center backdrop-blur-[0px] hover:bg-blue-500/10 transition-colors">
                        <div className="bg-blue-600/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg pointer-events-none">
                            Drag
                        </div>
                    </div>
                    {/* Visual Corner Indicator for Resize (Functional handle is injected by RGL via CSS) */}
                    <div className="absolute bottom-0 right-0 w-8 h-8 z-[60] pointer-events-none flex items-end justify-end p-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    </div>
                </>
            )}
            {children}
        </div>
    )

    return (
        <div className="flex flex-col h-full bg-[#0b0e14] overflow-hidden">
            <MarketHeader stats={stats} />

            <GridWrapper viewId="EXCHANGE">
                {/* Chart Widget */}
                <div key="chart">
                    <Widget>
                        <CustomChart data={data} lastPrice={stats?.price || 0} />
                    </Widget>
                </div>

                {/* OrderBook Widget */}
                <div key="orderbook">
                    <Widget>
                        <OrderBook price={stats?.price} />
                    </Widget>
                </div>

                {/* TradeForm Widget */}
                <div key="tradeform">
                    <Widget>
                        <TradeForm price={stats?.price} />
                    </Widget>
                </div>

                {/* Orders Widget */}
                <div key="orders">
                    <Widget>
                        <div className="flex flex-col h-full p-4">
                            <div className="text-xs font-bold text-slate-500 uppercase mb-4 drag-handle cursor-move">Open Orders (0)</div>
                            <div className="flex items-center justify-center flex-1 text-slate-600 text-sm">
                                No open orders
                            </div>
                        </div>
                    </Widget>
                </div>
            </GridWrapper>
        </div>
    )
}
