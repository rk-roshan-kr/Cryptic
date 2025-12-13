import React from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Globe, Maximize2, Settings, Lock, Unlock } from 'lucide-react'
import OrderBook from '../Components/OrderBook'
import TradeForm from '../Components/TradeForm'
import LeverageSlider from '../Components/LeverageSlider'
import CustomChart from '../Components/CustomChart'
import { useChartData } from '../../../hooks/useChartData'
import { useDashboardStore } from '../../../store/dashboardStore'
import GridWrapper from '../Layout/GridWrapper'

const FuturesHeader = ({ stats }: { stats: any }) => {
    const { isLayoutLocked, toggleLayoutLock } = useDashboardStore()

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
                        <div className="flex items-center gap-2 font-bold text-lg text-white">
                            BTC/USDT <span className="text-xs bg-[#26a17b] px-1.5 py-0.5 rounded text-white font-bold">PERP</span> <ChevronDown size={14} className="text-slate-500 group-hover:text-white" />
                        </div>
                        <div className="text-xs text-[#3b82f6] underline decoration-dashed decoration-slate-600">Bitcoin Price</div>
                    </div>
                </div>

                {/* Funding Rate Stats */}
                <div className="hidden md:flex items-center gap-8 px-4 border-l border-white/5">
                    <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Mark Price</div>
                        <div className={`headers-price font-mono font-medium text-emerald-400`}>
                            {stats?.price?.toLocaleString(undefined, { minimumFractionDigits: 2 }) || '---'}
                        </div>
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Index Price</div>
                        <div className="font-mono text-slate-300 font-medium">64,235.10</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Funding / Countdown</div>
                        <div className="font-mono text-orange-400 font-medium">0.0100% <span className="text-slate-500">04:23:12</span></div>
                    </div>
                    <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">24h Volume</div>
                        <div className="font-mono text-slate-300 font-medium">
                            {stats?.volume ? (stats.volume / 1000).toFixed(1) + 'K' : '---'}
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
                    {isLayoutLocked ? 'Locked' : 'Edit'}
                </button>

                <button className="flex items-center gap-2 bg-[#151926] hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 text-xs font-bold text-slate-300 transition-colors">
                    <Settings size={14} />
                    Cross
                </button>
                <button className="flex items-center gap-2 bg-[#151926] hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/5 text-xs font-bold text-emerald-400 transition-colors">
                    20x
                </button>
            </div>
        </div>
    )
}

const ChartArea = () => (
    <div className="flex-1 bg-[#151926] m-1 rounded-xl border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        <div className="text-slate-600 font-bold text-lg">TradingView Chart (Perpetual)</div>
        <div className="text-slate-700 text-xs mt-2">Connecting to Feed...</div>
    </div>
)

// Mock Positions Data
const POSITIONS = [
    { symbol: 'BTC/USDT', type: 'LONG', size: '0.125', entry: 62500.00, mark: 64230.50, liq: 58200.00, pnl: 216.31, pnlPercent: 12.5 },
    { symbol: 'ETH/USDT', type: 'SHORT', size: '1.50', entry: 3500.00, mark: 3450.12, liq: 3800.00, pnl: 74.82, pnlPercent: 5.2 },
]

const PositionsTable = () => (
    <div className="h-[250px] bg-[#151926] m-1 rounded-xl border border-white/5 overflow-hidden flex flex-col">
        <div className="flex items-center gap-6 px-4 py-3 border-b border-white/5">
            <button className="text-xs font-bold text-white border-b-2 border-[#3b82f6] pb-3 -mb-3.5">Positions (2)</button>
            <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors">Open Orders (0)</button>
            <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors">Order History</button>
        </div>

        <div className="flex-1 overflow-auto">
            <table className="w-full text-left border-collapse">
                <thead className="text-[10px] text-slate-500 font-bold uppercase sticky top-0 bg-[#151926] z-10">
                    <tr>
                        <th className="px-4 py-2">Symbol</th>
                        <th className="px-4 py-2">Size</th>
                        <th className="px-4 py-2">Entry Price</th>
                        <th className="px-4 py-2">Mark Price</th>
                        <th className="px-4 py-2">Liq. Price</th>
                        <th className="px-4 py-2 text-right">PnL (ROE%)</th>
                        <th className="px-4 py-2 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="text-xs font-mono text-slate-300 divide-y divide-white/5">
                    {POSITIONS.map((pos, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors group">
                            <td className="px-4 py-3 font-bold text-white flex items-center gap-2">
                                <span className={`px-1.5 rounded text-[10px] ${pos.type === 'LONG' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                                    {pos.type}
                                </span>
                                {pos.symbol}
                                <span className="text-slate-500 text-[10px]">20x</span>
                            </td>
                            <td className="px-4 py-3">{pos.size}</td>
                            <td className="px-4 py-3">{pos.entry.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            <td className="px-4 py-3">{pos.mark.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            <td className="px-4 py-3 text-orange-400">{pos.liq.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                            <td className="px-4 py-3 text-right">
                                <div className={pos.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                                    {pos.pnl > 0 ? '+' : ''}{pos.pnl} USC
                                </div>
                                <div className={`text-[10px] ${pos.pnlPercent >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    ({pos.pnlPercent > 0 ? '+' : ''}{pos.pnlPercent}%)
                                </div>
                            </td>
                            <td className="px-4 py-3 text-right">
                                <button className="text-[10px] bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded transition-colors">
                                    Close
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)



export default function FuturesView() {
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
            <FuturesHeader stats={stats} />

            <GridWrapper viewId="FUTURES">
                {/* Chart Widget */}
                <div key="chart">
                    <Widget>
                        <CustomChart data={data} lastPrice={stats?.price || 0} />
                    </Widget>
                </div>

                {/* Positions Widget */}
                <div key="positions">
                    <Widget>
                        <PositionsTable />
                    </Widget>
                </div>

                {/* OrderBook Widget */}
                <div key="orderbook">
                    <Widget>
                        <OrderBook price={stats?.price} />
                    </Widget>
                </div>

                {/* TradeForm Widget (Includes Leverage for compactness) */}
                <div key="tradeform">
                    <Widget>
                        <div className="flex flex-col h-full">
                            <div className="p-2 border-b border-white/5 bg-[#0b0c10]/50">
                                <LeverageSlider />
                            </div>
                            <div className="flex-1 overflow-auto">
                                <TradeForm type="FUTURES" price={stats?.price} />
                            </div>
                        </div>
                    </Widget>
                </div>
            </GridWrapper>
        </div>
    )
}
