import React, { useState } from 'react'
import { useDashboardStore } from '../../../store/dashboardStore'
import { Toast } from '../../common/Toast'

export default function TradeForm({ type = 'SPOT', price }: { type?: 'SPOT' | 'FUTURES', price?: number }) {
    const { addOrder } = useDashboardStore()
    const [side, setSide] = useState<'BUY' | 'SELL'>('BUY')
    const [orderType, setOrderType] = useState('LIMIT')
    const [amount, setAmount] = useState('')
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' as any })

    const handleTrade = () => {
        if (!amount || parseFloat(amount) <= 0) {
            setToast({ show: true, message: 'Please enter a valid amount', type: 'error' })
            return
        }

        const orderPrice = price || 0
        const total = parseFloat(amount) * orderPrice

        addOrder({
            id: Math.random().toString(36).substr(2, 9),
            pair: 'BTC/USDT',
            type: orderType as any,
            side,
            price: orderPrice,
            amount: parseFloat(amount),
            total,
            timestamp: Date.now(),
            status: 'OPEN'
        })

        setToast({ show: true, message: `${side} Order Placed Successfully!`, type: 'success' })
        setAmount('')
    }

    return (
        <>
            <Toast
                isOpen={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast({ ...toast, show: false })}
            />

            <div className="bg-[#13141b] rounded-xl border border-white/5 p-3 flex flex-col h-full">
                {/* Buy/Sell Tabs */}
                <div className="flex bg-[#0b0c10] p-0.5 rounded-lg mb-3">
                    <button
                        onClick={() => setSide('BUY')}
                        className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${side === 'BUY' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                        BUY
                    </button>
                    <button
                        onClick={() => setSide('SELL')}
                        className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${side === 'SELL' ? 'bg-rose-500 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                    >
                        SELL
                    </button>
                </div>

                {/* Order Type */}
                <div className="flex gap-3 mb-3 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                    {['Limit', 'Market', 'Stop'].map(t => (
                        <button
                            key={t}
                            onClick={() => setOrderType(t.toUpperCase())}
                            className={`hover:text-white transition-colors ${orderType === t.toUpperCase() ? 'text-[#6a7bff]' : ''}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* Inputs Grid */}
                <div className="space-y-3 flex-1">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                            <label className="text-[10px] text-slate-500 font-bold">Price (USDT)</label>
                            <input
                                type="number"
                                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg py-1.5 px-3 text-white font-mono text-xs focus:border-[#6a7bff] outline-none"
                                placeholder="0.00"
                                defaultValue={price}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] text-slate-500 font-bold">Amount (BTC)</label>
                            <input
                                type="number"
                                min="0"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full bg-[#0b0c10] border border-white/10 rounded-lg py-1.5 px-3 text-white font-mono text-xs focus:border-[#6a7bff] outline-none"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    {/* Slider */}
                    <div className="py-1">
                        <input type="range" className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer" />
                    </div>

                    {/* Futures Helper */}
                    {type === 'FUTURES' && (
                        <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                            <div className="flex justify-between">
                                <span>Cost</span>
                                <span className="text-white">{(parseFloat(amount || '0') * (price || 0) / 20).toFixed(2)} U</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Max</span>
                                <span className="text-white">1.2 B</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <button
                    onClick={handleTrade}
                    className={`w-full py-2.5 rounded-lg font-bold text-sm text-white shadow-lg mt-3 transition-transform active:scale-95
                    ${side === 'BUY' ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20' : 'bg-rose-500 hover:bg-rose-400 shadow-rose-500/20'}`}
                >
                    {side} BTC
                </button>
            </div>
        </>
    )
}
