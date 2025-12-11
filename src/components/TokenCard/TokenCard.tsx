import { useState, useMemo, useEffect, useRef } from 'react'
import { Typography, Avatar, Button } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useUIStore } from '../../state/uiStore'
import { cryptoMeta, CryptoSymbol } from '../../state/cryptoMeta'
import { accordionVariants, tapAnimation } from '../../utils/animations'

// --- Icons & Components ---
const ChevronIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l6 6 6-6" />
    </svg>
)

const Sparkline = ({ color, isPositive, width = 100, height = 40 }: { color: string, isPositive: boolean, width?: number, height?: number }) => {
    const points = useMemo(() => {
        const data = []
        let current = 50
        for (let i = 0; i < 20; i++) {
            current += (Math.random() - 0.5) * 20
            if (isPositive) current += 2; else current -= 2
            current = Math.max(10, Math.min(90, current))
            data.push(current)
        }
        return data
    }, [isPositive])

    const max = Math.max(...points)
    const min = Math.min(...points)
    const range = max - min || 1
    const stepX = width / (points.length - 1)
    const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * stepX},${height - ((p - min) / range) * height}`).join(' ')

    return (
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
            {/* Glow Effect */}
            <filter id={`glow-${color.replace('#', '')}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 2px ${color})` }} />
            <path d={`${pathD} L ${width},${height} L 0,${height} Z`} fill={color} opacity="0.1" stroke="none" />
        </svg>
    )
}

export type Asset = {
    symbol: string
    name: string
    logo: string
    qty: number
    valueUsd: number
    percentOfTreasury: number
    change24hPercent: number
    price: number
}

// Props interface for controlled component
interface TokenCardProps {
    asset: Asset
    isExpanded: boolean
    onToggle: () => void
}

export default function TokenCard({ asset, isExpanded, onToggle }: TokenCardProps) {
    const navigate = useNavigate()
    const cardRef = useRef<HTMLDivElement>(null)

    // 1. Global State Connection
    const { showGradients, hoveredAsset, setHoveredAsset } = useUIStore()

    // 2. Computed Values
    const isPositive = asset.change24hPercent >= 0
    const changeColor = isPositive ? '#4ade80' : '#f87171'
    const changeBg = isPositive ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)'
    const metaColor = cryptoMeta[asset.symbol as CryptoSymbol]?.color || '#64748b'

    // Check if this card is the one being hovered globally (on chart)
    const isFocused = hoveredAsset === asset.symbol

    // 3. "The Magic Glue": Sync Global Hover to Local State
    useEffect(() => {
        if (isFocused) {
            // Smooth scroll to this card if triggered from chart
            cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }
    }, [isFocused])

    // 4. Handlers
    const handleMouseEnter = () => {
        setHoveredAsset(asset.symbol)
    }
    const handleMouseLeave = () => {
        setHoveredAsset(null)
    }

    // 5. Dynamic Styles (Applied to Inner Card)
    const backgroundStyle = showGradients ? {
        background: `linear-gradient(135deg, ${metaColor}25 0%, rgba(30,30,35,0.6) 50%, rgba(30,30,35,0.4) 100%)`,
        backdropFilter: 'blur(10px)',
        borderLeft: `3px solid ${metaColor}80`
    } : {}

    return (
        <motion.div
            layout
            ref={cardRef}
            initial={false}
            whileTap={tapAnimation}
            onClick={onToggle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-full py-1.5 cursor-pointer z-0 relative" // HIT BOX: Includes Padding!
        >
            {/* INNER VISUAL CARD */}
            <div
                className={`
                    card-base relative p-4 rounded-xl overflow-hidden
                    transition-colors duration-300
                    ${!showGradients ? 'hover:bg-[#1f1f22]' : ''}
                    ${isExpanded ? 'bg-[#1f1f22]/80' : ''}
                    ${isFocused ? 'ring-2 ring-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'ring-1 ring-white/5'}
                `}
                style={backgroundStyle}
            >
                {/* --- TOP ROW --- */}
                <motion.div layout="position" className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Avatar src={asset.logo} sx={{ width: 40, height: 40 }} className="ring-2 ring-white/5 shadow-lg flex-shrink-0" />
                        <div className="min-w-0">
                            <Typography className="text-sm text-slate-400 font-medium truncate">{asset.name}</Typography>
                            <div className="flex items-center gap-2">
                                <Typography variant="h6" className="text-white font-bold leading-tight truncate">{asset.symbol}</Typography>
                                <ChevronIcon className={`text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} />
                            </div>
                        </div>
                    </div>

                    {/* Pushed to Right: Percent Change */}
                    <div className="flex items-center justify-center px-3 py-1.5 rounded-full font-bold text-sm shadow-sm" style={{ backgroundColor: changeBg, color: changeColor }}>
                        {isPositive ? '+' : ''}{asset.change24hPercent.toFixed(2)}%
                    </div>
                </motion.div>

                {/* --- EXPANDABLE SECTION --- */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            variants={accordionVariants}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            className="overflow-hidden"
                        >
                            <div className="pt-4 mt-2 border-t border-white/5">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex flex-col">
                                        <Typography className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Balance</Typography>
                                        <Typography className="text-white font-semibold text-sm">
                                            {asset.qty.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                                            <span className="text-slate-500 mx-1.5">/</span>
                                            <span className="text-slate-300">${asset.valueUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <Typography className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Price</Typography>
                                        <Typography className="text-white font-bold text-sm">${asset.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 h-[40px]">
                                    <div className="flex-1 h-full relative">
                                        <Sparkline color={changeColor} isPositive={isPositive} />
                                        <div className="absolute top-0 right-0 flex flex-col items-end pointer-events-none">
                                            <Typography className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">24h</Typography>
                                            <Typography className="text-[10px] font-bold" style={{ color: changeColor }}>
                                                {isPositive ? '+' : ''}{asset.change24hPercent.toFixed(2)}%
                                            </Typography>
                                        </div>
                                    </div>
                                    <Button
                                        variant="contained" size="small"
                                        onClick={(e) => { e.stopPropagation(); navigate(`/app/trade/${asset.symbol}`) }}
                                        className="font-bold shadow-lg"
                                        style={{ backgroundColor: '#3b82f6', fontSize: '10px', height: '28px', borderRadius: '8px', textTransform: 'none' }}
                                    >
                                        Trade
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
