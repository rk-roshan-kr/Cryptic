import React from 'react'

const ASKS = [
    { price: 64235.50, amount: 0.12, total: 2345.12 },
    { price: 64235.00, amount: 0.05, total: 1123.45 },
    { price: 64234.50, amount: 1.20, total: 32000.00 },
    { price: 64234.00, amount: 0.45, total: 12450.50 },
    { price: 64233.50, amount: 0.01, total: 500.00 },
]

const BIDS = [
    { price: 64230.50, amount: 0.80, total: 15400.00 },
    { price: 64230.00, amount: 1.50, total: 45000.20 },
    { price: 64229.50, amount: 0.33, total: 8900.50 },
    { price: 64229.00, amount: 0.10, total: 2300.10 },
    { price: 64228.50, amount: 0.05, total: 1100.00 },
]

export default function OrderBook({ price }: { price?: number }) {
    return (
        <div className="h-full flex flex-col bg-[#13141b] rounded-xl border border-white/5 overflow-hidden">
            {/* Header */}
            <div className="p-3 border-b border-white/5 flex justify-between text-xs text-slate-500 font-bold uppercase">
                <span>Price</span>
                <span>Amount</span>
                <span>Total</span>
            </div>

            {/* Asks (Sells) - Red */}
            <div className="flex-1 overflow-hidden relative">
                <div className="absolute inset-x-0 bottom-0 p-1 space-y-0.5">
                    {ASKS.slice().reverse().map((ask, i) => ( // Reverse to show lowest ask at bottom
                        <div key={i} className="grid grid-cols-3 text-[10px] cursor-pointer hover:bg-white/5 px-1 py-0.5 relative group">
                            <div className="text-rose-400 font-mono z-10">{ask.price.toLocaleString()}</div>
                            <div className="text-right text-slate-400 font-mono z-10">{ask.amount}</div>
                            <div className="text-right text-slate-400 font-mono z-10">{ask.total.toLocaleString()}</div>
                            {/* Depth Bar */}
                            <div className="absolute top-0 right-0 bottom-0 bg-rose-500/10 z-0 transition-all" style={{ width: `${Math.random() * 80}%` }} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Current Price */}
            <div className="py-1.5 px-4 bg-[#0b0c10] border-y border-white/5 flex items-center justify-between">
                <div className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                    {price ? price.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '---'} <span className="text-[10px] text-slate-500 font-normal">USD</span>
                </div>
                <div className="text-[10px] text-slate-500">
                    ≈ ₹{price ? (price * 83).toLocaleString(undefined, { maximumFractionDigits: 0 }) : '---'}
                </div>
            </div>

            {/* Bids (Buys) - Green */}
            <div className="flex-1 overflow-hidden relative">
                <div className="absolute inset-x-0 top-0 p-1 space-y-0.5">
                    {BIDS.map((bid, i) => (
                        <div key={i} className="grid grid-cols-3 text-[10px] cursor-pointer hover:bg-white/5 px-1 py-0.5 relative group">
                            <div className="text-emerald-400 font-mono z-10">{bid.price.toLocaleString()}</div>
                            <div className="text-right text-slate-400 font-mono z-10">{bid.amount}</div>
                            <div className="text-right text-slate-400 font-mono z-10">{bid.total.toLocaleString()}</div>
                            {/* Depth Bar */}
                            <div className="absolute top-0 right-0 bottom-0 bg-emerald-500/10 z-0 transition-all" style={{ width: `${Math.random() * 80}%` }} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
