import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
    showGradients: boolean
    toggleGradients: () => void
    enableAnimations: boolean
    toggleAnimations: () => void

    // --- New Hover State ---
    hoveredAsset: string | null
    setHoveredAsset: (symbol: string | null) => void
}

export const useUIStore = create<UIState>()(
    persist(
        (set) => ({
            showGradients: true,
            toggleGradients: () => set((state) => ({ showGradients: !state.showGradients })),
            enableAnimations: true,
            toggleAnimations: () => set((state) => ({ enableAnimations: !state.enableAnimations })),

            // Initial value
            hoveredAsset: null,
            setHoveredAsset: (symbol) => set({ hoveredAsset: symbol }),
        }),
        {
            name: 'ui-storage',
            // IMPORTANT: Do not persist 'hoveredAsset' to localStorage
            partialize: (state) => ({
                showGradients: state.showGradients,
                enableAnimations: state.enableAnimations
            }),
        }
    )
)