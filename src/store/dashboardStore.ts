import { create } from 'zustand'

// Types
type ViewType = 'QUICK' | 'EXCHANGE' | 'FUTURES' | 'PROFILE' | 'ORDERS' | 'MARKET'

export interface Order {
    id: string
    pair: string
    type: 'LIMIT' | 'MARKET' | 'STOP'
    side: 'BUY' | 'SELL'
    price: number
    amount: number
    total: number
    timestamp: number
    status: 'OPEN' | 'FILLED' | 'CANCELLED'
}

interface DashboardState {
    currentView: ViewType
    activePair: string
    leverage: number
    isSidebarOpen: boolean
    orders: Order[]

    // Layout State
    isLayoutLocked: boolean
    layouts: Record<string, any[]> // key: 'exchange' | 'futures', value: RGL Layout[]

    // Actions
    setView: (view: ViewType) => void
    setPair: (pair: string) => void
    setLeverage: (lev: number) => void
    toggleSidebar: () => void
    addOrder: (order: Order) => void
    cancelOrder: (id: string) => void

    // Layout Actions
    toggleLayoutLock: () => void
    updateLayout: (view: string, layout: any[]) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
    currentView: 'QUICK',
    activePair: 'BTC/USDT',
    leverage: 1,
    isSidebarOpen: true,
    orders: [],

    isLayoutLocked: true, // Default to locked so users can interact with charts/buttons. explicit toggle for edit mode.
    layouts: {
        'EXCHANGE': [
            { i: 'chart', x: 0, y: 0, w: 9, h: 4, minW: 4, minH: 3 },
            { i: 'orderbook', x: 9, y: 0, w: 3, h: 6, minW: 2, minH: 4 },
            { i: 'tradeform', x: 9, y: 6, w: 3, h: 4, minW: 2, minH: 4 },
            { i: 'orders', x: 0, y: 4, w: 9, h: 2, minW: 4, minH: 2 }
        ],
        'FUTURES': [
            { i: 'chart', x: 0, y: 0, w: 9, h: 5, minW: 4, minH: 3 },
            { i: 'orderbook', x: 9, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
            { i: 'tradeform', x: 9, y: 4, w: 3, h: 5, minW: 2, minH: 4 },
            { i: 'positions', x: 0, y: 5, w: 9, h: 3, minW: 4, minH: 2 }
        ]
    },

    setView: (view) => set({ currentView: view }),
    setPair: (pair) => set({ activePair: pair }),
    setLeverage: (lev) => set({ leverage: lev }),
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
    cancelOrder: (id) => set((state) => ({ orders: state.orders.filter(o => o.id !== id) })),

    toggleLayoutLock: () => set((state) => ({ isLayoutLocked: !state.isLayoutLocked })),
    updateLayout: (view, layout) => set((state) => ({
        layouts: { ...state.layouts, [view]: layout }
    }))
}))
