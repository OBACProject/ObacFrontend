"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import { ZoomIn, ZoomOut, RotateCcw, Maximize } from "lucide-react"

interface ZoomableChartContainerProps {
  children: React.ReactNode
  minScale?: number
  maxScale?: number
  step?: number
}

const ZoomableChartContainer: React.FC<ZoomableChartContainerProps> = ({
  children,
  minScale = 0.5,
  maxScale = 3,
  step = 0.1,
}) => {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + step, maxScale))
  }, [step, maxScale])

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - step, minScale))
  }, [step, minScale])

  const handleReset = useCallback(() => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }, [])

  const handleFitToScreen = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current
      const content = container.querySelector(".chart-content") as HTMLElement
      if (content) {
        const containerRect = container.getBoundingClientRect()
        const contentRect = content.getBoundingClientRect()

        const scaleX = (containerRect.width * 0.9) / contentRect.width
        const scaleY = (containerRect.height * 0.9) / contentRect.height
        const newScale = Math.min(scaleX, scaleY, maxScale)

        setScale(newScale)
        setPosition({ x: 0, y: 0 })
      }
    }
  }, [maxScale])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button === 0) {
        // Left mouse button
        setIsDragging(true)
        setDragStart({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        })
      }
    },
    [position],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        })
      }
    },
    [isDragging, dragStart],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -step : step
      setScale((prev) => Math.max(minScale, Math.min(maxScale, prev + delta)))
    },
    [step, minScale, maxScale],
  )

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden rounded-lg">
      {/* Zoom Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleFitToScreen}
          className="p-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors"
          title="Fit to Screen"
        >
          <Maximize className="w-4 h-4" />
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-slate-700 text-white rounded hover:bg-slate-600 transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Scale Indicator */}
      <div className="absolute top-4 right-4 z-10 bg-slate-700 text-white px-3 py-1 rounded text-sm">
        {Math.round(scale * 100)}%
      </div>

      {/* Chart Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <div
          className="chart-content origin-center transition-transform duration-200"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default ZoomableChartContainer
