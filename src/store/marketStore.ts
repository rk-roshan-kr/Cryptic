import { create } from 'zustand'

export interface Coin {
    id: string
    name: string
    symbol: string
    price: number
    change24h: number
    marketCap: string
    volume24h: string
    category: 'Layer 1' | 'DeFi' | 'Metaverse' | 'Meme' | 'Smart Contract'
    sparkline: number[] // Mock data for charts
}

interface MarketState {
    coins: Coin[]
    searchQuery: string
    activeFilter: string
    selectedCoin: Coin | null // For the detail modal

    // Actions
    setSearchQuery: (query: string) => void
    setFilter: (filter: string) => void
    selectCoin: (coin: Coin | null) => void
    refreshPrices: () => void // Simulates live updates
}

// Mock Data Generator
const generateMockCoins = (): Coin[] => [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', price: 64230.50, change24h: -1.24, marketCap: '1.2T', volume24h: '32B', category: 'Layer 1', sparkline: [65000, 64800, 64200, 63900, 64100, 64500, 64230] },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', price: 3450.12, change24h: 2.34, marketCap: '400B', volume24h: '15B', category: 'Smart Contract', sparkline: [3300, 3350, 3400, 3380, 3420, 3440, 3450] },
    { id: 'sol', name: 'Solana', symbol: 'SOL', price: 145.20, change24h: 12.50, marketCap: '65B', volume24h: '4B', category: 'Layer 1', sparkline: [130, 135, 132, 138, 142, 144, 145] },
    { id: 'ada', name: 'Cardano', symbol: 'ADA', price: 0.45, change24h: -0.50, marketCap: '16B', volume24h: '500M', category: 'Layer 1', sparkline: [0.46, 0.45, 0.45, 0.44, 0.45, 0.45, 0.45] },
    { id: 'dot', name: 'Polkadot', symbol: 'DOT', price: 7.20, change24h: 1.10, marketCap: '10B', volume24h: '300M', category: 'Layer 1', sparkline: [7.1, 7.15, 7.12, 7.18, 7.22, 7.19, 7.20] },
    { id: 'doge', name: 'Dogecoin', symbol: 'DOGE', price: 0.16, change24h: 5.40, marketCap: '23B', volume24h: '1B', category: 'Meme', sparkline: [0.15, 0.15, 0.16, 0.16, 0.15, 0.16, 0.16] },
    { id: 'uni', name: 'Uniswap', symbol: 'UNI', price: 9.50, change24h: -2.10, marketCap: '5.7B', volume24h: '120M', category: 'DeFi', sparkline: [9.8, 9.7, 9.6, 9.5, 9.4, 9.5, 9.5] },
    { id: 'link', name: 'Chainlink', symbol: 'LINK', price: 18.20, change24h: 3.45, marketCap: '10B', volume24h: '400M', category: 'Smart Contract', sparkline: [17.5, 17.8, 18.0, 18.1, 18.3, 18.1, 18.2] },
]

export const useMarketStore = create<MarketState>((set) => ({
    coins: generateMockCoins(),
    searchQuery: '',
    activeFilter: 'ALL',
    selectedCoin: null,

    setSearchQuery: (query) => set({ searchQuery: query }),
    setFilter: (filter) => set({ activeFilter: filter }),
    selectCoin: (coin) => set({ selectedCoin: coin }),
    refreshPrices: () => set((state) => ({
        coins: state.coins.map(coin => ({
            ...coin,
            price: coin.price * (1 + (Math.random() * 0.02 - 0.01)), // Fluctuates +/- 1%
            change24h: coin.change24h + (Math.random() * 0.2 - 0.1) // Fluctuates +/- 0.1%
        }))
    }))
}))
