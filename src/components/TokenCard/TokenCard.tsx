import { useState } from 'react'
import { Typography, Avatar } from '@mui/material'
import { useUIStore } from '../../state/uiStore'
import { cryptoMeta, CryptoSymbol } from '../../state/cryptoMeta'

// Simple Chevron Icon Component (or import from lucide-react / mui icons)
const ChevronIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20" height="20" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
)

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

export default function TokenCard({ asset }: { asset: Asset }) {
  const { showGradients } = useUIStore()
  const [isExpanded, setIsExpanded] = useState(false)

  // 1. Color Logic
  const isPositive = asset.change24hPercent >= 0
  const changeColor = isPositive ? '#4ade80' : '#f87171'
  const changeBg = isPositive ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)'
  const metaColor = cryptoMeta[asset.symbol as CryptoSymbol]?.color || '#64748b'

  // 2. Dynamic Styles
  const backgroundStyle = showGradients
    ? {
      background: `linear-gradient(135deg, ${metaColor}25 0%, rgba(30,30,35,0.6) 50%, rgba(30,30,35,0.4) 100%)`,
      backdropFilter: 'blur(10px)',
      borderLeft: `3px solid ${metaColor}80`
    }
    : {}

  // 3. Handlers
  // Toggle on click (Mobile tap / Desktop click)
  const handleToggle = () => setIsExpanded(!isExpanded)

  // Optional: Auto-open on desktop hover, close on leave
  const handleMouseEnter = () => setIsExpanded(true)
  const handleMouseLeave = () => setIsExpanded(false)

  return (
    <div
      className={`
        card-base relative p-4 rounded-xl cursor-pointer group select-none
        transition-all duration-300 ease-spring
        ${!showGradients ? 'hover:bg-[#1f1f22]' : ''}
        ${isExpanded ? 'bg-[#1f1f22]/80 ring-1 ring-white/10' : ''}
      `}
      style={backgroundStyle}
      onClick={handleToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
    >
      {/* --- TOP ROW: ALWAYS VISIBLE --- */}
      <div className="flex items-center justify-between gap-3">

        {/* Left: Icon & Name */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <Avatar
            src={asset.logo}
            alt={asset.symbol}
            sx={{ width: 40, height: 40 }}
            className="ring-2 ring-white/5 shadow-lg flex-shrink-0"
          />
          <div className="min-w-0">
            <Typography className="text-sm text-slate-400 font-medium truncate group-hover:text-slate-200 transition-colors">
              {asset.name}
            </Typography>
            <div className="flex items-center gap-2">
              <Typography variant="h6" className="text-white font-bold leading-tight truncate">
                {asset.symbol}
              </Typography>
              {/* Animated Chevron: Rotates when expanded */}
              <ChevronIcon
                className={`text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
              />
            </div>
          </div>
        </div>

        {/* Right: Percent Pill */}
        <div
          className="flex items-center justify-center px-3 py-1.5 rounded-full font-bold text-sm shadow-sm whitespace-nowrap transition-transform duration-300 origin-right group-hover:scale-105"
          style={{ backgroundColor: changeBg, color: changeColor }}
        >
          {isPositive ? '+' : ''}{asset.change24hPercent.toFixed(2)}%
        </div>
      </div>

      {/* --- EXPANDABLE ROW --- */}
      {/* Using grid-rows transition for smooth height animation.
          'grid-rows-[1fr]' = open, 'grid-rows-[0fr]' = closed.
      */}
      <div
        className={`
          grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
        `}
      >
        <div className="overflow-hidden min-h-0">
          {/* Inner Content with Fade/Slide Effect */}
          <div
            className={`
              pt-4 mt-2 border-t border-white/5 flex items-center justify-between
              transition-all duration-300 delay-75
              ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
            `}
          >

            {/* Balance Info */}
            <div className="flex flex-col">
              <Typography className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                Balance
              </Typography>
              <Typography className="text-white font-semibold text-sm">
                {asset.qty.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                <span className="text-slate-500 mx-1.5">/</span>
                <span className="text-slate-300">${asset.valueUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </Typography>
            </div>

            {/* Price Info */}
            <div className="flex flex-col items-end">
              <Typography className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                Price
              </Typography>
              <Typography className="text-white font-bold text-sm">
                ${asset.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </Typography>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}