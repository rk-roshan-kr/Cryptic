import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
    showGradients: boolean
    toggleGradients: () => void
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            showGradients: true, // Default to true as per request to "match the color scheme"
            toggleGradients: () => set((state) => ({ showGradients: !state.showGradients })),
        }),
        {
            name: 'ui-storage',
        }
    )
)
