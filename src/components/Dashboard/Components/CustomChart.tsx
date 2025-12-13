import React, { useMemo, useState } from 'react'
import {
    ComposedChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts'
import { format } from 'date-fns'
import { Settings, Maximize2, Camera, ChevronDown } from 'lucide-react'

// Types
export interface Candle {
    time: number
    open: number
    high: number
    low: number
    close: number
    volume: number
}

// --- Optimized Candle Shape ---
// Renders the Wick and Body in a single pass using the Range [Low, High]
const CandleShape = (props: any) => {
    const { x, y, width, height, payload } = props
    const { open, close, high, low } = payload

    // 1. Calculate the scale ratio based on the container height and value range
    // Recharts passes 'y' as the top pixel (High) and 'height' as total pixel height (High - Low)
    const range = high - low
    if (range === 0) return null

    const ratio = height / range

    // 2. Calculate Open/Close pixels relative to the High (y)
    // We use Math.abs because SVG coordinates grow downwards
    const openY = y + (high - open) * ratio
    const closeY = y + (high - close) * ratio

    const isGreen = close >= open
    const color = isGreen ? '#10B981' : '#EF4444' // Tailwind Emerald-500 : Red-500

    const bodyTop = Math.min(openY, closeY)
    const bodyHeight = Math.max(1, Math.abs(openY - closeY)) // Ensure at least 1px visibility

    // 3. Draw Wick (Line) and Body (Rect)
    // We center the wick: x + width / 2
    const center = x + width / 2

    return (
        <g>
            {/* Wick: Drawn from Top (y) to Bottom (y + height) */}
            <line
                x1={center}
                y1={y}
                x2={center}
                y2={y + height}
                stroke={color}
                strokeWidth={1}
            />
            {/* Body: Drawn using calculated Open/Close Y positions */}
            <rect
                x={x}
                y={bodyTop}
                width={width}
                height={bodyHeight}
                fill={color}
                stroke="none"
            />
        </g>
    )
}

// --- Optimized Tooltip ---
const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null
    const data = payload[0].payload
    const isGreen = data.close >= data.open

    return (
        <div className="bg-slate-900 border border-slate-700 p-2 rounded shadow-xl text-xs font-mono">
            <div className="text-slate-400 mb-1">{format(label, 'MMM dd HH:mm')}</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <span className="text-slate-500">O:</span> <span className={isGreen ? 'text-emerald-400' : 'text-red-400'}>{data.open.toFixed(2)}</span>
                <span className="text-slate-500">H:</span> <span className="text-slate-200">{data.high.toFixed(2)}</span>
                <span className="text-slate-500">L:</span> <span className="text-slate-200">{data.low.toFixed(2)}</span>
                <span className="text-slate-500">C:</span> <span className={isGreen ? 'text-emerald-400' : 'text-red-400'}>{data.close.toFixed(2)}</span>
            </div>
        </div>
    )
}

export function TradingChart({ data, lastPrice }: { data: Candle[], lastPrice: number }) {
    const [timeframe, setTimeframe] = useState('15m')

    // Performance: Memoize data transformation
    // We map the data so Recharts' <Bar> gets [low, high] as the value array
    // This allows Recharts to calculate the 'y' and 'height' correctly for the full wick range automatically
    const chartData = useMemo(() => {
        // Slice data to improve performance if array is massive (optional limit)
        const visibleData = data.length > 200 ? data.slice(-200) : data

        return visibleData.map(d => ({
            ...d,
            range: [d.low, d.high] // Key for Range Bar logic
        }))
    }, [data])

    // Calculate Min/Max for Y-Axis domain to auto-scale nicely
    const yDomain = useMemo(() => {
        if (!chartData.length) return ['auto', 'auto']
        const lows = chartData.map(d => d.low)
        const highs = chartData.map(d => d.high)
        const min = Math.min(...lows)
        const max = Math.max(...highs)
        // Add 0.2% padding
        return [min * 0.998, max * 1.002]
    }, [chartData])

    return (
        <div className="flex flex-col h-full bg-[#0B0E11] rounded-xl border border-white/5 overflow-hidden font-sans">
            {/* Header / Toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0f1216]">
                <div className="flex items-center gap-1">
                    {['1m', '5m', '15m', '1h', '4h'].map((tf) => (
                        <button
                            key={tf}
                            onClick={() => setTimeframe(tf)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${timeframe === tf
                                    ? 'text-blue-400 bg-blue-500/10'
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                                }`}
                        >
                            {tf}
                        </button>
                    ))}
                    <div className="w-[1px] h-5 bg-white/10 mx-3" />
                    <button className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white px-2 py-1.5 rounded hover:bg-white/5 transition-colors">
                        <Settings size={14} /> Indicators
                    </button>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                    <span className="text-xs font-mono text-slate-400">
                        Price: <span className="text-white">{lastPrice.toLocaleString()}</span>
                    </span>
                    <div className="w-[1px] h-4 bg-white/10" />
                    <button className="hover:text-white transition-colors"><Camera size={16} /></button>
                    <button className="hover:text-white transition-colors"><Maximize2 size={16} /></button>
                </div>
            </div>

            {/* Chart Canvas */}
            <div className="flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData} margin={{ top: 10, right: 60, bottom: 0, left: 10 }}>
                        <CartesianGrid
                            stroke="#1e293b"
                            strokeDasharray="3 3"
                            vertical={false}
                            opacity={0.4}
                        />

                        <XAxis
                            dataKey="time"
                            tickFormatter={(t) => format(t, 'HH:mm')}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 11 }}
                            minTickGap={40}
                            height={30}
                        />

                        <YAxis
                            domain={yDomain}
                            orientation="right"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'monospace' }}
                            tickCount={6}
                            width={60}
                        />

                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#ffffff20', strokeWidth: 1, strokeDasharray: '4 4' }} />

                        {/* Volume Bar (Background) */}
                        <Bar
                            dataKey="volume"
                            yAxisId={0}
                            fill="#3b82f6"
                            opacity={0.15}
                            barSize={4}
                            isAnimationActive={false} // CRITICAL for performance
                        />

                        {/* CandleStick Series */}
                        <Bar
                            dataKey="range" // Use the computed [low, high] array
                            shape={<CandleShape />}
                            barSize={8} // Adjust candle width
                            isAnimationActive={false} // CRITICAL for performance
                        />

                        {/* Current Price Line (Dashed) */}
                        {/* Note: ReferenceLine is better for a static 'lastPrice' across the whole chart */}
                    </ComposedChart>
                </ResponsiveContainer>

                {/* Current Price Label on Y-Axis */}
                <div
                    className="absolute right-0 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 font-mono rounded-l pointer-events-none"
                    style={{ top: '30%' }} // Note: In a real app, you'd calculate pixel position or use a ReferenceLine label
                >
                    {lastPrice.toFixed(2)}
                </div>
            </div>
        </div>
    )
}

// React.memo is essential here to prevent chart re-renders when parent state (unrelated to chart) changes
export default React.memo(TradingChart)