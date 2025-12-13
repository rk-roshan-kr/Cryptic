import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDashboardStore } from '../../store/dashboardStore'
import QuickTradeView from './Views/QuickTradeView'
import OrdersView from './Views/OrdersView'
import ExchangeView from './Views/ExchangeView'
import FuturesView from './Views/FuturesView'

export default function CryptoDashboard() {
    const { currentView } = useDashboardStore()

    // View Switcher logic
    const renderView = () => {
        switch (currentView) {
            case 'QUICK':
                return <QuickTradeView />
            case 'EXCHANGE':
                return <ExchangeView />
            case 'FUTURES':
                return <FuturesView />
            case 'ORDERS':
                return <OrdersView />
            default:
                return <QuickTradeView />
        }
    }

    return (
        <div className="h-full w-full bg-[#0b0e14] text-slate-200 flex flex-col overflow-hidden">
            <div className="flex-1 relative overflow-hidden flex flex-col">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentView}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 flex flex-col h-full overflow-hidden"
                    >
                        {renderView()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
