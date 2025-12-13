import React, { useCallback, useRef, useEffect, useState } from 'react'
// @ts-ignore
import { Responsive } from 'react-grid-layout'
import { useDashboardStore } from '../../../store/dashboardStore'
import { Lock, Unlock } from 'lucide-react'
// @ts-ignore
import _ from 'lodash'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
interface GridWrapperProps {
    viewId: string
    children: React.ReactNode
}

export default function GridWrapper({ viewId, children }: GridWrapperProps) {
    const { layouts, updateLayout, isLayoutLocked, toggleLayoutLock } = useDashboardStore()
    const currentLayout = layouts[viewId] || []

    // Width Handling (Custom replacement for missing WidthProvider)
    const containerRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(1200)

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries[0] && entries[0].contentRect) {
                setWidth(entries[0].contentRect.width)
            }
        })

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
        }

        return () => resizeObserver.disconnect()
    }, [])

    // Loop Prevention
    const lastLayout = useRef(currentLayout)

    const handleLayoutChange = useCallback((layout: any[]) => {
        // Compare with previous layout to prevent infinite update loops
        const simplifiedLayout = layout.map(({ i, x, y, w, h }) => ({ i, x, y, w, h }))
        const simplifiedCurrent = lastLayout.current.map(({ i, x, y, w, h }: any) => ({ i, x, y, w, h }))

        if (!_.isEqual(simplifiedLayout, simplifiedCurrent)) {
            lastLayout.current = layout
            updateLayout(viewId, layout)
        }
    }, [updateLayout, viewId])

    // Bypass strict type checks for RGL
    const ResponsiveAny = Responsive as any

    return (
        <div className="flex-1 h-full min-h-0 relative flex flex-col">
            {/* Custom Styles for Resize Handles */}
            <style>{`
                .react-grid-item > .react-resizable-handle {
                    z-index: 100 !important;
                    width: 25px !important;
                    height: 25px !important;
                    bottom: 2px !important;
                    right: 2px !important;
                    background-image: none !important;
                    cursor: se-resize;
                }
                .react-grid-item > .react-resizable-handle::after {
                    content: '';
                    position: absolute;
                    right: 4px;
                    bottom: 4px;
                    width: 0;
                    height: 0;
                    border-right: 8px solid #3b82f6; 
                    border-top: 8px solid transparent; 
                    border-left: 8px solid transparent; 
                    border-bottom: 8px solid #3b82f6;
                    border-bottom-right-radius: 2px;
                    opacity: 0.8;
                    transition: all 0.2s;
                    box-shadow: 1px 1px 2px rgba(0,0,0,0.3);
                }
                .react-grid-item > .react-resizable-handle:hover::after {
                    border-right-color: #60a5fa;
                    border-bottom-color: #60a5fa;
                    transform: scale(1.2);
                    opacity: 1;
                }
                .layout-placeholder {
                    background: rgba(59, 130, 246, 0.1) !important;
                    border: 2px dashed rgba(59, 130, 246, 0.5) !important;
                    border-radius: 12px !important;
                }
            `}</style>

            {/* Edit Toolbar Overlay */}


            <div ref={containerRef} className="flex-1 overflow-y-auto overflow-x-hidden p-2">
                {/* Only render grid when we have a valid width to prevent initial flash/error */}
                {width > 0 && (
                    <ResponsiveAny
                        className="layout"
                        layouts={{
                            lg: currentLayout.map((item: any) => ({
                                ...item,
                                static: isLayoutLocked,
                                isDraggable: !isLayoutLocked,
                                isResizable: !isLayoutLocked
                            }))
                        }}
                        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                        rowHeight={60}
                        width={width} // Pass calculated width
                        margin={[8, 8]}
                        isDraggable={!isLayoutLocked}
                        isResizable={!isLayoutLocked}
                        onLayoutChange={handleLayoutChange as any}
                        compactType="vertical"
                        draggableHandle=".drag-handle"
                    >
                        {children}
                    </ResponsiveAny>
                )}
            </div>
        </div>
    )
}
