import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, PieChart, DollarSign, Activity, Plus, MoreHorizontal } from 'lucide-react'
import { Card, CardContent, Typography } from '@mui/material'
import { containerStagger, fadeInUp, speedometerWoosh } from '../utils/animations'
import { formatUSD } from '../utils/format'
import { usePortfolioStore, Investment } from '../state/portfolioStore'
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import InvestmentChart from '../components/InvestmentChart/InvestmentChart'
import InvestmentReview from '../components/Investment/InvestmentReview'
import { useUIStore } from '../state/uiStore'

export default function InvestmentPortfolio() {
    const { investments, getTotalInvested, getTotalProjectedYield } = usePortfolioStore()
    const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null)
    const { showCinematicIntro } = useUIStore()

    // Animation State
    const [hoveredAsset, setHoveredAsset] = useState<string | null>(null)
    const [introAsset, setIntroAsset] = useState<string | null>(null)
    const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    const totalValue = getTotalInvested()
    const totalYield = getTotalProjectedYield()
    const averageApy = investments.length > 0
        ? investments.reduce((acc, curr) => acc + curr.apy, 0) / investments.length
        : 0

    // Data for Allocation Chart (Group by Type or specific Asset Name?)
    // Let's group by Type for high-level, or Name if specific. The mock uses specific names like 'ETH-USDT LP'.
    // Let's track by Name for the chart to be detailed.
    const allocationData = investments.reduce((acc, curr) => {
        const existing = acc.find(i => i.symbol === curr.name)
        if (existing) {
            existing.value += curr.amount
        } else {
            // Assign colors based on Type for visual consistency
            let color = '#60a5fa' // default Blue
            if (curr.type === 'Staking') color = '#6366f1' // Indigo
            if (curr.type === 'Liquidity') color = '#ec4899' // Pink
            if (curr.type === 'DeFi') color = '#f59e0b' // Amber

            acc.push({ symbol: curr.name, value: curr.amount, color })
        }
        return acc
    }, [] as { symbol: string; value: number; color: string }[])

    // Convert value to percent
    const chartAllocations = allocationData.map(d => ({
        symbol: d.symbol,
        percent: totalValue > 0 ? +(d.value / totalValue * 100).toFixed(1) : 0,
        color: d.color
    })).sort((a, b) => b.percent - a.percent)

    // --- Interaction Logic (Copied from Portfolio.tsx for consistency) ---
    const handleHover = useCallback((symbol: string | null) => {
        if (hoverTimer.current) {
            clearTimeout(hoverTimer.current)
            hoverTimer.current = null
        }
        if (symbol) {
            setHoveredAsset(symbol)
        } else {
            hoverTimer.current = setTimeout(() => {
                setHoveredAsset(null)
            }, 200)
        }
    }, [])

    // --- Cinematic: Speedometer Sweep Effect ---
    useEffect(() => {
        if (!showCinematicIntro || chartAllocations.length === 0) return

        const symbols = chartAllocations.map(t => t.symbol)
        const totalSteps = symbols.length
        let interval: ReturnType<typeof setInterval>

        const startTimer = setTimeout(() => {
            let index = 0
            interval = setInterval(() => {
                setIntroAsset(symbols[index])
                index++
                if (index >= totalSteps) {
                    clearInterval(interval)
                    setTimeout(() => setIntroAsset(null), 300)
                }
            }, 300)
        }, 500)

        return () => {
            clearTimeout(startTimer)
            if (interval) clearInterval(interval)
        }
    }, [showCinematicIntro, chartAllocations.length])


    return (
        <div className="min-h-screen p-4 md:p-8 pb-24 text-coolgray dark:text-slate-300">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4"
                >
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Investments</h1>
                        <p className="text-slate-400">Track active positions and yield performance</p>
                    </div>
                    <Link
                        to="/app/investment"
                        className="flex items-center gap-2 bg-gradient-to-r from-[#60a5fa] to-[#5a95e0] text-[#0f1230] px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all font-bold"
                    >
                        <Plus size={20} />
                        New Investment
                    </Link>
                </motion.div>

                {investments.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="card-base p-12 flex flex-col items-center justify-center text-center min-h-[400px]"
                    >
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                            <PieChart size={48} className="text-slate-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">No Active Investments</h2>
                        <p className="text-slate-400 max-w-md mb-8">
                            Start growing your wealth by exploring high-yield DeFi, Staking, and Liquidity strategies.
                        </p>
                        <Link
                            to="/app/investment"
                            className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-xl transition-colors font-medium border border-white/10"
                        >
                            Explore Strategies
                        </Link>
                    </motion.div>
                ) : (
                    <>
                        {/* Stats Grid */}
                        <motion.div
                            variants={containerStagger}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        >
                            <motion.div variants={fadeInUp} className="card-base p-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <DollarSign size={80} />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                        <DollarSign size={20} />
                                    </div>
                                    <span className="text-slate-400 font-medium">Total Invested</span>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{formatUSD(totalValue)}</div>
                                <div className="text-sm text-slate-400">Active Capital</div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="card-base p-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <TrendingUp size={80} />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                        <TrendingUp size={20} />
                                    </div>
                                    <span className="text-slate-400 font-medium">Proj. Yearly Yield</span>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{formatUSD(totalYield)}</div>
                                <div className="text-sm text-green-400">Est. returns based on current APY</div>
                            </motion.div>

                            <motion.div variants={fadeInUp} className="card-base p-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Activity size={80} />
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                        <Activity size={20} />
                                    </div>
                                    <span className="text-slate-400 font-medium">Avg. APY</span>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{averageApy.toFixed(1)}%</div>
                                <div className="text-sm text-slate-400">Weighted average across portfolio</div>
                            </motion.div>
                        </motion.div>

                        {/* Chart Section - Replaces List Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0 h-auto lg:h-[500px]">

                            {/* Chart & Legend Card */}
                            <Card className="card-base min-w-0 h-auto">
                                <CardContent
                                    className="flex flex-col h-full"
                                    onMouseLeave={() => handleHover(null)}
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <Typography variant="h6" className="text-white">Portfolio Allocation</Typography>
                                        <div className="flex items-center gap-2">
                                            <span className="chip" style={{ backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>Donut</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 flex-1">
                                        <motion.div
                                            className="w-full lg:w-1/2 max-w-[400px] aspect-square relative flex items-center justify-center"
                                            variants={showCinematicIntro ? speedometerWoosh : undefined}
                                            initial="hidden"
                                            animate="visible"
                                            key={showCinematicIntro ? 'cinematic' : 'standard'}
                                        >
                                            <InvestmentChart
                                                data={chartAllocations}
                                                activeSymbol={introAsset || hoveredAsset || (selectedInvestment ? selectedInvestment.name : null)}
                                                onHover={handleHover}
                                            />
                                        </motion.div>

                                        <div className="w-full lg:w-1/2 flex flex-col justify-center">
                                            <div className="space-y-2">
                                                {chartAllocations.map(a => {
                                                    const activeItem = introAsset || hoveredAsset || (selectedInvestment ? selectedInvestment.name : null)
                                                    const isActive = activeItem === a.symbol
                                                    const isDimmed = activeItem && !isActive

                                                    return (
                                                        <motion.div
                                                            key={a.symbol}
                                                            layout
                                                            onMouseEnter={() => handleHover(a.symbol)}
                                                            initial={{ opacity: 1 }}
                                                            animate={{
                                                                opacity: isDimmed ? 0.3 : 1,
                                                                scale: isActive ? 1.05 : 1,
                                                                x: isActive ? 10 : 0
                                                            }}
                                                            className={`flex items-center justify-between group cursor-pointer p-3 rounded-xl transition-all ${isActive ? 'bg-white/10 shadow-lg ring-1 ring-white/20' : 'hover:bg-white/5'}`}
                                                        >
                                                            <div className="flex items-center gap-3 min-w-0">
                                                                <span className="w-3 h-3 rounded-full ring-2 ring-white/10 flex-shrink-0 shadow-sm" style={{ backgroundColor: a.color }} />
                                                                <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors truncate" title={a.symbol}>
                                                                    {a.symbol}
                                                                </span>
                                                            </div>
                                                            <span className="text-sm font-bold text-white tabular-nums flex-shrink-0">{a.percent}%</span>
                                                        </motion.div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Active Investments List - Stylized */}
                            <div className="flex flex-col h-full overflow-hidden">
                                <motion.div
                                    className="overflow-y-auto no-scrollbar p-1 flex-1 h-full pb-12 space-y-4"
                                    variants={containerStagger}
                                    initial="hidden"
                                    animate="visible"
                                    key={showCinematicIntro ? 'cinematic-list' : 'standard-list'}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className="text-xl font-bold text-white">Active Positions</h2>
                                    </div>

                                    {investments.map((item, i) => (
                                        <motion.div
                                            key={item.id}
                                            variants={fadeInUp}
                                            custom={i}
                                            onClick={() => setSelectedInvestment(prev => prev?.id === item.id ? null : item)} // Toggle selection
                                            onMouseEnter={() => handleHover(item.name)}
                                            onMouseLeave={() => handleHover(null)}
                                            className={`card-base p-4 flex flex-col md:flex-row items-center gap-4 transition-all group cursor-pointer border
                                                ${selectedInvestment?.id === item.id
                                                    ? 'bg-white/10 border-blue-500/50 shadow-lg shadow-blue-500/20'
                                                    : 'hover:bg-white/5 border-transparent'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4 w-full md:w-auto md:flex-1">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-transform group-hover:scale-110
                                                      ${item.type === 'Staking' ? 'bg-indigo-500/20 text-indigo-400' :
                                                        item.type === 'DeFi' ? 'bg-amber-500/20 text-amber-400' : 'bg-pink-500/20 text-pink-400'}`}
                                                >
                                                    {item.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white">{item.name}</h3>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-slate-300">{item.type}</span>
                                                        <span className="text-xs text-[#36c390] font-medium">{item.apy}% APY</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Principal</div>
                                                <div className="font-mono font-bold text-white">{formatUSD(item.amount)}</div>
                                            </div>

                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreHorizontal size={20} className="text-slate-400" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Window Mode: Investment Detail View */}
            <AnimatePresence>
                {selectedInvestment && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedInvestment(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            className="w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar bg-[#0f1230] border border-blue-500/20 rounded-3xl p-6 md:p-8 relative shadow-2xl shadow-blue-900/20"
                        >
                            <button
                                onClick={() => setSelectedInvestment(null)}
                                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors z-10"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            <InvestmentReview
                                selectedOption={selectedInvestment}
                                amount={selectedInvestment.amount}
                                isViewMode={true}
                                onBack={() => setSelectedInvestment(null)}
                                onConfirm={() => setSelectedInvestment(null)} // Or removal logic?
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
